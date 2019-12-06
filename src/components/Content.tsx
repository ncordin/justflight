import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Content = ({ children, className }: Props) => {
  return <div className={`App-content ${className}`}>{children}</div>;
};

export default Content;
