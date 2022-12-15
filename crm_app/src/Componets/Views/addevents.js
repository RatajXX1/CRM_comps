import { Alert, Button, Card, Container, Group, Highlight, Modal, ScrollArea, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { RichTextEditor } from "@mantine/tiptap";
import Link from "@tiptap/extension-link";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {IconArrowLeft, IconChevronRight,IconMan,IconSearch,IconUserCircle,IconX} from "@tabler/icons"
import { DatePicker } from '@mantine/dates';
import 'dayjs/locale/pl';
import { useEffect, useState } from "react";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { useNavigate } from "react-router-dom";
import SelectClient from "../SelectClient";
import Server from "../../Utilis/Server";


function AddEventsView() {
    const [Open, setOpened] = useState(false)
    const [Not, SetNot] = useState(" ")
    const [ClientName, SetClientName] = useState("")
    const [ClientID, SetClientID] = useState(0)
    const navi = useNavigate()

    const Addfrom = useForm({
        initialValues: {
            title: "",
            ETA: "",
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

    const AddEvents = (values) => {
        // console.log(values, Desceditor.getHTML())
        
        if (values.ETA != "") {
            values.ETA = values.ETA.toISOString().split("T")[0];
        } else {
            delete values["ETA"]
        }
        Server.ApiInstance()
            .post("api/events/add.php", {ClientID: ClientID,description: Desceditor.getHTML(),...values})
            .then(
                resp => {
                    if (resp.data.CODE == "OK") {
                        navi(-1)
                    } else {
                        SetNot("Wystapił bład, spróbuj ponownie pozniej!")
                    }
                }
            )
            .catch(
                () => {
                    SetNot("Wystapił bład, spróbuj ponownie pozniej!")
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
                        Nowe wydarzenie -
                        <Button
                            onClick={() => setOpened(true)}
                            leftIcon={<IconMan/>}
                            sx={{
                                position: "absolute",
                                color: "#2D5BFF",
                                "&:hover": {
                                    backgroundColor: "rgba(0, 45, 208, .25)"
                                },
                                padding: "0 5px 0 0",
                                lineHeight: "35px",
                                height: "35px",
                                top: "55%",
                                transform: "translate(0, -50%)",
                                "span": {
                                    margin: "0"
                                },
                                "&:active": {
                                    transform: "translate(0, -50%)",
                                }
                            }}
                            variant="subtle"
                        >
                            {
                                (ClientName === "" || ClientID === 0) ? "Wybierz Klienta" : ClientName
                            }
                        </Button>
                    </Title>
                    <SelectClient
                        opened={Open}
                        onClose={() => setOpened(false)}
                        title={"Wybierz klienta"}
                        onSelect={
                            (data) => {
                                SetClientID(parseInt(data.ID))
                                SetClientName(data.Namop)
                            }                            
                        }
                    />
                    {/* <Modal
                        opened={Open}
                        onClose={() => setOpened(false)}
                        title={"Wybierz klienta"}
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
                            />
                            <ScrollArea
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
                                                for(let i =0; i < 25; i++) 
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
                                                        >
                                                            Klient {i}
                                                        </Button>
                                                    )
                                                return tab
                                            }
                                        )()
                                    }
                                </Stack>
                            </ScrollArea>
                        </Container>
                    </Modal> */}
                    <form 
                        style={{
                            position: "relative",
                            height: "100%",
                            marginTop: "10px"
                        }}
                        onSubmit={Addfrom.onSubmit((values) => AddEvents(values))}
                    >
                        <TextInput
                            sx={{marginBottom: "20px", ".mantine-TextInput-input:focus":{ borderColor: "#2D5BFF"}}}
                            label="Tytuł"
                            placeholder="Tytuł"
                            variant="filled"
                            radius="md"
                            {...Addfrom.getInputProps('title')}
                        />
                        
                        <Title order={6} sx={{fontWeight:"500"}}>Opis</Title>
                        <RichTextEditor 
                            editor={Desceditor} 
                            sx={{
                                position: "relative",
                                height: "40%",
                                ".mantine-TypographyStylesProvider-root": {
                                    height: "90%"
                                },
                                ".mantine-RichTextEditor-content": {
                                    height: "100%"
                                },
                                ".ProseMirror": {
                                    height: "100%"
                                }
                            }}
                        >
                            <RichTextEditor.Toolbar sticky stickyOffset={60}>
                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Bold />
                                    <RichTextEditor.Italic />
                                    <RichTextEditor.Underline />
                                    <RichTextEditor.Strikethrough />
                                    <RichTextEditor.ClearFormatting />
                                    <RichTextEditor.Highlight />
                                    <RichTextEditor.Code />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.H1 />
                                    <RichTextEditor.H2 />
                                    <RichTextEditor.H3 />
                                    <RichTextEditor.H4 />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Blockquote />
                                    <RichTextEditor.Hr />
                                    <RichTextEditor.BulletList />
                                    <RichTextEditor.OrderedList />
                                    {/* <RichTextEditor.Subscript /> */}
                                    {/* <RichTextEditor.Superscript /> */}
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Link />
                                    <RichTextEditor.Unlink />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.AlignLeft />
                                    <RichTextEditor.AlignCenter />
                                    <RichTextEditor.AlignJustify />
                                    <RichTextEditor.AlignRight />
                                </RichTextEditor.ControlsGroup>
                            </RichTextEditor.Toolbar>
                            <ScrollArea onClick={() => Desceditor.chain().focus()}  sx={{height: "80%", position: "relative", cursor: "text"}}>
                                <RichTextEditor.Content sx={{height: "100%"}}/>
                            </ScrollArea>
                        </RichTextEditor>
                            

                        <DatePicker 
                            locale="pl"
                            sx={{
                                width: "305px",
                                marginTop: "20px",
                                ".mantine-DatePicker-monthPickerControlActive": {
                                    backgroundColor: "rgba(0, 45, 208, .25)",
                                },
                                ".mantine-DatePicker-yearPickerControlActive": {
                                    backgroundColor: "rgba(0, 45, 208, .25)",
                                }
                            }}
                            inputFormat={"MM/DD/YYYY"}
                            labelFormat={"MM/DD/YYYY"}
                            placeholder="MM/DD/YYYY" 
                            {...Addfrom.getInputProps('ETA')}
                            label="Przypuszczalna data zakończenia (opcjonale)" 
                            dayStyle={
                                (date) => {
                                    if (date.getDay() == 0 || date.getDay() == 6) 
                                        return {
                                            color: "#2D5BFF"
                                        }
                                    else return {}
                                }
                            }
                        />

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

export default AddEventsView;