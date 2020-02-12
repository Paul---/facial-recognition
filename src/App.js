import React, { useState, useEffect } from 'react';
import './App.css';

import 'tachyons';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Score from './components/Score/Score';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import SuccessMessage from './components/SuccessMessage/SuccessMessage';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';


const particleParams = {
  'particles': {
    'number': {
      'value': 70
    },
    'size': {
      'value': 2
    }
  },
  'interactivity': {
    'events': {
      'onhover': {
        'enable': true,
        'mode': 'repulse'
      }
    }
  }
};

const app = new Clarifai.App({ apiKey: `895bc9b9b86e488c83833652788078cd` });

function App() {

  // state hooks
  const [inputValue, changeInputValue] = useState('');
  const [photoUrl, changePhotoUrl] = useState('');
  const [duplicateUrlError, changeDuplicateUrlError] = useState(false);
  const [errorMessage, changeErrorMessage] = useState(`There was an error processing your request.`);
  const [route, changeRoute] = useState('signin');
  const [isSignedIn, changeIsSignedIn] = useState(false);
  const [searchSuccess, changeSearchSuccess] = useState(false);
  const [addedMorePointsMessage, changePointsMessage] = useState('');


  // user specific state hooks
  const [user, changeUser] = useState({});
  const [name, changeName] = useState();
  const [score, changeScore] = useState(0);
  const [photoUrlArray, changePhotoUrlArray] = useState([]);

  const resetUserInfo = () => {
    changePhotoUrl('');
    changePhotoUrlArray([]);
    changeScore(0);
    changeUser({});
    changeName('');
  }

  const loadUserData = (data) => {
    changeUser(data);
    changeName(data.name);
    changePhotoUrlArray(data.photoUrlArray || []);
    changeScore(data.entries);

  }

  const clearMessages = () => {
    changeDuplicateUrlError(false);
    changeSearchSuccess(false);
  }


  // program functions section
  const handleRouteChange = (newRoute) => {
    if (newRoute === 'signin' || newRoute === 'logout') {
      changeIsSignedIn(false);
      resetUserInfo();
      changeRoute('signin');
      clearMessages();
      return;
    } else if (newRoute === 'home' && isSignedIn) {
      // successful signin
      changeScore(user.entries);
      clearMessages();
      return;
    } else if (newRoute === 'register') {
      changeIsSignedIn(false);
      changeUser({});
      changeRoute(newRoute);
      return;
    }
    changeRoute('home');
    changeIsSignedIn(true);
  }

  const handleInputChange = (e) => {
    changeInputValue(e.target.value);
  }

  const enterKeyPressed = (e) => {
    if (e.key === 'Enter') {
      onSubmitUrl();
    }
  }

  const submitUrlPointsToServer = (points) => {
    const { email } = user;
    fetch(`http://localhost:3000/addPoints`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ points, email, inputValue })
    })
  }

  const onSubmitUrl = () => {
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
            submitUrlPointsToServer(points);
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
    <div className='App'>
      <Particles className='particles' params={particleParams} />
      <Navigation handleRouteChange={handleRouteChange} isSignedIn={isSignedIn} />
      {
        route === 'signin' ?
          <SignIn
            handleRouteChange={handleRouteChange}
            loadUserData={loadUserData}
          />
          : route === 'home' ? <>
            <div>
              <Logo />
              <Score score={score} />
              <ImageLinkForm
                inputValue={inputValue}
                name={name}
                onSubmit={onSubmitUrl}
                handleInputChange={handleInputChange}
                enterKeyPressed={enterKeyPressed}
              />
              {searchSuccess ?
                <SuccessMessage
                  message={addedMorePointsMessage}
                />
                : null
              }
              {duplicateUrlError ?
                <ErrorMessage message={errorMessage} />
                : null
              }
              <FaceRecognition photoUrl={photoUrl} />
            </div>
          </> : route === 'register' ?
              <Register handleRouteChange={handleRouteChange} /> :
              null
      }

    </div>
  );
}

export default App;
