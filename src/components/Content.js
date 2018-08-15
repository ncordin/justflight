import React from 'react';
import PropTypes from 'prop-types';

const Content = ({ children, className }) => {
  return <div className={`App-content ${className}`}>{children}</div>;
};

Content.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Content;
