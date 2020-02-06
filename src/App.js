import React from 'react';
import './App.css';
import 'tachyons';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js'



function App() {
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
  
  return (
    <div className="App">
      <Particles className="particles" params={particleParams}/>
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
    </div>
  );
}

export default App;
