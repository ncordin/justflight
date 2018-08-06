import React from 'react';
import {Button} from 'antd';
import Centered from '../../ui/Centered';
import Logo from '../../components/Logo';

import './Navigation.css';

const Navigation = () => {
  return (
    <ul className="Navigation">
      <li className="large"><Logo /></li>
      <li className="active">Home</li>
      <li>Tun</li>
      <li>Conf</li>
      <li>CLI</li>
      <li className="large">
        <Button type="primary">Save</Button>
      </li>
    </ul>
  );
};

export default Navigation;
