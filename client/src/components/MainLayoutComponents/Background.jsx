import "./Waves.css";
import dogLogo from '../MainLayoutComponents/assets/PetTinderLogo.png'
import useWindowDimensions from "../customHooks/useWindowDimension";

const BackgroundWaves = () => {
  const { width } = useWindowDimensions()

  return (
    <div class="header">
      <div class="inner-header flex">
        <img src={dogLogo} className='logo' />
        <h1>pet tinder</h1>
        {width>=525?<p>...where puppy love starts</p>:null}
      </div>
      <div>
        <svg
          class="waves"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shape-rendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g class="parallax">
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(255,255,255,0.7"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(255,255,255,0.5)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(255,255,255,0.3)"
            />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
        <div class="content flex">
          {/* Could put a footer here */}
        </div>
      </div>
    </div>
  );
};

export default BackgroundWaves;
