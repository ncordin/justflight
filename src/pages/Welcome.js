import React from 'react';
import Centered from '../ui/Centered';
import Logo from '../components/Logo';
import Content from '../components/Content';

import Mosquito from '../assets/mosquito.svg';

const Welcome = () => {
  return (
    <Content>
      <Centered>
        <h1 className="no-margin">
          <Logo />
        </h1>
        <div className="details">A very simple Betaflight configurator.</div>
        <div style={{ margin: 20 }}>
          <Mosquito height={250} />
        </div>
        <h2>Welcome!</h2>
        <p>
          Please, connect your <strong>Betaflight</strong> board to USB.
        </p>
      </Centered>
    </Content>
  );
};

export default Welcome;