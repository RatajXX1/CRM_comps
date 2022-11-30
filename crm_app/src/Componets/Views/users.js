import { Alert, Button, Card, Container, Modal, Select, Stack, TextInput, Title } from "@mantine/core";
import { createRef, useRef, useState } from "react";
import TableView from "../CRM_table";
import {IconPlus, IconDeviceFloppy,IconX} from "@tabler/icons"
import { useForm } from "@mantine/form";
import Server from "../../Utilis/Server";

function UsersView() {
    const [Open, SetOpen] = useState(false)
    const [AddNot, SetAddNot] = useState(" ")
    // const [AddNot, SetAddNot] = useState(" ")
    const [ModOpen, SetModOpen] = useState(null)
    let refreshTab = useRef(null);

    const UserAddForm = useForm({
        initialValues: {
            Login: "",
            Email: "",
            Password: "",
            Rank: 1
        }

    })

    const UserEditForm = useForm({
        initialValues: {
            Login: "",
            Email: "",
            Password: "",
            Rank: 1
        }
    })

    const AddUserFun = (val) => {
        Server.ApiInstance()
            .post(
                "/api/users/add.php",
                {...val}
            )
            .then(
                resp => {
                    if (resp.data.CODE == "NO") SetAddNot("Wystąpił bład spróbuj ponwonie!")
                    else {
                        SetAddNot(' ')
                        SetOpen(false)
                        UserAddForm.reset()
                        // refreshTab()
                        refreshTab.current.refresh()
                        // console.log(refreshTab.current.refresh)
                    }
                }
            )
            .catch(
                err => {
                    SetAddNot("Wystąpił bład spróbuj ponwonie!")
                }
            )
    }

    const SaveEditUser = (val) => {
        if (val.Password !== undefined && val.Password.replaceAll(" ", "") == "") delete val["Password"]
        Server.ApiInstance()
            .post(
                "/api/users/edit.php",
                {ID: ModOpen.ID,...val}
            )
            .then(
                resp => {
                    if (resp.data.CODE == "NO") SetAddNot("Wystąpił bład spróbuj ponwonie!")
                    else {
                        SetAddNot(' ')
                        SetModOpen(null)
                        UserEditForm.reset()
                        // refreshTab()
                        refreshTab.current.refresh()
                        // console.log(refreshTab.current.refresh)
                    }
                }
            )
            .catch(
                err => {
                    SetAddNot("Wystąpił bład spróbuj ponwonie!")
                }
            )
    }

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
                        {
                            AddNot != " " && <Alert sx={{marginBottom: "20px"}} onClose={() => SetAddNot(" ")} icon={<IconX size={18} />} color="red">
                            {
                                AddNot
                            }
                            </Alert>
                        }
                        <form
                            onSubmit={UserAddForm.onSubmit((values) => AddUserFun(values))}
                        >
                            <TextInput
                                sx={{marginBottom: "20px", ".mantine-TextInput-input:focus":{ borderColor: "#2D5BFF"}}}
                                label="Login"
                                placeholder="Login"
                                variant="filled"
                                radius="md"
                                {...UserAddForm.getInputProps('Login')}
                            />
                            <TextInput
                                sx={{marginBottom: "20px", ".mantine-TextInput-input:focus":{ borderColor: "#2D5BFF"}}}
                                type="password"
                                label="Hasło"
                                placeholder="Hasło"
                                variant="filled"
                                radius="md"
                                {...UserAddForm.getInputProps('Password')}
                            />
                            <TextInput
                                sx={{marginBottom: "20px", ".mantine-TextInput-input:focus":{ borderColor: "#2D5BFF"}}}
                                label="Adres email"
                                type={"email"}
                                placeholder="Adres email"
                                variant="filled"
                                radius="md"
                                {...UserAddForm.getInputProps('Email')}
                            />
                            <Select
                                label="Ranga"
                                placeholder="Ranga"
                                variant="filled"
                                radius="md"
                                data={[
                                    { value: 1, label: 'Użytkownik' },
                                    { value: 2, label: 'Administrator' },
                                ]}
                                {...UserAddForm.getInputProps('Rank')}
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
                    opened={ModOpen !== null}
                    onClose={() => SetModOpen(null)}
                    title={"Edycja użytkownika"}>
                    <Container fluid>
                        {
                            AddNot != " " && <Alert sx={{marginBottom: "20px"}} onClose={() => SetAddNot(" ")} icon={<IconX size={18} />} color="red">
                            {
                                AddNot
                            }
                            </Alert>
                        }
                        <form
                            onSubmit={UserEditForm.onSubmit((values) => SaveEditUser(values))}
                        >
                            <TextInput
                                sx={{marginBottom: "20px", ".mantine-TextInput-input:focus":{ borderColor: "#2D5BFF"}}}
                                label="Login"
                                placeholder="Login"
                                variant="filled"
                                radius="md"
                                {...UserEditForm.getInputProps('Login')}
                            />
                            <TextInput
                                sx={{marginBottom: "20px", ".mantine-TextInput-input:focus":{ borderColor: "#2D5BFF"}}}
                                type="password"
                                label="Hasło"
                                placeholder="Hasło"
                                variant="filled"
                                radius="md"
                                {...UserEditForm.getInputProps('Password')}
                            />
                            <TextInput
                                sx={{marginBottom: "20px", ".mantine-TextInput-input:focus":{ borderColor: "#2D5BFF"}}}
                                label="Adres email"
                                type={"email"}
                                placeholder="Adres email"
                                variant="filled"
                                radius="md"
                                {...UserEditForm.getInputProps('Email')}
                            />
                            <Select
                                label="Ranga"
                                placeholder="Ranga"
                                variant="filled"
                                radius="md"
                                data={[
                                    { value: 1, label: 'Użytkownik' },
                                    { value: 2, label: 'Administrator' },
                                ]}
                                {...UserEditForm.getInputProps('Rank')}
                            />
                            <Button 
                                variant="subtle"
                                sx={{
                                    color: "#2D5BFF",
                                    float: "left",
                                    marginTop: "30px",
                                    // backgroundColor: "rgba(0, 45, 208, .1)",
                                    "&:hover": {
                                        backgroundColor: "rgba(0, 45, 208, .25)"
                                    },
                                }}
                            >Usuń</Button>
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
                        ref={refreshTab}
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
                            (data) => <tr onClick={() => {
                                SetModOpen(data)
                                UserEditForm.setValues({
                                    Login: data.tittle,
                                    Email: data.email,
                                    Password: "",
                                    Rank: parseInt(data.Type) 
                                })
                            }} className="EventsTabRow">
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