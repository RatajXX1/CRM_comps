import { AppShell } from "@mantine/core";
import HeaderView from "../Header";
import NavbarView from "../Navbar";


function MainView() {
    return (
        <AppShell
            header={<HeaderView/>}
            navbar={<NavbarView/>}
            sx={{
                ".mantine-AppShell-main": {
                    overflow: "hidden",
                    minHeight: "unset"
                }
            }}
        >
            widok
        </AppShell>
    )
}

export default MainView;