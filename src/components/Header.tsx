import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Header = ({ children }: Props) => {
  return (
    <div className="App-header">
      <h1>{children}</h1>
    </div>
  );
};

export default Header;
