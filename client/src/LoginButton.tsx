import React from 'react';
import axios from 'axios';

function LoginButton() {
  const handleClick = () => {
    axios.get('/auth/google').catch((err) => console.error(err));
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
