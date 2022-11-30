import { Alert, Button, Container, Group, Notification, Paper, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import {IconChevronRight,IconKey,IconPassword} from "@tabler/icons"
import { useEffect, useState } from "react";
import Server from "../../Utilis/Server";
import { IconX } from '@tabler/icons';
import { Navigate, useNavigate } from "react-router-dom";

function LoginView() {
    const [Notfi, SetNotfi] = useState(false)
    const [NotfiText, SetNotfiText] = useState("")
    const navi = useNavigate()

    const LoginForm = useForm({
        initialValues: {
            login: "",
            password: "",
            Auto_login: false
        }
    })

    const NotfiUP = (text) => {
        SetNotfi(true)
        SetNotfiText(text)
    }

    const ProccedLogin = (valss) => {
        // window.location.href = "/dashboard"
        SetNotfi(true)
        Server.ApiInstance().post(
            "/api/auth/login.php",
            {...valss}
        ).then( 
            resp => {
                if (resp.data.CODE != "NO") {
                    window.location.href = "/dashboard"
                } else {
                    NotfiUP(resp.data.Mess)
                }   
            }
        )
        .catch(
            err => {
                NotfiUP("Wystapił błąd spróbuj ponownie później!")
            }
        )

    }

    useEffect(
        () => {
            Server.ApiInstance()
            .get("/api/auth/authorize.php")
            .then(
                resp => {
                    if (resp.data.CODE == "OK") navi("/dashboard")
                }
            )
        }
    )

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(241, 242, 247, 0.75)",
            }}
        >

            <Container 
                sx={{
                    position: "relative",
                    top: "50%",
                    transform: "translate(0, -50%)"
                }}
                size={"400px"}
                
            >
                            {
                Notfi && <Alert sx={{bottom: "20px"}} onClose={() => SetNotfi(false)} icon={<IconX size={18} />} color="red">
                    {
                        NotfiText
                    }
                </Alert>
            }
                <Paper sx={{height: "350px"}} shadow="xs" radius="xs" p="md">
                    <Title sx={{color: "#2D5BFF"}} order={2}>
                        Logowanie
                    </Title>
                    <form
                        style={{
                            position: "relative",
                            height: "90%",
                            width: "90%",
                            left: "50%",
                            transform: "translate(-50%, 0)",
                            marginTop: "20px"
                        }}
                        onSubmit={LoginForm.onSubmit((values) => ProccedLogin(values))}
                    >
                        <TextInput
                            icon={<IconKey/>}
                            sx={{marginBottom: "20px", ".mantine-TextInput-input:focus":{ borderColor: "#2D5BFF"}}}
                            label="Login"
                            placeholder="Użytkownik"
                            variant="filled"
                            radius="md"
                            {...LoginForm.getInputProps('login')}
                        />

                        <TextInput
                            sx={{".mantine-TextInput-input:focus":{ borderColor: "#2D5BFF"}}}
                            icon={<IconPassword/>}
                            type={"password"}
                            variant="filled"
                            radius="md"
                            label="Hasło"
                            placeholder="Hasło"
                            {...LoginForm.getInputProps('password')}
                        />
                        
                        <Group sx={{
                            position: "absolute",
                            bottom: "40px",
                            right: "0"
                        }} position="right" mt="md">
                            <Button
                                rightIcon={<IconChevronRight/>}
                                type="submit"
                                sx={{
                                    backgroundColor: "rgba(0, 45, 208, .1)",
                                    color: "#2D5BFF",
                                    "&:hover": {
                                        backgroundColor: "rgba(0, 45, 208, .25)"
                                    }
                                }}
                            >Zaloguj się</Button>
                        </Group>
                    </form>
                </Paper>
            </Container>
        </div>
    )
}

export default LoginView;