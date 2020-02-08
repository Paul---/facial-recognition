import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div>
      <p className='f3 b'>{message}</p>
    </div>
  );
};

export default ErrorMessage;
