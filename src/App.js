import React, { useState, useEffect } from 'react';
import './App.css';
import 'tachyons';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js'

const particleParams = {

  "particles": {
    "number": {
      "value": 70
    },
    "size": {
      "value": 2
    }
  },
  "interactivity": {
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      }
    }
  }

};


function App() {

  const [inputValue, changeInputValue] = useState("");
  useEffect(() => {
    console.log(inputValue)
  })
  
  const handleInputChange = (e) => {
    changeInputValue(e.target.value);
  }
  


  return (
    <div className="App">
      <Particles className="particles" params={particleParams} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm inputValue={inputValue} handleInputChange={handleInputChange} />
    </div>
  );
}

export default App;
