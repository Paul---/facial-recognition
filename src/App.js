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

const app = new Clarifai.App({ apiKey: `` });

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
  const [errorMessage, changeErrorMessage] = useState(`There was an error processing your request.`);

  const handleInputChange = (e) => {
    changeInputValue(e.target.value);
  }

  const findFaces = (data) => {
    console.log('findfaces', data)
  }

  const enterKeyPressed = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  }

  const onSubmit = () => {
    if (photoUrlArray.includes(inputValue.trim()) || !inputValue) {
      changeDuplicateUrlError(true);
      changeErrorMessage(`That url has alrerady been used. Please try another.`);
      return;
    } else {
      if (duplicateUrlError) { changeDuplicateUrlError(false) };
      changePhotoUrlArray([...photoUrlArray, inputValue]);
      app.models.predict(Clarifai.FACE_DETECT_MODEL,
        inputValue.trim()).then(
          function (response) {
            // do something with response
            changePhotoUrl(inputValue);
            findFaces(response);
            changeScore(score + response.outputs[0].data.regions.length);
            
          },
          function (err) {
            // there was an error
            changeErrorMessage(`There was an error fetching your request...Please try a different url.`);
            changeDuplicateUrlError(true);
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
      <ImageLinkForm inputValue={inputValue} onSubmit={onSubmit} handleInputChange={handleInputChange} enterKeyPressed={enterKeyPressed} />
      {duplicateUrlError ? <ErrorMessage message={errorMessage} /> : null}
      <FaceRecognition photoUrl={photoUrl} />
    </div>
  );
}

export default App;
