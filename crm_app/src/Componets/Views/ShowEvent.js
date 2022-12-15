import { Box, Button, Card, Container, Group, Highlight, Modal, ScrollArea, Select, Stack, TextInput, Timeline, Title,Text, Textarea, Alert } from "@mantine/core";
import { useForm } from "@mantine/form";
import { RichTextEditor } from "@mantine/tiptap";
import Link from "@tiptap/extension-link";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {IconArrowLeft, IconChevronRight,IconMan,IconSearch,IconPlus} from "@tabler/icons"
import { DatePicker } from '@mantine/dates';
import 'dayjs/locale/pl';
import { useEffect, useState } from "react";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { useNavigate } from "react-router-dom";
import { IconGitBranch, IconX, IconGitCommit, IconMessageDots } from '@tabler/icons';
import Server from "../../Utilis/Server";

const PassedTimeHour = (a) => {
    let times = new Date(a)
    let today = new Date()
    return Math.floor((today.getTime() - times.getTime()) / 3600000)
}

const PassedTimeMinute = (a) => {
    let times = new Date(a)
    let today = new Date()
    return Math.floor((today.getTime() - times.getTime()) / 60000)
}

const PassedTimeDay = (a) => {
    let times = new Date(a)
    let today = new Date()
    return Math.floor((today.getTime() - times.getTime()) / (24 * 3600000))
}

const TimeWidget = (a) => {
    let timed = PassedTimeHour(a)
    if (timed < 1) {
        return <Text size="xs" mt={4}>{PassedTimeMinute(a)} minut temu</Text>
    } else {
        if (timed > 48) {
            if (timed > 240) {
                return <Text size="xs" mt={4}>{a}</Text>
            } else {
                return <Text size="xs" mt={4}>{PassedTimeDay(a)} dni temu</Text>
            }
        } else {
            return <Text size="xs" mt={4}>{PassedTimeHour(a)} godzin temu</Text>
        }
    }

}

