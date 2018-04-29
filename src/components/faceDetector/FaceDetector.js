import React from 'react';
import './FaceDetector.css';

const FaceDetector = ({imageURL, box}) => {
  return(
    <div className='center'>
      <div className='absolute pa3'>
        <img id='imageInput' src={imageURL} alt='' height='auto' width='500px'/>
        <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
      </div>
    </div>
  );
}

export default FaceDetector;