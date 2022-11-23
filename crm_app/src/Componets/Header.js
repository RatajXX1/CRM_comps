import { Autocomplete, Button, Container, Group, Header } from "@mantine/core";
import {IconUserCircle,IconChevronDown,IconSearch} from "@tabler/icons"

function HeaderView() {
    return (
        <Header
            height={64}
            sx={{
                boxShadow: "0px 0.3px 0.9px rgba(0, 0, 0, 0.07), 0px 1.6px 3.6px rgba(0, 0, 0, 0.11);",
                zIndex: "2",
                border: "none",
                position: "relative"
            }}
        >
            <Container fluid sx={{position: "relative", height: '100%'}}>
                <Group
                    sx={{
                        float: "left",
                        position: "relative",
                        height: "95%",
                        top: "50%",
                        transform: "translate(0,-50%)",
                        left: "300px"
                    }}
                >
                    <Autocomplete
                        placeholder="Szukaj.."
                        data={["Komputer padł", "Komputer padł", "Komputer padł"]}
                        sx={{
                            zIndex:"3",
                            width: "300px",
                            ".mantine-Autocomplete-input": {
                                backgroundColor: "#F1F3F8 !important",
                                border: "none"
                            }
                            
                        }}
                        zIndex={9}
                        icon={<IconSearch/>}
                    >

                    </Autocomplete>
                </Group>
                <Group
                    sx={{
                        float: "right",
                        position: "relative",
                        height: "95%",
                        top: "50%",
                        transform: "translate(0,-50%)",
                    }}
                >
                    <Button
                        variant="subtle"
                        leftIcon={<IconUserCircle/>}
                        rightIcon={<IconChevronDown/>}
                        sx={{
                            color: "rgba(0, 45, 208)",
                            "&:hover": {
                                backgroundColor: "rgba(0, 45, 208, .1)"
                            }
                        }}
                    >
                        root
                    </Button>
                </Group>
            </Container>
        </Header>
    )
}

export default HeaderView;