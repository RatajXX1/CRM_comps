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
                                float:"left",
                                backgroundColor: "rgba(0, 45, 208, .1)",
                                color: "#2D5BFF",
                                "&:hover": {
                                    backgroundColor: "rgba(0, 45, 208, .25)"
                                }
                            }}
                        >
                            Dodaj nowego użytkownika
                        </Button>
                    </Card.Section>
                    <TableView
                        headers={
                            [
                                "ID",
                                "Ranga",
                                "Login",
                                "Email",
                                "Data dodania",
                            ]
                        }

                        data={
                            [
                                {
                                    ID:1,
                                    Type: 1,
                                    tittle: "root",
                                    email: "root@mail.com",
                                    dates: "20202-10-10 10:00:00"
                                }                                                                                 
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
                                            data.ID
                                        }
                                    </a>
                                </td>
                                <td>
                                    <a>
                                        {
                                            (
                                                () => {
                                                    if (data.Type == 1) return "Użytkownik"
                                                    else if (data.Type == 2) return "Administrator"
                                                }
                                            )()
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
                                            data.email
                                        }
                                    </a>
                                </td>
                                <td>
                                    <a style={{textAlign: "right"}}>
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

export default UsersView;