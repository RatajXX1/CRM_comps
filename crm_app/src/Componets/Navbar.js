import { createStyles, Group, Navbar } from "@mantine/core";
import {IconHome} from "@tabler/icons"

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
        },
      
        linkIcon: {
            color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
            marginRight: theme.spacing.sm,
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

const NavButton = (text, path) => {
    const {classes, cx} = useStyles()
    return (
        <a className={cx(classes.link, {[classes.linkActive]: path == window.location.pathname}) }>
            <IconHome className={classes.linkIcon}/>
            <span>
                {
                    text
                }
            </span>
        </a>
    )
}

const NavHeader = () => {
    return (
        <b
            style={{
                lineHeight: "50px",
                color: "#181818",
                fontWeight: "400",
                letterSpacing: '1px'
            }}
        >
            Ogólne
        </b>
    )
}

function NavbarView() {

    return (
        <Navbar
            width={{ base: 270 }} 
            p="xs"
            zIndex={"1"}
            sx={{
                backgroundColor: "rgba(241, 242, 247, 0.75);",
                zIndex: 1,
                height: "100%",
                border: "none"
            }}
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
                    NavHeader()
                }
                {
                    NavButton("Dashboard", "/")
                }
                {
                    NavButton("Wydarzenia", "/dsa")
                }
                {
                    NavButton("Dashboard", "/ds")
                }
            </Navbar.Section>
        </Navbar>
    )
}

export default NavbarView;