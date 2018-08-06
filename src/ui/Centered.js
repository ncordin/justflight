import React from 'react';
import './Centered.css'

const Centered = ({children}) => {
  return (
    <div className="Centered">
      <div className="Centered-item">{children}</div>
    </div>
  );
};

export default Centered;
