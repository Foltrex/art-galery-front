import {styled, useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import React, {PropsWithChildren, useEffect, useState} from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import {AuthService} from "../../services/AuthService";
import {observer} from "mobx-react-lite";
import {Cookies} from "react-cookie";
import {CircularProgress} from "@mui/material";

const drawerWidth = 240;

const Main = styled("main", {shouldForwardProp: (prop) => prop !== "open"})<{
    open?: boolean;
}>(({theme, open}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    })
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open"
})<AppBarProps>(({theme, open}) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}));

const DrawerHeader = styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
}));

const Layout: React.FC<PropsWithChildren> = observer(({children}) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [isLogin, setIsLogin] = useState<boolean | null>(null)

    const cookies = new Cookies()

    useEffect(() => {
        setIsLogin(AuthService.isAuthenticated)
    }, [cookies])

    const renderButton = () => {
        if (isLogin === null) {
            return (
                <CircularProgress color="success"/>
            )
        } else if (isLogin) {
            return (
                <Button
                    color="inherit"
                    variant="outlined"
                    onClick={() => {
                        AuthService.logout()
                    }}
                >
                    Logout
                </Button>
            )
        } else {
            return (
                <Button
                    color="inherit"
                    variant="outlined"
                    component={Link}
                    href={'/auth/signin'}
                >
                    Login
                </Button>
            )
        }
    }

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{mr: 2, ...(open && {display: 'none'})}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        href='/'
                        color='white'
                        sx={{flexGrow: 1, textDecoration: 'none'}}>
                        Admin
                    </Typography>
                    {renderButton()}
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    <ListItem key={'Organization'}
                              component={Link}
                              style={{color: "black"}}
                              href='/'>
                        <ListItemButton>
                            <ListItemIcon>
                                <AccountCircleOutlinedIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Organization'/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'Representatives'}
                              component={Link}
                              style={{color: "black"}}
                              href={{
                                  pathname: '/representatives',
                                  query: {
                                      page: 0,
                                      limit: 10
                                  }
                              }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeWorkOutlinedIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Representatives'/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'Facilities'}
                              component={Link}
                              style={{color: "black"}}
                              href={{
                                  pathname: '/facilities',
                                  query: {
                                      page: 0,
                                      limit: 10
                                  }
                              }}
                    >

                        <ListItemButton>
                            <ListItemIcon>
                                <PhotoSizeSelectActualOutlinedIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Facilities'/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader/>
                {children}
            </Main>
        </Box>
    );
});


export default Layout;