import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ photoUrl }) => {
  return (
    <div className="marginalize center">
      {photoUrl ? (
        <img className="rounded center" src={photoUrl} alt="Your Chosen Result" />
      ) : null}
    </div>
  );
};

export default FaceRecognition;
