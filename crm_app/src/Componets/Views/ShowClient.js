import { Alert, Button, Card, Container, Group, Highlight, Modal, ScrollArea, Select, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { RichTextEditor } from "@mantine/tiptap";
import Link from "@tiptap/extension-link";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {IconArrowLeft, IconChevronRight,IconX,IconSearch,IconUserCircle} from "@tabler/icons"
import { DatePicker } from '@mantine/dates';
import 'dayjs/locale/pl';
import { useEffect, useState } from "react";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { useNavigate } from "react-router-dom";
import Server from "../../Utilis/Server";

// 
// Nazwa Opisowa
// Nazwa
// dane konatkowe
// 
// 
// 
// 

function ShowClientView() {
    const [Open, setOpened] = useState(1)
    const [Load, SetLoad] = useState(false)
    const [Not, SetNot] = useState(" ")
    const [Contacs, SetContacs] = useState([])
    const navi = useNavigate()

    const Addfrom = useForm({
        initialValues: {
            Name: "",
            DescName: "",
        }
    })

    useEffect(() => {
        if (!Load) {
            if (window.localStorage.getItem("ClientData") == null) {
                navi(-1)
            } else {
                let ds = JSON.parse(window.localStorage.getItem("ClientData"))
                Addfrom.setValues({
                    Name: ds.tittle,
                    DescName: ds.Namop,
                })
                // console.log(JSON.parse(ds.Contacs))
                
                SetContacs(JSON.parse(ds.Contacs))
                setOpened(Object.entries(JSON.parse(ds.Contacs)).length)
                // console.log("tlye", Open, "A", JSON.parse(ds.Contacs).length)   
            }
            SetLoad(true)
        }
    })

    const SaveEdit = (values) => {
        let ds = JSON.parse(window.localStorage.getItem("ClientData"))
        Server.ApiInstance()
            .post("api/clients/edit.php", {ID: ds.ID, Contacs: JSON.stringify(Contacs), ...values})
            .then(
                resp => {
                    if (resp.data.CODE == "OK") {
                        navi(-1)
                    } else {
                        SetNot("Wystąpił bład, spróbuj ponownie!")
                    }
                }
            )
            .catch(
                () => {
                    SetNot("Wystąpił bład, spróbuj ponownie!")
                }
            )
    }

    const RemoveUser = () => {
        let ds = JSON.parse(window.localStorage.getItem("ClientData"))
        Server.ApiInstance()
            .get("api/clients/remove.php?ID=" + ds.ID)
            .then(
                resp => {
                    if (resp.data.CODE == "OK") {
                        navi(-1)
                    } else {
                        SetNot("Wystąpił bład, spróbuj ponownie!")
                    }
                }
            )
            .catch(
                () => {
                    SetNot("Wystąpił bład, spróbuj ponownie!")
                }
            )
    }

    return (
        <Stack
            sx={{
                width: "98%"
            }}
        >
            <Group>
                <Button
                    leftIcon={<IconArrowLeft/>}
                    onClick={()=> navi(-1)}
                    sx={{
                        backgroundColor: "rgba(0, 45, 208, .1)",
                        color: "#2D5BFF",
                        "&:hover": {
                            backgroundColor: "rgba(0, 45, 208, .25)"
                        }
                    }}
                >
                    Powrót
                </Button>
            </Group>
            {
                    Not != " " && <Alert sx={{marginBottom: "20px"}} onClose={() => SetNot(" ")} icon={<IconX size={18} />} color="red">
                    {
                        Not
                    }
                    </Alert>
            }
            <Card sx={{height: "80vh"}} shadow="sm" p="lg" radius="md" withBorder>
                <Container fluid sx={{height: "100%"}}>
                    <Title 
                        sx={{
                            position:"relative",
                            lineHeight: "35px"
                        }}
                        order={2}
                    >
                        Edycja użytkownika - <span style={{color: "#2D5BFF",}}>MDR</span>
                    </Title>
                    
                    <form 
                        style={{
                            position: "relative",
                            height: "100%",
                            marginTop: "10px"
                        }}
                        onSubmit={Addfrom.onSubmit((values) => SaveEdit(values))}
                    >
                        <TextInput
                            sx={{marginBottom: "20px", ".mantine-TextInput-input:focus":{ borderColor: "#2D5BFF"}}}
                            label="Nazwa"
                            placeholder="Nazwa"
                            variant="filled"
                            radius="md"
                            {...Addfrom.getInputProps('Name')}
                        />
                        
                        <TextInput
                            sx={{marginBottom: "20px", ".mantine-TextInput-input:focus":{ borderColor: "#2D5BFF"}}}
                            label="Nazwa opisowa"
                            placeholder="Nazwa opisowa"
                            variant="filled"
                            radius="md"
                            {...Addfrom.getInputProps('DescName')}
                        />

                        <Title order={6} sx={{fontWeight: "500"}}>
                            Dane konatkowe
                            <Button 
                                onClick={() => setOpened(Open + 1)}
                                variant="subtle"
                                sx={{
                                    color: "#2D5BFF",
                                    marginTop: "10px",
                                    "&:hover": {
                                        backgroundColor: "rgba(0, 45, 208, .1)"
                                    }
                                }}
                            >Dodaj kolejny kontakt</Button>
                        </Title>
                        <ScrollArea sx={{height: "55%", marginTop: "20px", paddingBottom: "10px"}}>
                            <Stack zIndex={2}>
                                {/* <Group zIndex={1}>
                                    <Select
                                        placeholder="Typ"
                                        variant="filled"
                                        radius="md"
                                        zIndex={10}
                                        data={[
                                            { value: 0, label: 'Numer telefonu' },
                                            { value: 1, label: 'Adres email'},
                                            { value: 2, label: 'inny'}
                                        ]}
                                    />
                                    <TextInput
                                        sx={{".mantine-TextInput-input:focus":{ borderColor: "#2D5BFF"}}}
                                        placeholder="kontakt"
                                        variant="filled"
                                        radius="md"
                                    />                                                                        
                                </Group> */}
                                {
                                    (
                                        ()=> {
                                            const tab =[]
                                            for(let i = 0; i < Open; i++) {
                                                if (Contacs[i] === undefined) {
                                                    if (Load) Contacs[i] = {content: "", value: null}
                                                    else continue
                                                }
                                                tab.push(
                                                    <Group zIndex={1}>
                                                        <Select
                                                            placeholder="Typ"
                                                            variant="filled"
                                                            radius="md"
                                                            zIndex={10}
                                                            defaultValue={Contacs[i].value}
                                                            data={[
                                                                { value: 0, label: 'Numer telefonu' },
                                                                { value: 1, label: 'Adres email'},
                                                                { value: 2, label: 'inny'}
                                                            ]}
                                                            onChange={e => {Contacs[i].value = e}}
                                                        />
                                                        <TextInput
                                                            sx={{".mantine-TextInput-input:focus":{ borderColor: "#2D5BFF"}}}
                                                            placeholder="kontakt"
                                                            variant="filled"
                                                            radius="md"
                                                            defaultValue={Contacs[i].content}
                                                            onChange={e => {Contacs[i].content = e.target.value}}
                                                        />                                                                        
                                                    </Group>
                                                )
                                            }
                                            return tab
                                        }
                                    )()
                                }
                                {/* <Group>

                                </Group> */}

                            </Stack>
                        </ScrollArea>


                        <Group sx={{
                                position: "absolute",
                                bottom: "40px",
                                right: "0"
                            }} position="right" mt="md">
                                <Button
                                    onClick={() => RemoveUser()}
                                    variant="subtle"
                                    sx={{
                                        // backgroundColor: "rgba(0, 45, 208, .1)",
                                        color: "#2D5BFF",
                                        "&:hover": {
                                            backgroundColor: "rgba(0, 45, 208, .25)"
                                        }
                                    }}
                                >Usuń</Button>
                                <Button
                                    rightIcon={<IconChevronRight/>}
                                    type="submit"
                                    sx={{
                                        backgroundColor: "rgba(0, 45, 208, .1)",
                                        color: "#2D5BFF",
                                        "&:hover": {
                                            backgroundColor: "rgba(0, 45, 208, .25)"
                                        }
                                    }}
                                >Zapisz</Button>
                        </Group>

                    </form>
                </Container>
            </Card>
        </Stack>
    )
}

export default ShowClientView;