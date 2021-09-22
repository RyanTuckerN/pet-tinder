import React from "react";
import PetTinderLogo from "./assets/PetTinderLogo.png";

const Logo = () => {
  const image = {
    height: "100%",
  };

  const div = {
    height: 50,
  };

  return (
    <div style={div}>
      <img style={image} src={PetTinderLogo} alt="Pet Tinder Logo" />
    </div>
  );
};

export default Logo;
