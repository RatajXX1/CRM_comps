import { Button, Card, Container, Group, Highlight, Modal, ScrollArea, Select, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { RichTextEditor } from "@mantine/tiptap";
import Link from "@tiptap/extension-link";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {IconArrowLeft, IconChevronRight,IconMan,IconSearch,IconUserCircle} from "@tabler/icons"
import { DatePicker } from '@mantine/dates';
import 'dayjs/locale/pl';
import { useState } from "react";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { useNavigate } from "react-router-dom";

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
    const navi = useNavigate()

    const Addfrom = useForm({
        initialValues: {
            tittle: "",
            desc: "",

        }
    })

    const Desceditor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),

        ],
        content: ""
    })

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
                    >
                        <TextInput
                            sx={{marginBottom: "20px", ".mantine-TextInput-input:focus":{ borderColor: "#2D5BFF"}}}
                            label="Nazwa"
                            placeholder="Nazwa"
                            variant="filled"
                            radius="md"
                            {...Addfrom.getInputProps('tittle')}
                        />
                        
                        <TextInput
                            sx={{marginBottom: "20px", ".mantine-TextInput-input:focus":{ borderColor: "#2D5BFF"}}}
                            label="Nazwa opisowa"
                            placeholder="Nazwa opisowa"
                            variant="filled"
                            radius="md"
                            {...Addfrom.getInputProps('tittle')}
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
                                <Group zIndex={1}>
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
                                </Group>
                                {
                                    (
                                        ()=> {
                                            const tab =[]
                                            for(let i = 0; i < Open; i++)
                                                tab.push(
                                                    <Group zIndex={1}>
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
                                                </Group>
                                                )
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