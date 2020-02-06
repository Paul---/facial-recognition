import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = () => {
  return (
    <div>
      <p className="f3">{`This App will detect the faces in your photos. Why not give it a try?`}</p>
      <div classame="center">
        <div className="center form pa4 br3 shadow-5">
          <input type="text" className="f4 pa2 w-70 " />
          <button className="w-29 grow ma1 f4 link ph3 pv2 dib white bg-light-purple">
            Detect Face
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;