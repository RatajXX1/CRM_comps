import { AppShell, ScrollArea } from "@mantine/core";
import { useEffect, useState } from "react";
import HeaderView from "../Header";
import NavbarView from "../Navbar";
import AddClientView from "./addclients";
import AddEventsView from "./addevents";
import ClientsView from "./clients";
import DashboardView from "./dashboard";
import EventsView from "./events";
import ShowClientView from "./ShowClient";
import ShovEventsView from "./ShowEvent";
import UsersView from "./users";


const PageSelect = () => {
    switch (window.location.pathname) {
        case "/dashboard":
            return <DashboardView/>
        case "/events":
            return <EventsView/>
        case "/add/events":
            return <AddEventsView/>
        case "/show/events":
            return <ShovEventsView/>
        case "/show/client":
            return <ShowClientView/>            
        case "/add/clients":
            return <AddClientView/>        
        case "/clients":
            return <ClientsView/>
        case "/users":
            return <UsersView/>                        
    }
}

function MainView(props) {
    const [Open, SetOpen] = useState(false)

    // useEffect(()=> {
    //     setInterval(() => {if (window.innerWidth < 800) {
    //         if (!Open) SetOpen(false)
    //     }
    //     else {
    //         if (Open) SetOpen(true)
    //     }}, 500)
    // })

    return (
        <AppShell
            header={<HeaderView Opened={Open} onClose={() => {SetOpen(!Open)}} UserData={props.User_data}/>}
            navbar={<NavbarView Opened={!Open} onClose={() => {SetOpen(!Open)}} UserData={props.User_data}/>}
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
                sx={{
                    ".mantine-ScrollArea-thumb": {
                        zIndex: 3
                    }
                }}
            >
                {
                    PageSelect()
                }
            </ScrollArea>
        </AppShell>
    )
}

export default MainView;