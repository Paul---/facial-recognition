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
  const [errorMessage, changeErrorMessage] = useState(`There was an error processing your request.`);
  const [searchSuccess, changeSearchSuccess] = useState(false);
  const [addedMorePointsMessage, changePointsMessage] = useState('');

  //const [box, changeBox] = useState({});

  const handleInputChange = (e) => {
    changeInputValue(e.target.value);
  }
  ///////////////////////////////////////////////////////////////////////////////////////

  // const showFaceBoxes = (boxInfo) => {
  //   changeBox(boxInfo);
  //   console.log('boxInfo', boxInfo)
  //   setTimeout(() => {
  //     console.log('box',box)
  //   },1000)
  // }

  // const findFaces = (data) => {
  //   const ClarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  //   const faceLocationsArray = data.outputs[0].data.regions;
  //   ///////////////////////////////////////////////////////////////////////////////
  //   // faceLocationsArray.map(item => console.log(item.region_info.bounding_box));

  //   const image = async ()  => {
  //     await document.getElementById(`facialImage`);
  //   }
  //   const width = Number(image.width);
  //   const height = Number(image.height);

  //   showFaceBoxes({
  //     leftCol: ClarifaiFace.left_col * width,
  //     topRow: ClarifaiFace.top_row * height,
  //     rightCol: width - (ClarifaiFace.right_col * width),
  //     bottomRow: height - (ClarifaiFace.bottom_row * height)
  //   })
  // }

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
            changePointsMessage(`Good Job. ${points} face${points >1 ? 's': ''} detected and added to your score.`);
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
      <Navigation />
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
  );
}

export default App;
