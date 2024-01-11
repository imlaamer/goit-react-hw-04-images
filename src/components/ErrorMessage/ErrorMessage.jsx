import React from 'react';

const ErrorMessage = ({ error }) => {
  return (
    <p style={{ textAlign: 'center' }}>Oops! Something went wrong... {error}</p>
  );
};

export default ErrorMessage;
