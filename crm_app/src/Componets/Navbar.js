import { createStyles, Group, Navbar } from "@mantine/core";
import {IconHome,IconListDetails, IconAddressBook, IconUsers} from "@tabler/icons"
import { useState } from "react";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme, _params, getref) => {
    return {
        link: {
            ...theme.fn.focusStyles(),
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            fontSize: theme.fontSizes.sm,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
            padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
            borderRadius: theme.radius.sm,
            fontWeight: 500,
            cursor: "pointer",
            marginBottom: "5px",

            '&:hover': {
                backgroundColor: "rgba(0, 45, 208, .03)",
                
        
                // [`& .${icon}`]: {
                // color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                // },
            },
            '& > svg': {
                color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
                marginRight: theme.spacing.sm,
            }
        },
      
      
        linkActive: {
            '&, &:hover': {
                backgroundColor: "rgba(0, 45, 208, .1)",
                color: "#2D5BFF"
                // color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
                // [`& .${icon}`]: {
                // color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
                // },
            },
            "& > svg": {
                color: "#2D5BFF"
            }
        },
    }
})

const NavButton = (text, path, icons) => {
    const {classes, cx} = useStyles()
    return (
        <Link to={path} className={cx(classes.link, {[classes.linkActive]: "#" +path == window.location.hash}) }>
            {/* <IconHome className={classes.linkIcon}/> */}
            {
                icons
            }

            <span>
                {
                    text
                }
            </span>
        </Link>
    )
}

const NavHeader = (text) => {
    return (
        <b
            style={{
                lineHeight: "50px",
                color: "#181818",
                fontWeight: "400",
                letterSpacing: '1px'
            }}
        >
            {
                text
            }
        </b>
    )
}

function NavbarView(props) {
    const [Hidden, SetHidden] = useState(true)


    return (
        <Navbar
            width={{ sm: 200, lg: 300}} 
            p="xs"
            zIndex={"1"}
            sx={{
                backgroundColor: props.Opened ? "rgba(241, 242, 247, 0.75);" : "rgba(241, 242, 247, 1);" ,
                zIndex: 1,
                height: "100%",
                border: "none",
                zIndex: props.Opened ? "1" : "5"
            }}
            hidden={props.Opened}
        >
            <Navbar.Section
                grow
                sx={{
                    position: "relative",
                    paddingTop: "20px",
                    width: "90%",
                    left: "50%",
                    transform: "translate(-50%, 0)"
                }}
            >
                {
                    NavHeader("Og??lne")
                }
                {
                    NavButton("Dashboard", "/dashboard", <IconHome/>)
                }
                {
                    NavButton("Wydarzenia", "/events", <IconListDetails/>)
                }
                {
                    NavButton("Klienci", "/clients", <IconAddressBook/>)
                }
                {/* {
                   props.UserData.Rank_type > 1 && NavHeader("Zarz??dzaj")
                }
                {
                    props.UserData.Rank_type > 1 && NavButton("U??ytkownicy", "/users", <IconUsers/>)
                } */}

            </Navbar.Section>
        </Navbar>
    )
}

export default NavbarView;