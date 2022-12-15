import { Autocomplete, Burger, Button, Container, Divider, Group, Header, Menu, Text } from "@mantine/core";
import {IconUserCircle,IconChevronDown,IconSearch, IconLogout} from "@tabler/icons"
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Server from "../Utilis/Server";

function HeaderView(props) {
    const navi = useNavigate()
    const [Query, SerQuery] = useState("")
    const [Data, setData] = useState([])
    const SearchRef = useRef(null)
    const [Mobile, SetMobile] = useState(false)

    setInterval(() => {if (window.innerWidth < 900) {
        if (!Mobile) SetMobile(true)
    }
    else {
        if (Mobile) SetMobile(false)
    }}, 500)

    useEffect(
        () => {
            if (Query !== undefined && Query.length >= 3) setTimeout(()=> {
                if (Query.length >= 3) {
                    Server.ApiInstance()
                        .get("api/search/index.php?query=" + encodeURIComponent(Query))
                        .then(
                            resp => {
                                if (resp.data.CODE === "OK") {
                                    setData(resp.data.Users)
                                }
                            }
                        )
                }
            }, 500)
        }
    )

    const LogOut = () => {
        Server.ApiInstance().get("api/auth/logout.php")
            .then(() => navi("/"))
    }
    // Type == 1 ? () => {alert("test");window.localStorage.setItem("ClientData", JSON.stringify({ ID,tittle,Type,...others}));navi("/show/client")} : () => navi("/show/events?ID="+ID) 
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
                {Mobile && <Group
                    sx={{
                        float: "left",
                        position: "relative",
                        height: "95%",
                        top: "50%",
                        transform: "translate(0,-50%)",
                    }}
                > 
                    <Burger
                        opened={props.Opened}
                        onClick={() => props.onClose()}
                        size="sm"
                        // color={theme.colors.gray[6]}
                        mr="xl"
                    />
                </Group>}
                <Autocomplete
                        placeholder="Szukaj.."
                        data={Data}
                        ref={SearchRef}
                        itemComponent={
                            ({ ID,tittle,Type,...others}) => {
                                others.onMouseDown = Type == 1 ? () => {SearchRef.current.blur();window.localStorage.setItem("ClientData", JSON.stringify({ ID,tittle,Type,...others}));navi("/show/client")} : () => {SearchRef.current.blur();navi("/show/events?ID="+ID)}
                               
                                // console.log(others)
                                return <div onClick={() => alert(ID)} {...others} >
                                    <Group noWrap>
                                        <div>
                                            <Text>{tittle} - {Type == 1 ? "użytkwonik" : "wydarzenie"}</Text>
                                        </div>
                                    </Group>
                                </div>
                            }
                        }
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%,-50%)",
                            zIndex:"3",
                            width: "50%",
                            ".mantine-Autocomplete-input": {
                                backgroundColor: "#F1F3F8 !important",
                                border: "none"
                            }
                            
                        }}
                        filter={(value, item) => true
                        }
                        onChange={e => SerQuery(e)}
                        zIndex={9}
                        icon={<IconSearch/>}
                    >

                </Autocomplete>
                <Group
                    sx={{
                        float: "right",
                        position: "relative",
                        height: "95%",
                        top: "50%",
                        transform: "translate(0,-50%)",
                    }}
                >   
                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <Button
                                variant="subtle"
                                leftIcon={<IconUserCircle/>}
                                rightIcon={<IconChevronDown/>}
                                sx={{
                                    color: "rgba(0, 45, 208, .75)",
                                    // backgroundColor: "#F1F3F8",
                                    "&:hover": {
                                        backgroundColor: "rgba(0, 45, 208, .1)"
                                    }
                                }}
                            >
                                {
                                    props.UserData.Login
                                }
                            </Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Label><b>{props.UserData.Login}</b></Menu.Label>
                            <Menu.Label>{props.UserData.Email}</Menu.Label>
                            <Divider my={"sm"} variant='dashed'/>        
                            <Menu.Item sx={{                                    
                                // backgroundColor: "rgba(0, 45, 208, .1)",
                                color: "#2D5BFF",
                                "&:hover": {
                                    backgroundColor: "rgba(0, 45, 208, .1)"
                                }}} 
                                onClick={()=> LogOut()}
                                icon={<IconLogout/>}>Wyloguj się</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Container>
        </Header>
    )
}

export default HeaderView;