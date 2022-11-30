import { Button, Card, Container, Modal, Select, Stack, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import TableView from "../CRM_table";
import {IconPlus, IconDeviceFloppy} from "@tabler/icons"

function UsersView() {
    const [Open, SetOpen] = useState(false)
    const [ModOpen, SetModOpen] = useState(false)

    return (
        <Stack
            sx={{
                width: "98%"
            }}
        >
            <Card sx={{height: "80vh"}} shadow="sm" p="lg" radius="md" withBorder>
                <Modal
                    opened={Open}
                    onClose={() => SetOpen(false)}
                    title={"Dodaj nowego użytkownika"}>
                    <Container fluid>
                        <form>
                            <TextInput
                                sx={{marginBottom: "20px", ".mantine-TextInput-input:focus":{ borderColor: "#2D5BFF"}}}
                                label="Login"
                                placeholder="Login"
                                variant="filled"
                                radius="md"
                            />
                            <TextInput
                                sx={{marginBottom: "20px", ".mantine-TextInput-input:focus":{ borderColor: "#2D5BFF"}}}
                                type="password"
                                label="Hasło"
                                placeholder="Hasło"
                                variant="filled"
                                radius="md"
                            />
                            <TextInput
                                sx={{marginBottom: "20px", ".mantine-TextInput-input:focus":{ borderColor: "#2D5BFF"}}}
                                label="Adres email"
                                type={"email"}
                                placeholder="Adres email"
                                variant="filled"
                                radius="md"
                            />
                            <Select
                                label="Ranga"
                                placeholder="Ranga"
                                variant="filled"
                                radius="md"
                                data={[
                                    { value: 0, label: 'Użytkownik' },
                                    { value: 1, label: 'Administrator' },
                                ]}
                            />
                            <Button 
                                rightIcon={<IconPlus/>}
                                type="submit"
                                sx={{
                                    color: "#2D5BFF",
                                    float: "right",
                                    marginTop: "30px",
                                    backgroundColor: "rgba(0, 45, 208, .1)",
                                    "&:hover": {
                                        backgroundColor: "rgba(0, 45, 208, .25)"
                                    },
                                }}
                            >Dodaj</Button>
                        </form>
                    </Container>
                </Modal>
                <Modal
                    opened={ModOpen}
                    onClose={() => SetModOpen(false)}
                    title={"Edycja użytkownika"}>
                    <Container fluid>
                        <form>
                            <TextInput
                                sx={{marginBottom: "20px", ".mantine-TextInput-input:focus":{ borderColor: "#2D5BFF"}}}
                                label="Login"
                                placeholder="Login"
                                variant="filled"
                                radius="md"
                            />
                            <TextInput
                                sx={{marginBottom: "20px", ".mantine-TextInput-input:focus":{ borderColor: "#2D5BFF"}}}
                                type="password"
                                label="Hasło"
                                placeholder="Hasło"
                                variant="filled"
                                radius="md"
                            />
                            <TextInput
                                sx={{marginBottom: "20px", ".mantine-TextInput-input:focus":{ borderColor: "#2D5BFF"}}}
                                label="Adres email"
                                type={"email"}
                                placeholder="Adres email"
                                variant="filled"
                                radius="md"
                            />
                            <Select
                                label="Ranga"
                                placeholder="Ranga"
                                variant="filled"
                                radius="md"
                                data={[
                                    { value: 0, label: 'Użytkownik' },
                                    { value: 1, label: 'Administrator' },
                                ]}
                            />
                            <Button 
                                rightIcon={<IconDeviceFloppy/>}
                                type="submit"
                                sx={{
                                    color: "#2D5BFF",
                                    float: "right",
                                    marginTop: "30px",
                                    backgroundColor: "rgba(0, 45, 208, .1)",
                                    "&:hover": {
                                        backgroundColor: "rgba(0, 45, 208, .25)"
                                    },
                                }}
                            >Zapisz</Button>
                        </form>
                    </Container>
                </Modal>
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
                            onClick={() => SetOpen(true)}
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
                        
                        sizes={
                            [
                                {width: "8%"},
                                {width: "20%"},
                                {width: "auto"},
                                {width: "15%"},
                                {width: "15%", textAlign: "right"},
                            ]
                        }

                        StartPage={1}

                        PaginationFunc={
                            (page) => `/api/users/index.php?page=${page}`
                        }

                        ResponseFunc={
                            resp => resp.Users
                        }

                        render={
                            (data) => <tr onClick={() => SetModOpen(true)} className="EventsTabRow">
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
                                            (
                                                () => {
                                                    if (data.email.replaceAll(" ", "") == "") return "--"
                                                    else return data.email
                                                }
                                            )()
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