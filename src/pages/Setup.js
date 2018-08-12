import React, { Fragment } from 'react';
import Centered from '../ui/Centered';
import Header from '../components/Header';
import Content from '../components/Content';

const Setup = () => {
  return (
    <Fragment>
      <Header>Setup</Header>
      <Content>
        <Centered>
          <p>Receiver port [ 1 / 2 / 3 ]</p>
          <p>Protocol [IBUS / SBUS]</p>
          <p>ARM channel [1 - 3]</p>
          <p>Min voltage [3.1 - 3.6] </p>
          <p>Prop direction [ normal / inversed]</p>
          <p>Rssi & Smart audio ?</p>
        </Centered>
      </Content>
    </Fragment>
  );
};

export default Setup;
