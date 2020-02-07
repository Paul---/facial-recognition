import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ photoUrl }) => {
  return (
    <div className="marginalize center">
      {photoUrl ? <img className="rounded center" src={photoUrl} alt="test" />: null} 
    </div>
  );
};

export default FaceRecognition;