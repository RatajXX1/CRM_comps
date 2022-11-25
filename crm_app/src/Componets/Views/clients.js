import { Button, Card, Container, Stack, Title } from "@mantine/core";
import TableView from "../CRM_table";




function ClientsView() {
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

                        data={
                            [
                                {
                                    ID: 1,
                                    Namop: "dMDR",
                                    tittle: "MDR",
                                    dates: "20202-10-10 10:00:00"
                                }                                                                                   
                            ]
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
                            (data) => <tr className="EventsTabRow">
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