import { AppShell, ScrollArea } from "@mantine/core";
import HeaderView from "../Header";
import NavbarView from "../Navbar";
import DashboardView from "./dashboard";


function MainView() {
    return (
        <AppShell
            header={<HeaderView/>}
            navbar={<NavbarView/>}
            sx={{
                height: "90vh",
                ".mantine-AppShell-main": {
                    overflow: "hidden",
                    minHeight: "unset",
                    height: "90vh"
                }
            }}
        >
            <ScrollArea
                style={{width: "100%", height: "100%"}} 
                type="always"
                offsetScrollbars
            >
                <DashboardView/>
            </ScrollArea>
        </AppShell>
    )
}

export default MainView;