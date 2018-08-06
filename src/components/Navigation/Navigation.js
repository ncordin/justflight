import React from 'react';
import { Button, Icon } from 'antd';
import Logo from '../../components/Logo';

import './Navigation.css';

const Navigation = () => {
  const tabs = ['qrcode', 'rocket', 'setting', 'code'];
  const active = 'qrcode';

  return (
    <ul className="Navigation">
      <li>
        <Logo />
      </li>
      {tabs.map(tab => (
        <li key={tab} className={active === tab ? 'tab active' : 'tab'}>
          <Icon type={tab} />
        </li>
      ))}
      <li>
        <Button type="primary">Save</Button>
      </li>
    </ul>
  );
};

export default Navigation;
