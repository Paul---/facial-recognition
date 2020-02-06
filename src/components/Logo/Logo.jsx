import React from "react";
import Tilt from 'react-tilt';
import './Logo.css';
import faceIcon from './faceIcon.png';
const Logo = () => {
  return (
    <Tilt
      className="Tilt br2 shadow-2"
      options={{ max: 65 }}
      style={{ height: 150, width: 150,marginLeft:"20px" }}
    >
      <div className="Tilt-inner pa3"> <img style={{paddingTop:"15px"}} src={faceIcon} alt="face icon"/> </div>
    </Tilt>
  );
};

export default Logo;
