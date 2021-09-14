import "./Home.css"
import DogLogo from '../MainLayoutComponents/assets/DogLogo.png'
// import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

const Home = (props) => {
  return ( 
    <div>
      <h1>Welcome To Pet Tinder</h1>
      <h2>Where Puppy Love Begins</h2>
      <h3>Matching with breeders made easy!</h3>
      <h4>Checkout the sidebar to start matching!</h4>
      <img id="doglogo" src={DogLogo} />
      <ChatBubbleIcon id="chat" />
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Rampart+One&display=swap');
      </style>
    </div>
    
   );
}
 
export default Home;