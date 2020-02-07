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
import SuccessMessage from './components/SuccessMessage/SuccessMessage';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';


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

const app = new Clarifai.App({ apiKey: `895bc9b9b86e488c83833652788078cd` });

function App() {

  const [score, changeScore] = useState(0);
  const [inputValue, changeInputValue] = useState('');
  const [photoUrl, changePhotoUrl] = useState();
  const [photoUrlArray, changePhotoUrlArray] = useState([]);
  const [duplicateUrlError, changeDuplicateUrlError] = useState(false);
  const [errorMessage, changeErrorMessage] = useState(`There was an error processing your request.`);
  const [searchSuccess, changeSearchSuccess] = useState(false);
  const [addedMorePointsMessage, changePointsMessage] = useState('');
  const [route, changeRoute] = useState('signin');


  const handleRouteChange = (newRoute) => {
    changeRoute(newRoute);
  }

  const handleInputChange = (e) => {
    changeInputValue(e.target.value);
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
          response => {
            const points = response.outputs[0].data.regions.length;
            changePointsMessage(`Good Job. ${points} face${points > 1 ? 's' : ''} detected and added to your score.`);
            changePhotoUrl(inputValue);
            changeScore(score + response.outputs[0].data.regions.length);
            changeSearchSuccess(true);

          },
          err => {
            changeDuplicateUrlError(true);
            changeSearchSuccess(false);
            changeErrorMessage(`There was an error fetching your request...Please try a different url.`);
            changePhotoUrl('');
          }
        );
    }
  }


  return (
    <div className="App">
      <Particles className="particles" params={particleParams} />
      <Navigation handleRouteChange={handleRouteChange} />
      {
        route === 'signin' ?
          <SignIn handleRouteChange={handleRouteChange}/> : route === 'home' ? <>
        <div>
          <Logo />
          <Score score={score} />
          <ImageLinkForm inputValue={inputValue} onSubmit={onSubmit} handleInputChange={handleInputChange} enterKeyPressed={enterKeyPressed} />
          {searchSuccess ?
            <SuccessMessage message={addedMorePointsMessage} />
            : null
          }
          {duplicateUrlError ?
            <ErrorMessage message={errorMessage} />
            : null
          }
          <FaceRecognition photoUrl={photoUrl} />
        </div>
          </> : route === 'register' ?
              <Register handleRouteChange={handleRouteChange}/> :
              null
      }

    </div>
  );
}

export default App;
