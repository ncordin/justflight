import React from 'react';
import PropTypes from 'prop-types';
import './Centered.css';

const Centered = ({ children }) => {
  return (
    <div className="Centered">
      <div className="Centered-item">{children}</div>
    </div>
  );
};

Centered.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Centered;
