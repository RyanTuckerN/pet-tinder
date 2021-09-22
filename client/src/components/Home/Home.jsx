import "./Home.css";
// import PetTinderLogo from "../MainLayoutComponents/assets/PetTinderLogo.png";
// import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

const Home = (props) => {
  return (
    <div className="background">
      <div id="spacer" /> 
      <div className="logo-container">
        <h1 id="home1">Welcome To Pet Tinder</h1>
        <div className="logo-merge">
        {/* <img id="doglogo" src={PetTinderLogo} /> */}
        {/* <ChatBubbleIcon id="chat" /> */}
        </div>
        </div>
      <div className="homepage">
      <h2 id="home2">Where Puppy Love Begins</h2>
      <h3 id="home3">Matching with breeders made easy!</h3>
      <h4 id="home4">Checkout the sidebar to start matching!</h4>
      </div>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Rampart+One&display=swap');
      </style>
    </div>
  );
};

export default Home;
