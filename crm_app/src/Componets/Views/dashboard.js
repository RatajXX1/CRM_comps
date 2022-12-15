import { Box, Card, Container, Flex, Group, Stack, Table, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import "../../style/dashboard.scss"
import Server from "../../Utilis/Server";
import TableView from "../CRM_table";

const MonthNamesByLenght = (a) => {
    let tab = []
    let Names = [
        "Styczeń",
        "Luty",
        "Marzec",
        "Kwiecień",
        "Maj",
        "Czerwiec",
        "Lipiec",
        "Śierpień",
        "Wrzesień",
        "Październik",
        "Listpad",
        "Grudzień",
    ]
    for(let i = 11; i >= 0 + (12 - a); i--) tab.push(Names[i])
    return tab.reverse()
}

const ChartCard = (Counts, Stats) => {
    const [Mobile, SetMobile] = useState(false)


    setInterval(() => {if (window.innerWidth < 900) {
        if (!Mobile) SetMobile(true)
    }
    else {
        if (Mobile) SetMobile(false)
    }}, 500)
    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
            <Container fluid>
                <Card.Section>
                    <Title sx={{color: "#181818"}} order={2}>Wydarzenia</Title>
                </Card.Section>
                <Flex
                    gap="xl"
                    justify="flex-start"
                    align="center"
                    direction={Mobile ? "column" :"row"}
                    wrap="nowrap"
                >
                    <Box
                        style={{
                            width: "500px",
                            marginTop: '20px'
                        }}
                        // width={{ sm: 100, lg: 100}} 
                    >   
                        <Title sx={{color: "#181818" , fontWeight: "400", marginTop: "0"}} order={4}>Ilość</Title>
                        <Title sx={{color: "#181818", margin: "10px 10px 10px 0"}} order={3}>{Counts.FullCount}</Title>
                        {!Mobile && <Title sx={{color: "#181818", fontWeight: "400", marginBottom: "-5px"}} order={4}>Status</Title>}
                        {!Mobile && <Chart
                            options={{
                                chart: {
                                    toolbar: {
                                        show: false
                                    }
                                },
                                legend: {
                                    formatter: function(label, opts) {
                                        return "  "+opts.w.globals.series[opts.seriesIndex] + "% " + label
                                    },
                                    fontSize: "13px"
                                },
                                labels: ['Zakończone', 'Opoźnione', 'W trakcie'],
                                fill: {
                                    colors: ["#96ADFF", "#6284FD", "#2D5BFF"]
                                },
                                colors: ["#96ADFF", "#6284FD", "#2D5BFF"],
                                dataLabels: {
                                    enabled: false
                                }
                            }}
                            
                            series={[
                                Math.floor((parseInt(Counts.End) / parseInt(Counts.FullCount)) * 100), Math.floor((parseInt(Counts.Late) / parseInt(Counts.FullCount)) * 100), Math.floor((parseInt(Counts.Work) / parseInt(Counts.FullCount)) * 100)
                            ]}
                            type="donut"
                            width="100%"
                            height={"100%"}
                        />}
                    </Box>
                    <div
                        style={{
                            width: "100%",
                            height: "300px"
                        }}
                    >
                        <Chart
                            options={{
                                chart: {
                                    id: "basic-bar",
                                    toolbar: {
                                        show: false
                                    },
                                    zoom: false,
                                    dropShadow: {
                                        enabled: true,
                                        top: 0,
                                        left: 2,
                                        blur: 4,
                                        opacity: 0.75,
                                        color: "#6284FD"
                                    },
                                },
                                colors: ["#6284FD"],
                                xaxis: {
                                    axisBorder: {
                                        show: false
                                    },
                                    crosshairs: {
                                        show: false
                                    },
                                    categories: MonthNamesByLenght(Stats.length)
                                },
                                fill: {
                                    colors: ['#FFFFFF']
                                },
                                stroke: {
                                    width: 6
                                },
                                markers: {
                                    size: 8,
                                    colors: undefined,
                                    strokeColors: '#fff',
                                    strokeWidth: 2,
                                    strokeOpacity: 0.9,
                                    strokeDashArray: 0,
                                    fillOpacity: 1,
                                    discrete: [],
                                    shape: "circle",
                                    radius: 2,
                                    offsetX: 0,
                                    offsetY: 0,
                                    onClick: undefined,
                                    onDblClick: undefined,
                                    showNullDataPoints: true,
                                    hover: {
                                      size: undefined,
                                      sizeOffset: 3
                                    }
                                }
                            }}
                            series={[
                                {
                                name: "",
                                data: Stats.length > 0 ? Stats.reverse() : Stats
                                }
                            ]}
                            type="line"
                            width="100%"
                            height={"100%"}
                        />
                    </div>
                </Flex>
            </Container>
        </Card>
    )
}

const ChartNews = () => {
    const navi = useNavigate()
    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
            <Container fluid>
                <Card.Section>
                    <Title sx={{color: "#181818"}} order={2}>
                        Najnowsze wydarzenia
                    </Title>
                </Card.Section>
                <TableView
                    headers={
                        [
                            "Status",
                            "Klient",
                            "Tytuł",
                            "Data rozpoczecia"
                        ]
                    }

                    sizes={
                        [
                            {width: "10%"},
                            {width: "30%"},
                            {width: "auto"},
                            {width: "15%", textAlign: "right"},
                        ]
                    }

                    PaginationFunc={
                        (page) => `api/events/latest.php?page=${page}`
                    }

                    ResponseFunc={
                        resp => resp.Users
                    }

                    render={
                        data => <tr onClick={() => {window.localStorage.setItem("EID", data.ID);navi("/show/events")}} className={"EventsTabRow"}>
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
                                    <td style={{textAlign: "right"}}>
                                        <a>
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
    )
}

function DashboardView() {
    const [Load, SetLoad] = useState(false)
    const [Data, SetData] = useState({})
    const [Stats, SetStats] = useState({})

    useEffect(() => {
        if (!Load) 
            Server.ApiInstance()
                .get("api/dash/index.php")
                .then(
                    resp => {
                        if (resp.data.CODE == "OK") {
                            SetData(resp.data.Count)
                            SetStats(resp.data.States)
                            SetLoad(true)
                        }

                    }
                )

        // console.log(Stats)
    })



    return (
        <Stack
            sx={{
                width: "98%"
            }}
        >
            {
                ChartCard(Data,(Stats !== undefined && Stats !== null) ? Stats:[])
            }
            {
                ChartNews()
            }
        </Stack>
    )
}

export default DashboardView;