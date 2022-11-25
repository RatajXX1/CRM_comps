import { Button, Container, Group, Paper, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import {IconChevronRight,IconKey,IconPassword} from "@tabler/icons"

function LoginView() {

    const LoginForm = useForm({
        initialValues: {
            Login: "",
            Password: ""
        }
    })

    const ProccedLogin = (valss) => {
        window.location.href = "/dashboard"
    }

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
                            {...LoginForm.getInputProps('Login')}
                        />

                        <TextInput
                            sx={{".mantine-TextInput-input:focus":{ borderColor: "#2D5BFF"}}}
                            icon={<IconPassword/>}
                            type={"password"}
                            variant="filled"
                            radius="md"
                            label="Hasło"
                            placeholder="Hasło"
                            {...LoginForm.getInputProps('Password')}
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