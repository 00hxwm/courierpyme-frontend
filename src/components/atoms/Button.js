import React from 'react';

function Button({ text, variant = 'primary', onClick, type = 'button' }) {
  return (
    <button 
      className={`btn btn-${variant}`} 
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}

export default Button;