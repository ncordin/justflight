import React from 'react';
import Centered from '../ui/Centered';
import Logo from '../components/Logo';
import Content from '../components/Content';

import Mosquito from '../assets/mosquito.svg';

const Welcome = () => {
  return (
    <Content>
      <Centered>
        <h1>
          <Logo />
        </h1>
        A very simple Betaflight configurator.
        <div style={{ margin: 20 }}>
          <Mosquito height={200} />
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
