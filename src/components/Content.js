import React from 'react';

const Content = ({ children, className }) => {
  return <div className={`App-content ${className}`}>{children}</div>;
};

export default Content;