function ShovEventsView() {
    const [Open, setOpened] = useState(false)
    const [OpenEdit, setOpenEdit] = useState(false)
    const [Data, SetData] = useState({Contacs: {}, State: 1, title: "", DescName: "",  Name: "", description: "", created: "", ETA: "", ID: 0})
    const [States, SetStates] = useState({})
    const [Load, SetLoad] = useState(false)
    const [Not, SetNot] = useState('')
    const navi = useNavigate()
    let params = window.localStorage.getItem("EID")
    console.log("tgest")

    const Addfrom = useForm({
        initialValues: {
            Title: "",
            Type: 0,
            EComment:""
        }
    })

    const RefreshData = () => {
        Server.ApiInstance()
            .get("api/events/event.php?ID=" + params)
            .then(
                resp => {
                    if (resp.data.CODE == "OK") {
                        SetData(resp.data.Event)
                        SetStates(resp.data.States)
                        Data.Contacs = JSON.parse(resp.data.Event.Contacs)
                        if (typeof Data.Contacs == "string" && Data.Contacs !== undefined) Data.Contacs = JSON.parse(Data.Contacs)
                    } 
                    // else navi(-1)
                }
            )
            .catch(
                err => {
                    console.log(err)
                    // navi(-1)
                    
                }
            )
    }

    const AddNewComment = (values) => {
        Server.ApiInstance()
            .post("api/events/addstate.php", {EventID: params, ...values})
            .then(
                resp => {
                    if (resp.data.CODE == "OK") {
                        Addfrom.reset()
                        SetNot("")
                        setOpenEdit(false)
                        RefreshData()
                    } else {
                        SetNot("Wystąpił błąd, spróbuj ponownie pozniej!")
                    }
                }
            )
            .catch(
                () => {
                    SetNot("Wystąpił błąd, spróbuj ponownie pozniej!")
                }
            )
    }

    const RemoveEvent = () => {
        Server.ApiInstance()
            .post("api/events/remove.php?ID="+Data.ID)
            .then(
                resp => {
                    if (resp.data.CODE == "OK") {
                        navi(-1)
                    }
                }
            )
            .catch(
                () => {
                    
                }
            )
    }
 
    // if (params.get("ID") == undefined || params.get("ID") == null) navi(-1)
    
    useEffect(() => {
        // console.log('robione, ID=', params)
        // params = new URLSearchParams(window.location.href.split("?")[1])
        if (params != undefined && params != null) {
            Server.ApiInstance()
                .get("api/events/event.php?ID=" + params)
                .then(
                    resp => {
                        if (resp.data.CODE == "OK") {
                            SetData(resp.data.Event)
                            SetStates(resp.data.States)
                            Data.Contacs = JSON.parse(resp.data.Event.Contacs)
                            SetLoad(true)
                        } 
                        else navi(-1)
                    }
                )
                .catch(
                    err => {
                        console.log(err)
                        navi(-1)
                        
                    }
                )
                if (typeof Data.Contacs == "string" && Data.Contacs !== undefined) Data.Contacs = JSON.parse(Data.Contacs)            
        }
    }, [])
    
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
            <Card sx={{minHeight: "80vh"}} shadow="sm" p="lg" radius="md" withBorder>
                <Container fluid sx={{height: "100%"}}>
                    <Title 
                        sx={{
                            position:"relative",
                            lineHeight: "35px",
                            marginBottom: "20px",
                            marginTop: "10px"
                        }}
                        order={2}
                    >
                        <span
                            style={{
                                position: "absolute",
                                top: "-20px",
                                color: "#2D5BFF",
                                fontSize: "16px"
                            }}
                        >
                            {
                                (
                                    () => {
                                        if (Data.State == 1) return "W trakcie"
                                        else if (Data.State == 2) return "Opóznione"
                                        else if (Data.State == 3) return "Zakończne"
                                    }
                                )() 
                            }
                        </span>
                        {Data.title} - 
                        <Button
                            onClick={() => setOpened(true)}
                            leftIcon={<IconMan/>}
                            sx={{
                                position: "absolute",
                                color: "#2D5BFF",
                                fontSize: "18px",
                                "&:hover": {
                                    backgroundColor: "rgba(0, 45, 208, .25)"
                                },
                                padding: "0 5px 0 5px",
                                lineHeight: "35px",
                                height: "35px",
                                top: "53%",
                                transform: "translate(0, -50%)",
                                "span": {
                                    margin: "0"
                                },
                                "&:active": {
                                    transform: "translate(0, -50%)",
                                }
                            }} 
                            variant="subtle">{Data.DescName}</Button>
                    </Title>
                    <Modal
                        opened={Open}
                        onClose={() => setOpened(false)}
                        title={Data.DescName}
                    >
                        <Container fluid>
                            <TextInput
                                sx={{marginBottom: "20px", ".mantine-TextInput-input:focus":{ borderColor: "#2D5BFF"}}}
                                label="Nazwa"
                                placeholder="Nazwa"
                                variant="filled"
                                radius="md"
                                value={Data.Name}
                                readOnly
                            />
                            <TextInput
                                sx={{marginBottom: "20px", ".mantine-TextInput-input:focus":{ borderColor: "#2D5BFF"}}}
                                label="Nazwa opisowa"
                                placeholder="Nazwa opisowa"
                                variant="filled"
                                radius="md"
                                value={Data.DescName}
                                readOnly
                            />
                            <Title order={6} sx={{fontWeight: "500"}}>
                                Dane konatkowe
                            </Title>
                            <ScrollArea sx={{height: "170px", marginTop: "20px", paddingBottom: "10px"}}>
                                <Stack zIndex={2}>
                                    {
                                        (
                                            ()=> {
                                                const tab = []
                                                console.log("lenth", Data.Contacs)
                                                if (Data.Contacs !== undefined) for(let i = 0; i < Data.Contacs.length; i++)
                                                    tab.push(
                                                        <Group zIndex={1}>
                                                        <Select
                                                            sx={{width: "150px"}}
                                                            placeholder="Typ"
                                                            variant="filled"
                                                            radius="md"
                                                            zIndex={10}
                                                            defaultValue={Data.Contacs[i].value}
                                                            readOnly
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
                                                            value={Data.Contacs[i].content}
                                                            readOnly
                                                        />                                                                        
                                                    </Group>
                                                    )
                                                return tab
                                            }
                                        )()
                                    }
                                </Stack>
                            </ScrollArea>
                        </Container>
                    </Modal>
                    <Container
                        size={"xl"}
                        dangerouslySetInnerHTML={{__html: Data.description}}
                    >

                    </Container>
                    <Timeline 
                        sx={{
                            marginTop: "50px",
                            ".mantine-Timeline-itemBullet[data-active]": {
                                backgroundColor: "#2D5BFF !important",
                                borderColor: "#2D5BFF",
                            },
                            ".mantine-Timeline-item[data-line-active]::before": {
                                borderLeftColor: "#2D5BFF"
                            },
                            ".mantine-Timeline-itemBullet": {
                                backgroundColor: "#7d94e3 !important",
                                borderColor: "#7d94e3",
                                color: "white !important"
                            },
                            ".mantine-Timeline-item::before": {
                                borderLeftColor: "rgba(0, 45, 208, .25)"
                            }
                        }}
                        active={States.length}
                        bulletSize={24}
                        lineWidth={5}
                    >

                        <Timeline.Item bullet={<IconGitBranch size={12} />} lineVariant={ States.length === 0 ? "dotted" : "solid"} title={<Title sx={{color: "#2D5BFF"}} order={5}>Dodanie wydarzenie</Title>}>
                            {Data.ETA != null &&<Text color="dimmed" size="sm">Szacowana data zakończenia <span style={{color: "#2D5BFF"}}>2020-10-20</span></Text>}
                            {
                                TimeWidget(Data.created)
                            }
                        </Timeline.Item>

                        {
                            (
                                () => {
                                    const tab = []
                                    for(let i = 0; i < States.length; i++)  {
                                        if (States[i].Type == 0) tab.push(
                                            <Timeline.Item bullet={<IconGitBranch size={12} />} lineVariant={ i == States.length - 1 ? "dotted" : "solid"} title={<Title order={5}>Aktualizacja statusu - <span style={{color: "#2D5BFF"}}>{States[i].Title}</span></Title>}>
                                                <Text color="dimmed" size="sm">{States[i].EComment}</Text>
                                                {
                                                    TimeWidget(States[i].Added)
                                                }
                                            </Timeline.Item>
                                        ) 
                                        else tab.push(
                                            <Timeline.Item bullet={<IconGitBranch size={12} />} ineVariant={ i == States.length - 1 ? "dotted" : "solid"} title={<Title order={5}>Zakończenie - <span style={{color: "#2D5BFF"}}>{States[i].Title}</span></Title>}>
                                                <Text color="dimmed" size="sm">{States[i].EComment}</Text>
                                                {
                                                    TimeWidget(States[i].Added)
                                                }
                                            </Timeline.Item>
                                        )
                                    }
                                    if (Data.State == 1 || (Data.State < 3 && Data.ETA == null) ) {
                                        tab.push(
                                            <Timeline.Item bullet={<IconGitBranch size={12} />} title={<Title order={5}><span style={{color: "#2D5BFF"}}>Oczekiwanie nowe zdarzenia</span></Title>}>
                                                {/* <Text color="dimmed" size="sm">e</Text> */}
                                                {/* <Text size="xs" mt={4}>20 sekund temu</Text> */}
                                            </Timeline.Item>
                                        )
                                    } else if (Data.State == 2 && Data.ETA != null) {
                                        tab.push(
                                            <Timeline.Item bullet={<IconGitBranch size={12} />} title={<Title order={5}><span style={{color: "#2D5BFF"}}>Opoźnione zakończenie!</span></Title>}>
                                                {/* <Text color="dimmed" size="sm">e</Text> */}
                                                {/* <Text size="xs" mt={4}>20 sekund temu</Text> */}
                                            </Timeline.Item>
                                        )
                                    }

                                        // if (i == 0)tab.push(
                                        //     <Timeline.Item bullet={<IconGitBranch size={12} />} title={<Title sx={{color: "#2D5BFF"}} order={5}>Dodanie wydarzenie</Title>}>
                                        //         <Text color="dimmed" size="sm">Szacowana data zakończenia <span style={{color: "#2D5BFF"}}>2020-10-20</span></Text>
                                        //         <Text size="xs" mt={4}>2 godziny temu</Text>
                                        //     </Timeline.Item>
                                        //     )
                                        // else if (i < 3) tab.push(
                                        //     <Timeline.Item bullet={<IconGitBranch size={12} />} title={<Title order={5}>Aktualizacja statusu - <span style={{color: "#2D5BFF"}}>Wizyta u klienta</span></Title>}>
                                        //         <Text color="dimmed" size="sm">Naprawa # {i}</Text>
                                        //         <Text size="xs" mt={4}>2 godziny temu</Text>
                                        //     </Timeline.Item>
                                        // ) 
                                        // else tab.push(
                                        //     <Timeline.Item bullet={<IconGitBranch size={12} />} lineVariant="dotted" title={<Title order={5}>Aktualizacja statusu - <span style={{color: "#2D5BFF"}}>Wizyta u klienta</span></Title>}>
                                        //         <Text color="dimmed" size="sm">Naprawa # {i}</Text>
                                        //         <Text size="xs" mt={4}>2 godziny temu</Text>
                                        //     </Timeline.Item>
                                        //     )

                                    return tab
                                }
                            )()
                        }
{/* 
                            <Timeline.Item bullet={<IconGitBranch size={12} />} title={<Title order={5}>Zakończenie - <span style={{color: "#2D5BFF"}}>Sprawa roziwązana</span></Title>}>
                                <Text color="dimmed" size="sm">Naprawa przebiegła pomyślnie</Text>
                                <Text size="xs" mt={4}>20 sekund temu</Text>
                            </Timeline.Item> */}

                    </Timeline>
                    <Modal
                        opened={OpenEdit}
                        onClose={() => setOpenEdit(false)}
                        title={"Nowy status"}
                    >
                        <Container fluid>
                            {
                                Not != "" && <Alert sx={{marginBottom: "20px"}} onClose={() => SetNot(" ")} icon={<IconX size={18} />} color="red">
                                {
                                    Not
                                }
                                </Alert>
                            }
                            <form
                                onSubmit={Addfrom.onSubmit((values) => AddNewComment(values))}
                            >
                                <TextInput
                                    sx={{marginBottom: "20px", ".mantine-TextInput-input:focus":{ borderColor: "#2D5BFF"}}}
                                    label="Tytuł"
                                    placeholder="Tytuł"
                                    variant="filled"
                                    radius="md"
                                    {...Addfrom.getInputProps('Title')}
                                />

                                <Select
                                    label="Rodzaj"
                                    placeholder="Rodzaj"
                                    variant="filled"
                                    radius="md"
                                    zIndex={10}
                                    defaultValue={0}
                                    sx={{marginBottom: "20px", ".mantine-Input-input:focus": { borderColor: "#2D5BFF"}}}
                                    data={[
                                        { value: 0, label: 'Aktualizacja' },
                                        { value: 1, label: 'Zakończenie'}
                                    ]}
                                    {...Addfrom.getInputProps('Type')}
                                />

                                <Textarea
                                    sx={{marginBottom: "20px", ".mantine-Textarea-input:focus":{ borderColor: "#2D5BFF"}}}
                                    label="Komentarz"
                                    placeholder="Komentarz"
                                    variant="filled"
                                    radius="md"
                                    maxRows={4}
                                    {...Addfrom.getInputProps('EComment')}
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
                                >

                                    Dodaj
                                </Button>
                            </form>
                        </Container>
                    </Modal>
                    <Group
                        sx={{
                            float: "right",
                            position: "absolute",
                            bottom: "30px",
                            right: "40px"
                        }}
                    >
                        <Button
                            onClick={() => RemoveEvent()}
                            variant="subtle"
                            sx={{
                                color: "#2D5BFF",                                
                                "&:hover": {
                                    backgroundColor: "rgba(0, 45, 208, .1)"
                                }
                            }}
                        >usuń wydarzenie</Button>
                        {Data.State != 3 && <Button
                            onClick={() => setOpenEdit(true)}
                            sx={{
                                backgroundColor: "rgba(0, 45, 208, .1)",
                                color: "#2D5BFF",
                                "&:hover": {
                                    backgroundColor: "rgba(0, 45, 208, .25)"
                                }
                            }}
                        >Dodaj nowy status</Button>}
                    </Group>
                </Container>
            </Card>
        </Stack>
    )
}

export default ShovEventsView;