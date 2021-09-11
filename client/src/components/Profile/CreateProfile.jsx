import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import BasicInfo from "./BasicInfo";
import AdDesc from "./AdDesc";
import ImageUpload from "./ImageUpload";
import Review from "./Review";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Basic information", "Description", "Image Upload", "Review"];

function getStepContent(step, props) {
  const {zero,one,two,three} = props
  switch (step) {
    case 0:
      return <BasicInfo zeroProps={zero}/>;
    case 1:
      return <AdDesc oneProps={one} />;
    case 2:
      return <ImageUpload twoProps={two}/>;
    case 3:
      return <Review threeProps={three}/>;
    default:
      throw new Error("Unknown step");
  }
}

export default function CreateProfile(props) {
  const {token} = props
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [name, setName] = useState("Rufus");
  const [photo_url, setPhoto_url] = useState("https://images.unsplash.com/photo-1491604612772-6853927639ef?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGRvZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80");
  const [breed, setBreed] = useState("Husky");
  const [weight, setWeight] = useState(45);
  const [age, setAge] = useState(4);
  const [ad_description, setAdDescription] = useState("Rufus is cool and fun, he loves snow!");
  const [length, setLength] = useState(ad_description.length);
  const [temperament, setTemperament] = useState(['Playful', 'Energetic', 'Loyal']);
  const [is_female, setIsFemale] = useState(false);
  const [location, setLocation] = useState({zip: 46220});
  const stepperProps = {
    zero: { name, breed, age, weight, is_female, location, setName, setBreed, setAge, setWeight, setIsFemale, setLocation },
    one: { temperament, ad_description, length, setLength, setTemperament, setAdDescription },
    two: { setPhoto_url, photo_url },
    three: {
      name,
      photo_url,
      breed,
      weight,
      age,
      ad_description,
      temperament,
      is_female,
      location,
    },
  };

  const handleNext = () => setActiveStep(activeStep + 1);
  const handleBack = () => setActiveStep(activeStep - 1);
  const handleSubmit = async() => {
    const fetchResults = await fetch('http://localhost:3333/dog/', {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token
      }),
      body: JSON.stringify(stepperProps.three)
    })
    const json = await fetchResults.json()
    console.log("response@!!->>", json)
  }

  return (
    <React.Fragment>  
      <CssBaseline />
      <section className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Setup your 🐕's profile 
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                 Thank you for creating a profile! 
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                😈 Enjoy Pet Tinder! 😈
                
                </Typography>
                <Typography variant="subtitle2" >
                Follow links in the sidebar to explore the app

                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, stepperProps)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      {activeStep === steps.length - 1 ? "Yes, I need to change something" : "Back"}
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "No, submit!" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </section>
    </React.Fragment>
  );
}
