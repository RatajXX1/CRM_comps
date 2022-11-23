import { Card, Container, Flex, Group, Stack, Title } from "@mantine/core";
import Chart from "react-apexcharts";

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


function DashboardView() {
    return (
        <Stack>
            {
                ChartCard()
            }
        </Stack>
    )
}

export default DashboardView;