import React from 'react';
import axios from 'axios';

function LoginButton() {
  const handleClick = () => {
    axios
      .get('/auth/google')
      .catch((err) => console.error('Error in LoginButton', err));
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Login
      </button>
    </div>
  );
}

export default LoginButton;
