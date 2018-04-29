import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png'

const Logo = () => {
  return (
    <div className='white pl3'>
      <Tilt className="Tilt shadow-2" options={{ max : 40 }} style={{ height: 150, width: 150 }} >
       <div className="Tilt-inner">
         <img style={{paddingTop: '20px'}} alt="brain" src={brain}/>
       </div>
      </Tilt>
    </div>
  );
}

export default Logo;