import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Grid, Typography, Container, makeStyles, Avatar } from "@material-ui/core";
import { LocationOn } from "@material-ui/icons";
import NotConnected from "../MainLayoutComponents/NotConnected";
 
const useStyles = makeStyles({
  root: {
    borderRadius: 2,
    height: 600,
    // textAlign: "left",
    color: '#514949',
    // backgroundColor:
      // "#red",
  }})

const DisplayProfile = (props) => {
  const classes = useStyles()
  const { dogId } = useParams();
  const { usersInfo } = props;
  const [locale, setLocale] = useState(null);
  const currentDog =
    usersInfo?.matches?.filter((match) => match.id === parseInt(dogId))[0] ??
    usersInfo?.user?.dog;

  useEffect(async()=>{
    if(!currentDog?.location?.lat || !currentDog?.location?.lon) return
    const { lat, lon } = currentDog.location
    try {
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      );
      const json = await res.json();
      console.log("REVERSE GEO:", json);
      setLocale({locale: json.city ? json.city : json.locality, state: json.principalSubdivision})
    } catch (err) {
      console.error(err);
    }
  }, [currentDog])

  return currentDog ? (
    <Container
      maxWidth="sm"
      className={classes.root}
      style={{
        minHeight: "calc(100% - 65px)",
        border: "solid #f6f6f6 2px",
        borderRadius: 2,
        background: 'white'
      }}
      id="profile-container"
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: 30 }}
      >
        <Grid
          item
          direction="column"
          justifyContent="center"
          alignItems="center"
          container
          style={{ padding: 10 }}
          xs={12}
        >
          <Grid item xs={11}>
            <Avatar
            
              src={currentDog.photo_url}
              alt={currentDog.name}
              style={{ width: 200, height:200, borderRadius: '50%' }}
            />
          </Grid>
          <Grid
            container
            item
            xs={11}
            style={{
              padding: 10,
            }}
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
          >
            <div style={{width: '100%'}}>
              <div style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between'}}>
                <Typography variant="h3" display="inline" align="left">
                  {currentDog.name}
                </Typography>
                <div style={{display: 'flex', alignItems: 'flex-end'}}>
                  {locale ? <LocationOn /> : null}
                  <Typography>
                    {locale? `${locale.locale}, ${locale.state}` : null}
                  </Typography>
                </div>
              </div>
              <Typography
                variant="subtitle1"
                style={{ paddingBottom: 5, paddingLeft: 15 }}
              >
                {`${currentDog.breed} | ${currentDog.age} years old | ${currentDog.weight} pounds`}
              </Typography>
              <Typography
                variant="body2"
                style={{ paddingBottom: 5, paddingLeft: 15 }}
              >
                {currentDog.temperament.join(" | ")}
              </Typography>
              <hr />
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  variant="h6"
                  style={{ paddingBottom: 5, paddingLeft: 15 }}
                >
                  {`${currentDog.name}'s owner says:`}
                </Typography>
                <Typography
                  variant="body2"
                  style={{ paddingBottom: 5, paddingLeft: 15 }}
                >
                  {currentDog.ad_description}
                </Typography>
              </div>
              <div style={{ marginTop: 35 }}>
                <Typography variant="subtitle2">
                  {`Eligible ${
                    currentDog.is_female ? "bachelorette" : "bachelor"
                  } since ${new Date(currentDog.createdAt).toLocaleDateString()}`}
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  ) : (
    <NotConnected />
  );
};

export default DisplayProfile;
