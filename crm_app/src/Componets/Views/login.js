import { Button, Container, Group, Paper, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";


function LoginView() {

    const LoginForm = useForm({
        initialValues: {
            Login: "",
            Password: ""
        }
    })

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh"
            }}
        >
            <Container 
                sx={{
                    position: "relative",
                    top: "50%",
                    transform: "translate(0, -50%)"
                }}
                size={"xs"}
            >
                <Paper sx={{height: "500px"}} shadow="xs" radius="md" p="md">
                    <Title order={2}>
                        Logowanie
                    </Title>
                    <form>
                        <TextInput
                            withAsterisk
                            label="Login"
                            placeholder="your@email.com"
                            {...LoginForm.getInputProps('Login')}
                        />

                        <TextInput
                            type={"password"}
                            withAsterisk
                            label="Hasło"
                            placeholder="Hasło"
                            {...LoginForm.getInputProps('Password')}
                        />
                        
                        <Group position="center" mt="md">
                            <Button type="submit">Zaloguj się</Button>
                        </Group>
                    </form>
                </Paper>
            </Container>
        </div>
    )
}

export default LoginView;