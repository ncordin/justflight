import React from 'react';
import Centered from '../ui/Centered';
import Logo from '../components/Logo';
import Content from '../components/Content';

import Cloud from '../assets/cloud.svg';

const Welcome = () => {
  return (
    <Content>
      <Centered>
        <h1 className="no-margin">
          <Logo />
        </h1>
        <div className="details">A very simple Betaflight configurator.</div>
        <div style={{ margin: 12 }}>
          <Cloud height={250} />
        </div>
        <h2>Welcome!</h2>
        <p>
          Please, connect a <strong>Betaflight</strong> board to USB.
        </p>
      </Centered>
    </Content>
  );
};

export default Welcome;
