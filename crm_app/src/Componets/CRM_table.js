import { Center, createStyles, Group, ScrollArea, Table, Text, UnstyledButton } from "@mantine/core";
import React from "react";
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons';
import "../style/dashboard.scss"
import Server from "../Utilis/Server";

class TableView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            Headers:[],
            Sizes: [],
            Data:[],
            SortBy: null,
            reversedSort: false,
            Page: 0,
            PageLimit: 25,
            canLoad: true,
            StartPage: 1
        }
        this.Area = React.createRef()
        this.refresh = this.RefreshData.bind(this)
        this.style = createStyles(
            (theme) => {
                return {
                    th: {
                        padding: '0 !important',
                    },
                
                    control: {
                        width: '100%',
                        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
                    
                        '&:hover': {
                            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                        },
                    },
                
                    icon: {
                        width: 21,
                        height: 21,
                        borderRadius: 21,
                    },
                }
            }
        )

    }

    componentDidMount() {
        if (this.props.headers !== undefined) {
            this.state.Headers = this.props.headers
        }
        if (this.props.data !== undefined) {
            this.state.Data = this.props.data
        }
        if (this.props.sizes !== undefined) {
            this.state.Sizes = this.props.sizes
        }
        if (this.props.StartPage !== undefined) {
            this.state.Page = this.props.StartPage
            this.state.StartPage = this.props.StartPage
        }
        if (this.props.PageLimit !== undefined) {
            this.state.PageLimit = this.props.PageLimit
        }

        if (this.state.canLoad) this.DownloadData()
        this.forceUpdate()
    }

    async DownloadData() {
        if (this.props.PaginationFunc !== undefined && this.props.ResponseFunc !== undefined) {
            await Server.ApiInstance()
                .get(this.props.PaginationFunc(this.state.Page))
                .then(
                    resp => {
                        let dat = this.props.ResponseFunc(resp.data)
                        // console.log(Object.entries(dat).length)
                        if (Object.entries(dat).length >= this.state.PageLimit) this.state.canLoad = true
                        else this.state.canLoad = false

                        if (this.state.Data.length == 0) this.state.Data = dat
                        else this.state.Data = this.state.Data.concat(dat)
                        // this.state.Page += 1
                        this.forceUpdate()
                    }
                )
        }
    }

    RefreshData() {
        this.setState({
            Headers:this.state.Headers,
            Sizes: this.state.Sizes,
            Data:[],
            SortBy: null,
            reversedSort: false,
            Page: 1,
            PageLimit: this.state.PageLimit,
            canLoad: false,
        })
        this.Area.current.scrollTop = 0
        setTimeout(this.DownloadData.bind(this), 500)
        // this.forceUpdate()
    }

    scrollChange(x) {
        if (x.y >= (this.Area.current.scrollTopMax - 100) && this.state.canLoad) {
            
            this.state.canLoad = false
            this.state.Page += 1
            this.DownloadData()
        }
        // console.log(x, "Area wyskoskosc =", this.Area.current.scrollTopMax)
    }

    SortData() {
        this.state.Data = this.state.Data.sort(
            (a,b) => {
                a = Object.values(a)
                b = Object.values(b)
                if (this.state.reversedSort) {
                    return b[this.state.SortBy].toString().localeCompare(a[this.state.SortBy].toString())
                }
                return a[this.state.SortBy].toString().localeCompare(b[this.state.SortBy].toString())
            }
        )
        this.forceUpdate()
    }

    render() {
        const TabHe = (props) => {
            const {children, reversed, sorted, onSort} = props
            const { classes } = this.style();
            const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
            return (
                <th className={classes.th}> 
                    <UnstyledButton onClick={onSort} className={classes.control}>
                        <Group position="apart">
                            <Text weight={500} size="sm">
                                {
                                    children
                                }
                            </Text>
                            <Center className={classes.icon}>
                                <Icon size={14} stroke={1.5} />
                            </Center>
                        </Group>
                    </UnstyledButton>
                </th>
            )
        }

        const SetSorting = (index) => {
            const reversed = index === this.state.SortBy ? !this.state.reversedSort : false;
            this.state.reversedSort = reversed
            this.state.SortBy = index
            this.SortData()
            this.forceUpdate()
        }

        return (
            <ScrollArea zIndex={"4"} viewportRef={this.Area} onScrollPositionChange={(x,y) => this.scrollChange(x,y)} type="always" offsetScrollbars sx={{width: "100%", height: "100%"}}>
                <Table  sx={{tableLayout: "auto",borderCollapse: "separate", borderSpacing: "0 10px", width: "99%", paddingBottom: "20px"}}>
                    <colgroup>
                        {
                            (
                                () => {
                                    const tab = []
                                    for(let i = 0; i < this.state.Headers.length; i++) {
                                        if (this.state.Sizes[i] !== undefined) tab.push(<col style={this.state.Sizes[i]}/>)
                                        else tab.push(<col/>)
                                    }
                                    return tab
                                }
                            )()
                        }
                    </colgroup>
                    <thead style={{position:'sticky', top: "0", backgroundColor: "white", zIndex: "2"}}>
                        <tr style={{ backgroundColor: "white"}}>
                            {
                                (
                                    () => {
                                        const tab = []
                                        this.state.Headers.forEach(
                                            (e,i) => {
                                                tab.push(
                                                    <TabHe
                                                        sorted={this.state.SortBy == i}
                                                        reversed={this.state.reversedSort}
                                                        onSort={() => SetSorting(i)}
                                                    >
                                                        {
                                                            e
                                                        }
                                                    </TabHe>
                                                )
                                            }
                                        )
                                        return tab
                                    }
                                )()
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (
                                () => {
                                    const tab = []
                                    if (this.state.Data.length > 0) 
                                        this.state.Data.forEach(
                                            e => {
                                                if (this.props.render !== undefined) tab.push(this.props.render(e))
                                            }
                                        )
                                    else tab.push(<tr>
                                        <th colSpan={this.state.Headers.length}>
                                            <h2 style={{textAlign: "center"}}>Brak danych</h2>
                                        </th>
                                    </tr>)
                                    return tab
                                }
                            )()
                        }
                    </tbody>
                </Table>
            </ScrollArea>
        )
    }

}

export default TableView;