import { Card, Container, Stack, Title } from "@mantine/core";
import TableView from "../CRM_table";




function EventsView() {
    return (
        <Stack
            sx={{
                width: "98%"
            }}
        >
            <Card sx={{height: "80vh"}} shadow="sm" p="lg" radius="md" withBorder>
                <Container fluid sx={{height: "100%"}}>
                    <Card.Section>
                        <Title order={2}>Wydarzenia</Title>
                    </Card.Section>
                    <TableView
                        headers={
                            [
                                "Status",
                                "Klient",
                                "Tytuł",
                                "Data rozpoczęcia",
                                "Data zakończenia",
                            ]
                        }

                        data={
                            [
                                {
                                    Name:"dsa",
                                    Client: "dasa",
                                    tittle: "dasa",
                                    dates: "20202-10-10 10:00:00"
                                },
                                {
                                    Name:"dsa",
                                    Client: "dasa",
                                    tittle: "dasa",
                                    dates: "20202-10-10 10:00:00"
                                },
                                {
                                    Name:"dsa",
                                    Client: "dasa",
                                    tittle: "dasa",
                                    dates: "20202-10-10 10:00:00"
                                },
                                {
                                    Name:"dsa",
                                    Client: "dasa",
                                    tittle: "dasa",
                                    dates: "20202-10-10 10:00:00"
                                },
                                {
                                    Name:"dsa",
                                    Client: "dasa",
                                    tittle: "dasa",
                                    dates: "20202-10-10 10:00:00"
                                },
                            ]
                        }
                        
                        sizes={
                            [
                                {width: "8%"},
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
                                            data.Name
                                        }
                                    </a>
                                </td>
                                <td>
                                    <a>
                                        {
                                            data.Client
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
                                <td>
                                    <a>
                                        --
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

export default EventsView;