import { Button, Card, Container, Modal, ScrollArea, Select, Stack, TextInput, Title } from "@mantine/core";
import { DateRangePicker } from "@mantine/dates";
import 'dayjs/locale/pl';
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableView from "../CRM_table";
import {IconMan,IconSearch,IconUserCircle,IconAdjustments} from "@tabler/icons"
import { useForm } from "@mantine/form";
import SelectClient from "../SelectClient";

function EventsView() {
    const [OpenFilters, SetOpenFiltres] = useState(false)
    const [Open, setOpened] = useState(false)
    const [Filtes, SetFiltres] = useState(false)
    const [ClientID, SetClientID] = useState(0)
    const [ClientName, SetClientName] = useState("")
    const [SerachQuery, SetSearchQuery] = useState("")
    const history = useNavigate()
    const tab = useRef(null)

    const FilterForm = useForm(
        {
            initialValues: {
                title: "",
                State: null,
                Client: 0,
                from: ""
            }
        }
    )

    const SetUpFiltes = (values) => {
        let Temp = ""

        if (values.title != "" && values.title.replaceAll(" ", "") != "") {
            Temp += "&query=" + encodeURIComponent(values.title)
        }

        if (values.State != null ) {
            Temp += "&state=" + values.State
        }

        if (ClientID != null && ClientID != 0) {
            Temp += "&client=" + ClientID
        }

        if (values.from != "" && values.from != null) {
            // values.ETA = values.ETA.toISOString().split("T")[0];
            Temp += `&from=${values.from[0].toISOString().split("T")[0]}&to=${values.from[1].toISOString().split("T")[0]}`
        }

        SetSearchQuery(Temp)
        tab.current.refresh()
    }

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
                        <form
                            onSubmit={FilterForm.onSubmit(values => SetUpFiltes(values))}
                        >
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
                            >{ClientName == "" ? "Wybierz klienta" : ClientName}</Button>
                            <TextInput
                                sx={{marginBottom: "20px", ".mantine-TextInput-input:focus":{ borderColor: "#2D5BFF"}}}
                                label="Tytuł"
                                placeholder="Tytuł"
                                variant="filled"
                                radius="md"
                                {...FilterForm.getInputProps('title')}
                            />
                            <Select
                                label="Status"
                                variant="filled"
                                radius="md"
                                data={[
                                    { value: 1, label: 'W trakcie' },
                                    { value: 2, label: 'Zakończona' },
                                    { value: 3, label: 'Opóźniona' },
                                ]}
                                {...FilterForm.getInputProps('State')}
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
                                {...FilterForm.getInputProps('from')}
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
                            <Button 
                                onClick={() => {
                                    FilterForm.reset()
                                    SetClientName("")
                                    SetClientID(0)
                                    SetSearchQuery("")
                                    tab.current.refresh()
                                }}
                                variant="subtle"
                                sx={{
                                    color: "#2D5BFF",
                                    float: "right",
                                    marginTop: "30px",
                                    // backgroundColor: "rgba(0, 45, 208, .1)",
                                    "&:hover": {
                                        backgroundColor: "rgba(0, 45, 208, .25)"
                                    },
                                }}
                            >Wyczyść</Button>
                        </form>
                        <SelectClient
                            opened={Open}
                            onClose={() => setOpened(false)}
                            title={"Wybierz klienta"}
                            onSelect={
                                (data) => {
                                    SetClientID(parseInt(data.ID))
                                    SetClientName(data.Namop)
                                    setOpened(false)
                                }                            
                            }
                        />

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
                        ref={tab}
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
                            (page) => `/api/events/index.php?page=${page}` + SerachQuery
                        }
    
                        ResponseFunc={
                            resp => resp.Users
                        }
                        
                        sizes={
                            [
                                {width: "20%"},
                                {width: "15%"},
                                {width: "auto"},
                                {width: "15%"},
                                {width: "15%", textAlign: "right"},
                            ]
                        }

                        render={
                            (data) => <tr className="EventsTabRow" onClick={() => history("/show/events?ID=" + data.ID)}>
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