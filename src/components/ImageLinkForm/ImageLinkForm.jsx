import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ handleInputChange, onSubmit, enterKeyPressed }) => {
  
  const submitFunc = (e) => {
    enterKeyPressed(e);
  };

  return (
    <div>
      <p className="f3">{`This App will detect the faces from photos on the internet. You get one point for each face detected.`}</p>
      <p className="f4">{`Why not give it a try?`}</p>
      <div classame="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            type="text"
            className="f4 pa2 w-70 center"
            placeholder={`Type or paste url here.`}
            onChange={handleInputChange}
            onKeyPress={submitFunc}
          />
          <button
            className="w-29 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onSubmit}
          >
            Detect Face
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;