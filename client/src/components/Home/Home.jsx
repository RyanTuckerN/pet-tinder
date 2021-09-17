import "./Home.css"
import PetTinderLogo from '../MainLayoutComponents/assets/PetTinderLogo.png'
// import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

const Home = (props) => {
  return ( 
    <div>
      <h1 id="home1">Welcome To Pet Tinder</h1>
      <h2 id="home2">Where Puppy Love Begins</h2>
      <h3 id="home3">Matching with breeders made easy!</h3>
      <h4 id="home4">Checkout the sidebar to start matching!</h4>
      <img id="doglogo" src={PetTinderLogo} />
      <ChatBubbleIcon id="home-chat" />
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Rampart+One&display=swap');
      </style>
    </div>
   );
}
 
export default Home;