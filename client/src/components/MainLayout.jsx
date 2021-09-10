import React, { useState, useEffect } from "react";
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
  Tooltip,
  Typography,
} from "@material-ui/core";

import ChatIndex from "./Chat/ChatIndex";
import Profile from "./Profile/Profile";
import MatchList from "./MainLayoutComponents/MatchList";
import dogPic from "./MainLayoutComponents/assets/dog.png";
import useWindowDimensions from "./customHooks/useWindowDimension";

const drawerWidth = 220;

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
  const { socket, usersInfo, onlineUsers } = props.mainLayoutProps;
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [chatTarget, setChatTarget] = useState(null);
  const [avatarPhoto, setAvatarPhoto] = useState(dogPic);
  const { width } = useWindowDimensions();

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleDrawerToggle = () => setOpen(!open);

  const chatProps = {
    chatTarget,
    usersInfo,
    socket,
    open,
    setChatTarget,
  };
  const matchListProps = {
    usersInfo,
    onlineUsers,
    socket,
    open,
    setChatTarget,
    handleDrawerToggle,
  };

  useEffect(() => {
    if (usersInfo.user) {
      if (usersInfo.user.dog) {
        setAvatarPhoto(usersInfo.user.dog.photo_url);
      }
    }
  }, [usersInfo]);

  return (
    <div className={classes.root}>
      <CssBaseline /> {/* This is from MUI*/}
      <AppBar // THIS IS TOP NAVBAR
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{
          background:
            "radial-gradient(circle, rgba(180,155,79,1) 1%, rgba(195,85,19,1) 35%, rgba(186,23,97,1) 100%)",
        }}
      >
        <Toolbar
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
            style={{ marginRight: "auto" }}
          >
            <Menu />
          </IconButton>
          {width > 500 && !open ? (
            <Typography variant="h6" noWrap className={classes.title}>
              Pet Tinder
            </Typography>
          ) : null}
          <div style={{ marginLeft: "auto" }}>
            <IconButton>
              <Notifications color="inherit" />
            </IconButton>
            <IconButton>
              <Avatar alt="Profile Avatar" src={avatarPhoto} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer // THIS IS SIDE NAVBAR
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
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <Tooltip title="View or edit your profile">
          <ListItem button>
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </Tooltip>
        <Tooltip title="See potential matches">
          <ListItem button>
            <ListItemIcon>
              <Pets />
            </ListItemIcon>
            <ListItemText primary="Dogs" />
          </ListItem>
        </Tooltip>
        <Tooltip title="See your matches">
          <ListItem button>
            <ListItemIcon>
              <Favorite />
            </ListItemIcon>
            <ListItemText primary="Matches" />
          </ListItem>
        </Tooltip>
        <Divider />
        <MatchList matchListProps={matchListProps} />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div
          id="body-container" //OUR COMPONENTS WILL BE RENDERED HERE FROM REACT-ROUTER-DOM
        >
          {socket ? (
            <ChatIndex chatProps={chatProps} />
          ) : (
            <div>Not Connected</div>
          )}
          {/* <Profile /> */}
        </div>
      </main>
    </div>
  );
}
