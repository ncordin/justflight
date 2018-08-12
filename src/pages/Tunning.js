import React, { Fragment } from 'react';
import Centered from '../ui/Centered';
import Header from '../components/Header';
import Content from '../components/Content';

const Tunning = () => {
  return (
    <Fragment>
      <Header>Tunning</Header>
      <Content>
        <Centered>
          <p>Rates : [500 - 1200]</p>
          <p>Expo : [ 1 - 10 ]</p>
          <p>Yaw rates : [500 - 1200]</p>
          <p>Yaw expo : [ 1 - 10 ]</p>
          <p>Stick acceleration [1 - 10]</p>
          <p>Stick deceleration [1 - 10]</p>
          <p>Min throttle [4.5 - 10]</p>
          <p>Filters [1 - 5]</p>
        </Centered>
      </Content>
    </Fragment>
  );
};

export default Tunning;
