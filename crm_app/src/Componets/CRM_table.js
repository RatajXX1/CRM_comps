import { Center, createStyles, Group, ScrollArea, Table, Text, UnstyledButton } from "@mantine/core";
import React from "react";
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons';
import "../style/dashboard.scss"

class TableView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            Headers:[],
            Sizes: [],
            Data:[],
            SortBy: null,
            reversedSort: false
        }

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
        this.forceUpdate()
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
            <ScrollArea type="always" offsetScrollbars sx={{width: "100%", height: "100%"}}>
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
                    <thead>
                        <tr>
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
                                    this.state.Data.forEach(
                                        e => {
                                            if (this.props.render !== undefined) tab.push(this.props.render(e))
                                        }
                                    )
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