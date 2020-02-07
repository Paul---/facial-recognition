import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ handleInputChange, inputValue }) => {
  return (
    <div>
      <p className="f3">{`This App will detect the faces in your photos. Why not give it a try?`}</p>
      <div classame="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            type="text"
            className="f4 pa2 w-70 center"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button className="w-29 grow f4 link ph3 pv2 dib white bg-light-purple">
            Detect Face
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
