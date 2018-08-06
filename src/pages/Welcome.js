import React from 'react';
import {Button} from 'antd';
import Centered from '../ui/Centered';

const Welcome = () => {
  return (
    <Centered>
      <h1>Welcome!</h1>
      <p>Please, connect your board to USB.</p>
      <p>
        <Button type="primary">Primary</Button>
      </p>
    </Centered>
  );
};

export default Welcome;
