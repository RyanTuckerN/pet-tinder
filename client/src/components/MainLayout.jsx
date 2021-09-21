import React, { useState, useEffect } from "react";
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, useTheme, styled } from "@material-ui/core/styles";
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
  Badge,
  ClickAwayListener
} from "@material-ui/core";

import ChatIndex from "./Chat/ChatIndex";
import CreateProfile from "./Profile/CreateProfile";
import MatchList from "./MainLayoutComponents/MatchList";
import Dropdown from "./MainLayoutComponents/Dropdown";
import Matches from "./Matches/Matches";
import dogPic from "./MainLayoutComponents/assets/dog.png";
import useWindowDimensions from "./customHooks/useWindowDimension";
import PotentialMatches from "./PotentialMatches/PotentialMatches";
import EditProfile from "./Profile/EditProfile";
import Home from "./Home/Home";
import NotificationsPage from "./Notifications/Notifications";
import DisplayProfile from "./Profile/DisplayProfile";
import Account from "./MainLayoutComponents/Account";
import Logo from "./MainLayoutComponents/Logo";

let drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    // zIndex: theme.zIndex.drawer - ,
    height: 65,
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
    // [theme.breakpoints.up("sm")]: {
    //   width: theme.spacing(9) + 2,
    // },
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
    backgroundColor: '#514949',
  },
  content: {
    backgroundColor: "#f3f0ee",
  },
  darkBackgroud: {
    color: '#f3f0ee',
    backgroundColor: '#514949'
  }
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'center',
}));

export default function MainLayout(props) {
  //DESTRUCTURING PROPS
  const {
    socket,
    usersInfo,
    onlineUsers,
    clearToken,
    token,
    notifications,
    setNotifications,
    setUsersInfo,
  } = props.mainLayoutProps;

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

  const noteProps = {
    usersInfo,
    notifications,
    setNotifications,
    socket,
    setChatTarget,
  };

  const dropdownProps = { anchorEl, clearToken, handleDropdownClose };

  //JSX
  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline /> {/* This is from MUI*/}
        <AppBar // THIS IS TOP NAVBAR
          position="fixed"
          className={
            clsx(classes.appBar, 
              {[classes.appBarShift]: open,}
              )}
          style={{
            zIndex: width >= 600 ? theme.zIndex.drawer + 1 : 1,
            background:
              "radial-gradient(circle, #ff655b 1%, #ff5864 35%, #fd2974 100%)",
          }}
        >
          <Toolbar
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                marginRight: "auto",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
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
              >
                <Menu />
              </IconButton>
              <Link to="/">
                <Logo />
              </Link>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <Badge badgeContent={notifications?.length} color="error">
                <Link to="/notifications">
                  <IconButton>
                    <Notifications color="inherit" />
                  </IconButton>
                </Link>
              </Badge>
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
        {width >= 600 ? (
          
          <Drawer // THIS IS SIDE NAVBAR
            variant={"permanent"}
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
            // style={{ bac }}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={handleDrawerClose} className={classes.darkBackgroud}>
                {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
              </IconButton>
            </div>
            <Divider />
            <Tooltip title="View your profile">
              <Link onClick={handleDrawerClose}
                to={
                  usersInfo?.user?.dog
                    ? `/profile/${usersInfo?.user?.id}`
                    : "/create-profile"
                }
              >
                <ListItem button>
                  <ListItemIcon>
                    <AccountBox />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItem>
              </Link>
            </Tooltip>
            <Tooltip title="See potential matches">
              <Link onClick={handleDrawerClose} to="/potentialmatches">
                <ListItem button>
                  <ListItemIcon>
                    <Pets />
                  </ListItemIcon>
                  <ListItemText primary="Dogs" />
                </ListItem>
              </Link>
            </Tooltip>
            <Tooltip title="See your matches">
              <Link onClick={handleDrawerClose} to="/matches">
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
              <MatchList matchListProps={matchListProps} handleDrawerClose={handleDrawerClose}/>
            </Link>
          </Drawer>
        )
        :
        (<Drawer

        sx={{
          width: 500,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            // zIndex: 1400,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        
        open={open}
      >
          <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </DrawerHeader>
          <Divider />
          <Tooltip title="View your profile">
            <Link
            onClick={handleDrawerClose}
              to={
                usersInfo?.user?.dog
                  ? `/profile/${usersInfo?.user?.id}`
                  : "/create-profile"
              }
            >
              <ListItem button>
                <ListItemIcon>
                  <AccountBox />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
            </Link>
          </Tooltip>
          <Tooltip title="See potential matches">
            <Link onClick={handleDrawerClose} to="/potentialmatches">
              <ListItem button>
                <ListItemIcon>
                  <Pets />
                </ListItemIcon>
                <ListItemText primary="Dogs" />
              </ListItem>
            </Link>
          </Tooltip>
          <Tooltip title="See your matches">
            <Link onClick={handleDrawerClose} to="/matches">
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
            <MatchList matchListProps={matchListProps} handleDrawerClose={handleDrawerClose} />
          </Link>
        </Drawer>)}
        {/* ***THIS IS THE MAIN BODY DIV, EVERYTHING DYNAMIC WILL SHOW HERE!*** */}
        <main className={classes.content}>
          <div className={classes.toolbar} />

          {/* <div id="body-container"> */}

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/account">
              <Account usersInfo={usersInfo} socket={socket} />
            </Route>
            <Route path="/profile/:dogId">
              <DisplayProfile
                dog={usersInfo?.user?.dog}
                usersInfo={usersInfo}
              />
            </Route>
            <Route exact path="/create-profile">
              <CreateProfile usersInfo={usersInfo} socket={socket} />
            </Route>
            <Route exact path="/edit-profile">
              {usersInfo.user?.dog ? (
                <EditProfile profileProps={profileProps} />
              ) : (
                <CreateProfile />
              )}
            </Route>
            <Route exact path="/potentialmatches">
              <PotentialMatches
                usersInfo={usersInfo}
                socket={socket}
                setUsersInfo={setUsersInfo}
              />
            </Route>
            <Route exact path="/matches">
              <Matches usersInfo={usersInfo} socket={socket} />
            </Route>
            <Route exact path="/notifications">
              <NotificationsPage noteProps={noteProps} />
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
