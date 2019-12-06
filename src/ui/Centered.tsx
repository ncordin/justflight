import React from 'react';
import './Centered.css';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Centered = ({ children }: Props) => {
  return (
    <div className="Centered">
      <div className="Centered-item">{children}</div>
    </div>
  );
};

export default Centered;
