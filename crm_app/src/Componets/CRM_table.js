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
            Data:[]
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

    render() {
        const TabHe = (props) => {
            const {children, reversed, sorted, onSort} = props
            const { classes } = this.style();
            const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
            return (
                <th className={classes.th}> 
                    <UnstyledButton className={classes.control}>
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

        return (
            <ScrollArea sx={{width: "100%"}}>
                <Table  sx={{tableLayout: "auto",borderCollapse: "separate", borderSpacing: "0 10px"}}>
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
                                            e => {
                                                tab.push(
                                                    <TabHe
                                                        sorted={false}
                                                        reversed={false}
                                                        onSort={() => false}
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