import React from 'react';

const Navigation = ({ isSignedIn, onPageChange }) => {

    if (isSignedIn === true) {
      return(
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <p onClick={() => onPageChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
        </nav>
      );
    } else {
      return(
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <p onClick={() => onPageChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
          <p onClick={() => onPageChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
        </nav>
      )
    }
}

export default Navigation;