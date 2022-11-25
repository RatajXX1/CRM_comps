import { Button, Card, Container, Stack, Title } from "@mantine/core";
import TableView from "../CRM_table";




function UsersView() {
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
                                float:"right",
                                backgroundColor: "rgba(0, 45, 208, .1)",
                                color: "#2D5BFF",
                                "&:hover": {
                                    backgroundColor: "rgba(0, 45, 208, .25)"
                                }
                            }}
                        >
                            Filtry
                        </Button>
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
                            Dodaj nowe
                        </Button>
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
                                    Name:1,
                                    Client: "dasa",
                                    tittle: "dasa",
                                    dates: "20202-10-10 10:00:00"
                                },            
                                {
                                    Name:2,
                                    Client: "dasa",
                                    tittle: "dasa",
                                    dates: "20202-10-10 10:00:00"
                                },  
                                {
                                    Name:0,
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
                                    <a className={(() => {if (data.Name == 0) return "EventsTabRow_state_work"; else if (data.Name == 1) return "EventsTabRow_state_end"; else if (data.Name == 2) return "EventsTabRow_state_succes"})()}>
                                        {
                                            (
                                                () => {
                                                    if (data.Name == 0) return "W trakcie"
                                                    else if (data.Name == 1) return "Opóznione"
                                                    else if (data.Name == 2) return "Zakończne"
                                                }
                                            )() 
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
                                    <a style={{textAlign: "right"}}>
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

export default UsersView;