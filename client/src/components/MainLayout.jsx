/*
THIS IS THE MAIN HUB FOR OUR APP, SIMILAR TO THE SIDEBAR FROM REACT-MODULES. 
THERE IS A LOT OF STUFF IN HERE, BUT MOST OF IT IS MATERIAL UI COMPONENTS.
*/

import React, { useState, useEffect } from "react";
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
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
  Container,
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
import CreateProfile from "./Profile/CreateProfile";
import MatchList from "./MainLayoutComponents/MatchList";
import Dropdown from "./MainLayoutComponents/Dropdown";
import Matches from "./Matches/Matches";

import dogPic from "./MainLayoutComponents/assets/dog.png";
import useWindowDimensions from "./customHooks/useWindowDimension";
import PotentialMatches from "./PotentialMatches/PotentialMatches";
import Profile from "./Profile/Profile";
import Home from "./Home/Home";

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
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    // flexGrow: 1,
    // padding: theme.spacing(3),
    // height: '100vh',
  },
}));

export default function MainLayout(props) {
  //DESTRUCTURING PROPS
  const { socket, usersInfo, onlineUsers, clearToken, token, setUsersInfo } =
    props.mainLayoutProps;

  //HOOKS
  const classes = useStyles();
  const theme = useTheme();
  const { width } = useWindowDimensions();

  //STATE
  const [open, setOpen] = useState(false);
  const [chatTarget, setChatTarget] = useState(null);
  const [avatarPhoto, setAvatarPhoto] = useState(dogPic);
  const [anchorEl, setAnchorEl] = useState(null);

  //FUNCTIONS FOR DRAWER OPEN/CLOSE
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleDrawerToggle = () => setOpen(!open);

  //FUNCTION FOR USER DROPDOWN
  const handleAvatarClick = (e) => setAnchorEl(e.currentTarget);
  const handleDropdownClose = () => setAnchorEl(null);

  //LOADING USER AVATAR ON LOGIN IF USER HAS A PROFILE
  useEffect(() => {
    usersInfo?.user?.dog
      ? setAvatarPhoto(usersInfo.user.dog.photo_url)
      : setAvatarPhoto(dogPic);
  }, [usersInfo]);

  //PROP OBJECTS
  const profileProps = { token, avatarPhoto, usersInfo, socket };

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
    chatTarget,
    setChatTarget,
    handleDrawerToggle,
  };

  const dropdownProps = { anchorEl, clearToken, handleDropdownClose };

  //JSX
  return (
    <Router>
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
              <Link to="/">
                <Typography
                  variant="h6"
                  noWrap
                  className={classes.title}
                  style={{ color: "white" }}
                >
                  Pet Tinder
                </Typography>
              </Link>
            ) : null}
            <div style={{ marginLeft: "auto" }}>
              <IconButton>
                <Notifications color="inherit" />
              </IconButton>
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleAvatarClick}
              >
                <Avatar alt="Profile Avatar" src={avatarPhoto} />
              </IconButton>
              <Dropdown dropdownProps={dropdownProps} />
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
            <Link to={usersInfo?.user?.dog ? "/profile" : "/create-profile"}>
              <ListItem button>
                <ListItemIcon>
                  <AccountBox />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
            </Link>
          </Tooltip>
          <Tooltip title="See potential matches">
            <Link to="/potentialmatches">
              <ListItem button>
                <ListItemIcon>
                  <Pets />
                </ListItemIcon>
                <ListItemText primary="Dogs" />
              </ListItem>
            </Link>
          </Tooltip>
          <Tooltip title="See your matches">
            <Link to="/matches">
              <ListItem button>
                <ListItemIcon>
                  <Favorite />
                </ListItemIcon>
                <ListItemText primary="Matches" />
              </ListItem>
            </Link>
          </Tooltip>
          <Divider />
          <Link to="/chat">
            <MatchList matchListProps={matchListProps} />
          </Link>
        </Drawer>
        {/* ***THIS IS THE MAIN BODY DIV, EVERYTHING DYNAMIC WILL SHOW HERE!*** */}
        <main 
        className={classes.content}
        >
          <div className={classes.toolbar} />
          
          {/* <div id="body-container"> */}
       
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/create-profile">
                <CreateProfile token={token} />
              </Route>
              <Route exact path="/profile">
                {usersInfo.user?.dog ? (
                  <Profile profileProps={profileProps} />
                ) : (
                  <CreateProfile />
                )}
              </Route>
              <Route exact path="/potentialmatches">
                <PotentialMatches usersInfo={usersInfo} socket={socket} />
              </Route>
              <Route exact path="/matches">
                <Matches usersInfo={usersInfo} socket={socket} />
              </Route>
              <Route exact path="/chat">
                {socket ? (
                  <ChatIndex chatProps={chatProps} />
                ) : (
                  <div>Not Connected</div>
                )}
              </Route>
            </Switch>
       
          {/* </div> */}
      
      </main>
      </div>
    </Router>
  );
}
