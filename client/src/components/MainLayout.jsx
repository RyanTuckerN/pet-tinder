import React, { useState } from "react";
import { Route, Link, Switch } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Notifications,
  AccountBox,
  Favorite,
  Pets,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "@material-ui/icons";
import {
  AppBar,
  Avatar,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@material-ui/core";

import ChatIndex from "./Chat/ChatIndex";
import MatchList from "./MainLayoutComponents/MatchList";
import dogPic from "./MainLayoutComponents/assets/dog.png";
import useWindowDimensions from "./customHooks/useWindowDimension";

let width = window.innerWidth;
let drawerWidth = 220;
const handleResize = () => {
  width = window.innerWidth;
  drawerWidth = width > 500 ? 220 : width;
};
window.addEventListener("resize", handleResize);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    display: "flex",
    justifyContent: "space-around",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 18,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 2,
    },
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    // height: '100vh',
  },
}));

export default function MainLayout(props) {
  const { socket, usersInfo, setUsersInfo, onlineUsers, setOnlineUsers } =
    props.mainLayoutProps;
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [chatTarget, setChatTarget] = useState(null);
  const { width } = useWindowDimensions()
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleDrawerToggle = () => setOpen(!open);
  
  const chatProps = {
    chatTarget,
    socket,
    usersInfo,
    setUsersInfo,
    open,
    setOnlineUsers,
    setChatTarget,
  };
  const matchListProps = {
    usersInfo,
    socket,
    onlineUsers,
    setChatTarget,
    handleDrawerToggle,
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{
          background:
            "radial-gradient(circle, rgba(180,155,79,1) 1%, rgba(195,85,19,1) 35%, rgba(186,23,97,1) 100%)",
        }}
      >
        <Toolbar style={{display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
            style={{marginRight: 'auto'}}
          >
            <Menu />
          </IconButton>
          {width>500&&!open?<Typography variant="h6" noWrap className={classes.title}>
            Pet Tinder
          </Typography>:null}
          <div style={{marginLeft: 'auto'}}>
            <IconButton>
              <Notifications color="inherit" />
            </IconButton>
            <IconButton>
              <Avatar
                alt="Profile Avatar"
                src={usersInfo.user.dog ? usersInfo.user.dog.photo_url : dogPic}
              />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar} >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <ListItem button >
          <ListItemIcon >
            <AccountBox />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button >
          <ListItemIcon>
            <Pets />
          </ListItemIcon>
          <ListItemText primary="Dogs" />
        </ListItem>
        <ListItem button >
          <ListItemIcon>
            <Favorite />
          </ListItemIcon>
          <ListItemText primary="Matches" />
        </ListItem>
        <Divider />
        <MatchList matchListProps={matchListProps} />
      </Drawer>
      <main className={classes.content} >
        <div className={classes.toolbar} />

        <div id="body-container">
          {/* Mount your component here */}
          {socket ? (
            <ChatIndex chatProps={chatProps} />
          ) : (
            <div>Not Connected</div>
          )}
        </div>
      </main>
    </div>
  );
}
