import React from 'react';
import './ImageURL.css';

const ImageURL = ({ onInputChange, onButtonSubmit }) => {
  return(
    <div>
      <p className='f3'>
        {'This application will detect faces in your pictures. Give it a url!'}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input onChange={onInputChange} type='text' className='f4 pa2 w-70 center'/>
          <button onClick={onButtonSubmit} className='w-30 grow f4 link ph3 dib white bg-orange'>Detect</button>
        </div>
      </div>
    </div>
  )
}

export default ImageURL;