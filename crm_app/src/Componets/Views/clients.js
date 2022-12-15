import { Button, Card, Container, Stack, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import TableView from "../CRM_table";




function ClientsView() {
    const navi = useNavigate()



    return (
        <Stack
            sx={{
                width: "98%"
            }}
        >
            <Card sx={{height: "80vh"}} shadow="sm" p="lg" radius="md" withBorder>
                <Container fluid sx={{height: "100%"}}>
                    <Card.Section sx={{width: "100%", margin: "10px 0 10px 0"}}>
                        <Button
                            onClick={() => navi("/add/clients")}
                            sx={{
                                float:"left",
                                backgroundColor: "rgba(0, 45, 208, .1)",
                                color: "#2D5BFF",
                                "&:hover": {
                                    backgroundColor: "rgba(0, 45, 208, .25)"
                                }
                            }}
                        >
                            Dodaj nowego klienta
                        </Button>
                    </Card.Section>
                    <TableView
                        headers={
                            [
                                "ID",
                                "Nazwa opisowa",
                                "Nazwa",
                                "Data dodanie"
                            ]
                        }

                        PaginationFunc={
                            (page) => `api/clients/index.php?page=${page}`
                        }

                        ResponseFunc={
                            resp => resp.Users
                        }
                        
                        sizes={
                            [
                                {width: "20%"},
                                {width: "auto"},
                                {width: "15%"},
                                {width: "15%", textAlign: "right"},
                            ]
                        }

                        render={
                            (data) => <tr 
                                    onClick={
                                        () => {
                                            window.localStorage.setItem("ClientData", JSON.stringify(data))
                                            navi("/show/client")
                                        }} 
                                    className="EventsTabRow"
                                >
                                <td>
                                    <a>
                                        {
                                            data.ID
                                        }
                                    </a>
                                </td>
                                <td>
                                    <a>
                                        {
                                            data.Namop
                                        }
                                    </a>
                                </td>
                                <td>
                                    <a>
                                        {
                                            data.tittle
                                        }
                                    </a>
                                </td>
                                <td>
                                    <a>
                                        {
                                            data.dates
                                        }
                                    </a>
                                </td>
                            </tr>
                        }
                    />
                </Container>
            </Card>
        </Stack>
    )
}

export default ClientsView;