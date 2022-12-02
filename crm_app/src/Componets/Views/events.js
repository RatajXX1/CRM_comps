import { Button, Card, Container, Modal, ScrollArea, Select, Stack, TextInput, Title } from "@mantine/core";
import { DateRangePicker } from "@mantine/dates";
import 'dayjs/locale/pl';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableView from "../CRM_table";
import {IconMan,IconSearch,IconUserCircle,IconAdjustments} from "@tabler/icons"

function EventsView() {
    const [OpenFilters, SetOpenFiltres] = useState(false)
    const [Open, setOpened] = useState(false)
    const history = useNavigate()

    return (
        <Stack
            sx={{
                width: "98%"
            }}
        >
            <Card sx={{height: "80vh"}} shadow="sm" p="lg" radius="md" withBorder>
                <Modal
                    opened={OpenFilters}
                    onClose={() => SetOpenFiltres(false)}
                    title={"Filtry"}
                >
                    <Container fluid>
                        <form>
                            <Button
                                onClick={() => setOpened(true)}
                                leftIcon={<IconMan/>}
                                sx={{
                                    position: "relative",
                                    color: "#2D5BFF",
                                    width: "100%",
                                    "&:hover": {
                                        backgroundColor: "rgba(0, 45, 208, .25)"
                                    },
                                    padding: "0 5px 0 0",
                                    lineHeight: "35px",
                                    height: "35px",
                                    marginBottom: "10px",
                                    // top: "55%",
                                    // transform: "translate(0, -50%)",
                                    "span": {
                                        margin: "0"
                                    },
                                    "&:active": {
                                        // transform: "translate(0, -50%)",
                                    }
                                }}
                                variant="outline"
                            >Wybierz klienta</Button>
                            <TextInput
                                sx={{marginBottom: "20px", ".mantine-TextInput-input:focus":{ borderColor: "#2D5BFF"}}}
                                label="Tytuł"
                                placeholder="Tytuł"
                                variant="filled"
                                radius="md"
                                
                            />
                            <Select
                                label="Status"
                                variant="filled"
                                radius="md"
                                data={[
                                    { value: 0, label: 'W trakcie' },
                                    { value: 1, label: 'Zakończona' },
                                    { value: 2, label: 'Opóźniona' },
                                ]}
                            />
                            <DateRangePicker
                                variant="filled"
                                radius="md"
                                locale="pl"
                                sx={{
                                    width: "100%",
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
                                placeholder="MM/DD/YYYY - MM/DD/YYYY" 
                                label="Czas dodania" 
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
                            <Button 
                                rightIcon={<IconAdjustments/>}
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
                            >Pokaż</Button>
                        </form>
                        <Modal
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
                        </Modal>
                    </Container>
                </Modal>
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
                            onClick={() => SetOpenFiltres(true)}
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
                            onClick={() => history("/add/events")}
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

                        PaginationFunc={
                            (page) => `/api/events/index.php?page=${page}`
                        }
    
                        ResponseFunc={
                            resp => resp.Users
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
                            (data) => <tr className="EventsTabRow" onClick={() => history("/show/events")}>
                                <td>
                                    <a className={(() => {if (data.Type == 1) return "EventsTabRow_state_work"; else if (data.Type == 2) return "EventsTabRow_state_end"; else if (data.Type == 3) return "EventsTabRow_state_succes"})()}>
                                        {
                                            (
                                                () => {
                                                    if (data.Type == 1) return "W trakcie"
                                                    else if (data.Type == 2) return "Opóznione"
                                                    else if (data.Type == 3) return "Zakończne"
                                                }
                                            )() 
                                        }
                                        </a>
                                </td>
                                <td>
                                    <a>
                                        {
                                            data.DescName
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
                                        {

                                            data.eta == null ? "--" : data.eta
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

export default EventsView;