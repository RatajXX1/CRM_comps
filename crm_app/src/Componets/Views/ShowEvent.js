import { Box, Button, Card, Container, Group, Highlight, Modal, ScrollArea, Select, Stack, TextInput, Timeline, Title,Text, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { RichTextEditor } from "@mantine/tiptap";
import Link from "@tiptap/extension-link";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {IconArrowLeft, IconChevronRight,IconMan,IconSearch,IconPlus} from "@tabler/icons"
import { DatePicker } from '@mantine/dates';
import 'dayjs/locale/pl';
import { useState } from "react";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { useNavigate } from "react-router-dom";
import { IconGitBranch, IconGitPullRequest, IconGitCommit, IconMessageDots } from '@tabler/icons';


function ShovEventsView() {
    const [Open, setOpened] = useState(false)
    const [OpenEdit, setOpenEdit] = useState(false)
    const navi = useNavigate()

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
                        >W trakcie</span>
                        Komputer sie zepusł - 
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
                            variant="subtle">MDR</Button>
                    </Title>
                    <Modal
                        opened={Open}
                        onClose={() => setOpened(false)}
                        title={"MDR"}
                    >
                        <Container fluid>
                            <TextInput
                                sx={{marginBottom: "20px", ".mantine-TextInput-input:focus":{ borderColor: "#2D5BFF"}}}
                                label="Nazwa"
                                placeholder="Nazwa"
                                variant="filled"
                                radius="md"
                                value={"MDR corp"}
                                readOnly
                            />
                            <TextInput
                                sx={{marginBottom: "20px", ".mantine-TextInput-input:focus":{ borderColor: "#2D5BFF"}}}
                                label="Nazwa opisowa"
                                placeholder="Nazwa opisowa"
                                variant="filled"
                                radius="md"
                                value={"MDR fajna firma"}
                                readOnly
                            />
                            <Title order={6} sx={{fontWeight: "500"}}>
                                Dane konatkowe
                            </Title>
                            <ScrollArea sx={{maxHeight: "200px", marginTop: "20px", paddingBottom: "10px"}}>
                                <Stack zIndex={2}>
                                    {
                                        (
                                            ()=> {
                                                const tab =[]
                                                for(let i = 0; i < 2; i++)
                                                    tab.push(
                                                        <Group zIndex={1}>
                                                        <Select
                                                            sx={{width: "150px"}}
                                                            placeholder="Typ"
                                                            variant="filled"
                                                            radius="md"
                                                            zIndex={10}
                                                            defaultValue={i}
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
                                                            value={"12312321321"}
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
                    >
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu
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
                        active={1}
                        bulletSize={24}
                        lineWidth={5}
                    >


                        {
                            (
                                () => {
                                    const tab = []
                                    for(let i = 0; i < 4; i++) 
                                        if (i == 0)tab.push(
                                            <Timeline.Item bullet={<IconGitBranch size={12} />} title={<Title sx={{color: "#2D5BFF"}} order={5}>Dodanie wydarzenie</Title>}>
                                                <Text color="dimmed" size="sm">Szacowana data zakończenia <span style={{color: "#2D5BFF"}}>2020-10-20</span></Text>
                                                <Text size="xs" mt={4}>2 godziny temu</Text>
                                            </Timeline.Item>
                                            )
                                        else if (i < 3) tab.push(
                                            <Timeline.Item bullet={<IconGitBranch size={12} />} title={<Title order={5}>Aktualizacja statusu - <span style={{color: "#2D5BFF"}}>Wizyta u klienta</span></Title>}>
                                                <Text color="dimmed" size="sm">Naprawa # {i}</Text>
                                                <Text size="xs" mt={4}>2 godziny temu</Text>
                                            </Timeline.Item>
                                        ) 
                                        else tab.push(
                                            <Timeline.Item bullet={<IconGitBranch size={12} />} lineVariant="dotted" title={<Title order={5}>Aktualizacja statusu - <span style={{color: "#2D5BFF"}}>Wizyta u klienta</span></Title>}>
                                                <Text color="dimmed" size="sm">Naprawa # {i}</Text>
                                                <Text size="xs" mt={4}>2 godziny temu</Text>
                                            </Timeline.Item>
                                            )
                                    return tab
                                }
                            )()
                        }

                            <Timeline.Item bullet={<IconGitBranch size={12} />} title={<Title order={5}>Zakończenie - <span style={{color: "#2D5BFF"}}>Sprawa roziwązana</span></Title>}>
                                <Text color="dimmed" size="sm">Naprawa przebiegła pomyślnie</Text>
                                <Text size="xs" mt={4}>20 sekund temu</Text>
                            </Timeline.Item>

                    </Timeline>
                    <Modal
                        opened={OpenEdit}
                        onClose={() => setOpenEdit(false)}
                        title={"Nowy status"}
                    >
                        <Container fluid>
                            <form>
                                <TextInput
                                    sx={{marginBottom: "20px", ".mantine-TextInput-input:focus":{ borderColor: "#2D5BFF"}}}
                                    label="Tytuł"
                                    placeholder="Tytuł"
                                    variant="filled"
                                    radius="md"
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
                                />

                                <Textarea
                                    sx={{marginBottom: "20px", ".mantine-Textarea-input:focus":{ borderColor: "#2D5BFF"}}}
                                    label="Komentarz"
                                    placeholder="Komentarz"
                                    variant="filled"
                                    radius="md"
                                    maxRows={4}
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
                            variant="subtle"
                            sx={{
                                color: "#2D5BFF",                                
                                "&:hover": {
                                    backgroundColor: "rgba(0, 45, 208, .1)"
                                }
                            }}
                        >usuń wydarzenie</Button>
                        <Button
                            onClick={() => setOpenEdit(true)}
                            sx={{
                                backgroundColor: "rgba(0, 45, 208, .1)",
                                color: "#2D5BFF",
                                "&:hover": {
                                    backgroundColor: "rgba(0, 45, 208, .25)"
                                }
                            }}
                        >Dodaj nowy status</Button>
                    </Group>
                </Container>
            </Card>
        </Stack>
    )
}

export default ShovEventsView;