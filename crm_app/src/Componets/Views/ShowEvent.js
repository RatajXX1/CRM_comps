import { Box, Button, Card, Container, Group, Highlight, Modal, ScrollArea, Select, Stack, TextInput, Timeline, Title,Text } from "@mantine/core";
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
import { IconGitBranch, IconGitPullRequest, IconGitCommit, IconMessageDots } from '@tabler/icons';


function ShovEventsView() {
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
            <Card sx={{minHeight: "80vh"}} shadow="sm" p="lg" radius="md" withBorder>
                <Container fluid sx={{height: "100%"}}>
                    <Title 
                        sx={{
                            position:"relative",
                            lineHeight: "35px",
                            marginBottom: "20px"
                        }}
                        order={2}
                    >
                        Komputer sie zepusł - 
                        <Button
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
                    <Container
                        size={"xl"}
                    >
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu
                    </Container>
                    <Timeline 
                        sx={{
                            marginTop: "50px",
                            ".mantine-Timeline-itemBullet[data-active]": {
                                backgroundColor: "rgba(0, 45, 208, .25)"
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
                                    for(let i = 0; i < 5; i++) 
                                        tab.push(
                                            <Timeline.Item bullet={<IconGitBranch size={12} />} title="New branch">
                                                <Text color="dimmed" size="sm">You&apos;ve created new branch <Text variant="link" component="span" inherit>fix-notifications</Text> from master</Text>
                                                <Text size="xs" mt={4}>2 hours ago</Text>
                                            </Timeline.Item>
                                        )
                                    return tab
                                }
                            )()
                        }

                        {/* <Timeline.Item title="Pull request" bullet={<IconGitPullRequest size={12} />} lineVariant="dashed">
                            <Text color="dimmed" size="sm">You&apos;ve submitted a pull request<Text variant="link" component="span" inherit>Fix incorrect notification message (#187)</Text></Text>
                            <Text size="xs" mt={4}>34 minutes ago</Text>
                        </Timeline.Item> */}


                    </Timeline>

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