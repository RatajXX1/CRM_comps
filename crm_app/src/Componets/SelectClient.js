import React from "react"
import { Button, Container, Modal, ScrollArea, Stack, TextInput } from "@mantine/core"
import {IconSearch,IconUserCircle} from "@tabler/icons"
import Server from "../Utilis/Server"


class SelectClient extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            Data: [],
            SearchQuery: "",
            CanLoad: true,
            Page: 1,
        }
        this.Area = React.createRef()
    }

    componentDidMount() {
        if (this.state.CanLoad) this.DownloadData()
    }

    refreshData() {
        this.setState({
            Data: [],
            SearchQuery: this.state.SearchQuery,
            CanLoad: true,
            Page: 1,
        })
        this.Area.current.scrollTop = 0
        setTimeout(this.DownloadData.bind(this), 500)
    }

    async DownloadData() {
        if (this.state.SearchQuery.replaceAll(" ", "") == "") await Server.ApiInstance()
            .get("api/clients/index.php?page=" + this.state.Page.toString())
            .then(
                resp => {
                    if (Object.entries(resp.data.Users).length >= 25) this.state.CanLoad = true
                    else this.state.CanLoad = false
                    this.state.Data = this.state.Data.concat(resp.data.Users)
                    this.forceUpdate()
                }
            )
        else await Server.ApiInstance()
            .get(`api/clients/search.php?query=${encodeURIComponent(this.state.SearchQuery)}&page=` + this.state.Page.toString())
            .then(
                resp => {
                    if (Object.entries(resp.data.Users).length >= 25) this.state.CanLoad = true
                    else this.state.CanLoad = false
                    this.state.Data = this.state.Data.concat(resp.data.Users)
                    this.forceUpdate()
                }
            )
    }

    scrollChange(x) {
        if (x.y >= (this.Area.current.scrollTopMax - 100) && this.state.canLoad) {
            this.state.canLoad = false
            this.state.Page += 1
            this.DownloadData()
        }
        // console.log(x, "Area wyskoskosc =", this.Area.current.scrollTopMax)
    }

    render() {
        return (
            <Modal
                opened={this.props.opened}
                onClose={this.props.onClose}
                title={this.props.title}
            >
                <Container fluid>
                    <TextInput
                        icon={<IconSearch/>}
                        placeholder="Szukaj"
                        variant="filled"
                        sx={{
                            ".mantine-TextInput-input:focus": {
                                borderColor: "#2D5BFF"
                            }
                        }}
                        onChange={
                            (e) => {
                                this.state.SearchQuery = e.target.value
                                this.refreshData()
                            }
                        }
                    />
                    <ScrollArea
                        viewportRef={this.Area}
                        sx={{
                            marginTop: "20px",
                            height: "400px"
                        }}
                    >
                        <Stack spacing={"xs"}>
                            {
                                (
                                    () => {
                                        const tab = []
                                        this.state.Data.forEach((element, index) => {
                                            tab.push(
                                                <Button
                                                    sx={{
                                                        alignItems: "left",
                                                        backgroundColor: "rgba(0, 45, 208, .1)",
                                                        color: "#2D5BFF",
                                                        "&:hover": {
                                                            backgroundColor: "rgba(0, 45, 208, .25)",
                                                        },
                                                        ".mantine-Button-inner": {
                                                            alignItems: "left",
                                                            justifyContent: "left"
                                                        }
                                                    }}
                                                    leftIcon={<IconUserCircle/>}
                                                    onClick={
                                                        () => {
                                                            if (this.props.onSelect !== undefined) this.props.onSelect(element)
                                                            if (this.props.onClose !== undefined) this.props.onClose()
                                                        }
                                                    }
                                                >
                                                    {element.Namop}
                                                </Button>
                                            )
                                        });
                                        return tab
                                    }
                                )()
                            }
                        </Stack>
                    </ScrollArea>
                </Container>
            </Modal>
        )
    }

}

export default SelectClient;