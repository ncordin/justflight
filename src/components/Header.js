import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ children }) => {
  return (
    <div className="App-header">
      <h1>{children}</h1>
    </div>
  );
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
