import React, { useState } from 'react';
import './App.css';
import 'tachyons';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Score from './components/Score/Score';
import Particles from 'react-particles-js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

const app = new Clarifai.App({ apiKey: `895bc9b9b86e488c83833652788078cd` });

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
  const [score, changeScore] = useState(0);
  const [inputValue, changeInputValue] = useState('');
  const [photoUrl, changePhotoUrl] = useState();
  const [photoUrlArray, changePhotoUrlArray] = useState([]);
  const [duplicateUrlError, changeDuplicateUrlError] = useState(false);
  let errorMessage = `Please try a different url...`;

  const handleInputChange = (e) => {
    changeInputValue(e.target.value);
  }


  const onSubmit = () => {

    if (photoUrlArray.includes(inputValue) || !inputValue) {
      console.log(`Duplicate Url or Empty Value Entered`);
      changeDuplicateUrlError(true);
      return;
    } else {
      if (duplicateUrlError) { changeDuplicateUrlError( false) };
      changePhotoUrlArray([...photoUrlArray, inputValue]);
      app.models.predict(Clarifai.FACE_DETECT_MODEL,
        inputValue).then(
          function (response) {
            // do something with response
            changePhotoUrl(inputValue);
            console.log('api response good', response)
            changeScore(score + 1);
          },
          function (err) {
            // there was an error
          }
        );
    }
  }


  return (
    <div className="App">
      <Particles className="particles" params={particleParams} />
      <Navigation />
      <Logo />
      <Score score={score} />
      <ImageLinkForm inputValue={inputValue} onSubmit={onSubmit} handleInputChange={handleInputChange} />
      {duplicateUrlError ? <ErrorMessage message={errorMessage} /> : null}
      <FaceRecognition photoUrl={photoUrl} />
    </div>
  );
}

export default App;
