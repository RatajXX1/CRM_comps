import { AppShell, ScrollArea } from "@mantine/core";
import HeaderView from "../Header";
import NavbarView from "../Navbar";
import ClientsView from "./clients";
import DashboardView from "./dashboard";
import EventsView from "./events";
import UsersView from "./users";


const PageSelect = () => {
    switch (window.location.pathname) {
        case "/dashboard":
            return <DashboardView/>
        case "/events":
            return <EventsView/>
        case "/clients":
            return <ClientsView/>
        case "/users":
            return <UsersView/>                        
    }
}

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
                    height: "90vh",
                    paddingTop: "calc(var(--mantine-header-height, 0px) - 40px)"
                },
                // padding-top: calc(var(--mantine-header-height, 0px) + 16px)
            }}
        >
            <ScrollArea
                style={{width: "100%", height: "100%"}} 
                type="always"
                offsetScrollbars
            >
                {
                    PageSelect()
                }
            </ScrollArea>
        </AppShell>
    )
}

export default MainView;