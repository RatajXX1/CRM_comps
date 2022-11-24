import { Card, Container, Flex, Group, Stack, Table, Title } from "@mantine/core";
import Chart from "react-apexcharts";
import "../../style/dashboard.scss"

const ChartCard = () => {
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
                    direction="row"
                    wrap="nowrap"
                >
                    <div
                        style={{
                            width: "30%"
                        }}
                    >   
                        <Title sx={{color: "#181818" , fontWeight: "400", marginTop: "20px"}} order={4}>Ilość</Title>
                        <Title sx={{color: "#181818", margin: "10px 10px 10px 0"}} order={3}>10000</Title>
                        <Title sx={{color: "#181818", fontWeight: "400", marginBottom: "-5px"}} order={4}>Status</Title>
                        <Chart
                            options={{
                                chart: {
                                    toolbar: {
                                        show: false
                                    }
                                },
                                legend: {
                                    formatter: function(label, opts) {
                                        return opts.w.globals.series[opts.seriesIndex] + "% " + label 
                                    },
                                    fontSize: "14px"
                                },
                                labels: ['Zakończone', 'Opoźnione', 'Rozpoczetę', 'W trakcie'],
                                fill: {
                                    colors: ["#96ADFF", "#6284FD", "#2D5BFF"]
                                },
                                colors: ["#96ADFF", "#6284FD", "#2D5BFF"],
                                dataLabels: {
                                    enabled: false
                                }
                            }}
                            
                            series={[
                                44, 55, 41, 17
                            ]}
                            type="donut"
                            width="100%"
                        />
                    </div>
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
                                    categories: ["21-10-2022","22-10-2022","23-10-2022", "24-10-2022", "25-10-2022"]
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
                                name: "series-1",
                                data: [30, 40, 45, 50, 76]
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
    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
            <Container fluid>
                <Card.Section>
                    <Title sx={{color: "#181818"}} order={2}>
                        Najnowsze wydarzenia
                    </Title>
                </Card.Section>
                <Table sx={{marginTop: "20px", tableLayout: "auto"}} >
                    <colgroup>
                        <col width={"6%"}></col>
                        <col style={{width: "30%"}}></col>
                        <col style={{width: "auto"}}></col>
                        <col style={{textAlign: "right"}} width={"15%"}></col>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>
                                Status
                            </th>
                            <th>
                                Klient
                            </th>
                            <th>
                                Tytuł
                            </th>
                            <th style={{textAlign: "right"}}>
                                Data rozpoczecia
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (
                                () => {
                                    const tab = []
                                    for(let i = 0; i < 10; i++) {
                                        tab.push(
                                            <tr className={"EventsTabRow " + (() => {if (i%2 == 0) return "EventsTabRow_Ended";else if (i%3 == 0) return "EventsTabRow_Late"})()}>
                                                <td>
                                                    <a>
                                                        W trakcie
                                                    </a>
                                                </td>
                                                <td>
                                                    <a>
                                                        MDR
                                                    </a>
                                                </td>
                                                <td>
                                                    <a>
                                                        Komputer sie zepsułKomputer sie zepsułKomputer sie zepsułKomputer sie zepsułKomputer sie zepsułKomputer sie zepsułKomputer sie zepsułKomputer sie zepsuł
                                                    </a>
                                                </td>
                                                <td style={{textAlign: "right"}}>
                                                    <a>
                                                        2020-11-25 10:00:00
                                                    </a>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    return tab
                                }
                            )()
                        }
                    </tbody>
                </Table>
            </Container>
        </Card>
    )
}

function DashboardView() {
    return (
        <Stack
            sx={{
                width: "98%"
            }}
        >
            {
                ChartCard()
            }
            {
                ChartNews()
            }
        </Stack>
    )
}

export default DashboardView;