import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

export default function NotificationsPage(props) {
  const { usersInfo, notifications, setNotifications } = props.noteProps;
  const [matchImages, setMatchImages] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const picDictionary = usersInfo?.matches?.reduce((a, b) => {
      a[b.id] = b.photo_url;
      return a;
    }, {});
    console.log(picDictionary);
    setMatchImages(picDictionary);
  }, [usersInfo]);

  const handleClear = async() => {
    const fetchDelete = await fetch('http://localhost:3333/note/',
    {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      })
    })
    const deletionsJson = await fetchDelete.json()
    console.log(deletionsJson)
    setNotifications(null)
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.title}>
            Notifications
          </Typography>
          <div className={classes.demo}>
            <List>
              {notifications
                ? notifications.map((n) => {
                    return (
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            src={matchImages ? matchImages[n.target] : null}
                          ></Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={n.message} />
                      </ListItem>
                    );
                  })
                : null}
            </List>
            <Button onClick={handleClear} variant="outlined">CLEAR NOTIFICATIONS</Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
