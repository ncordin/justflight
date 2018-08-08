import React, { Component } from 'react';

import { Button, Icon } from 'antd';
import Logo from '../../components/Logo';
import { PAGE_TYPES } from '../../pages/Index';

import './Navigation.css';

const icons = {
  [PAGE_TYPES.BOARD]: 'qrcode',
  [PAGE_TYPES.TUNNING]: 'rocket',
  [PAGE_TYPES.CONFIG]: 'setting',
  [PAGE_TYPES.CLI]: 'code'
};

class Navigation extends Component {
  renderTab(tab) {
    const { currentPage, setPage } = this.props;

    return (
      <li
        key={tab}
        onClick={() => setPage(tab)}
        className={tab === currentPage ? 'tab active' : 'tab'}
      >
        <Icon type={icons[tab]} />
      </li>
    );
  }
  render() {
    return (
      <ul className="Navigation">
        <li>
          <Logo />
        </li>
        {Object.keys(icons).map(tab => this.renderTab(tab))}
        <li>
          <Button type="primary">Save</Button>
        </li>
      </ul>
    );
  }
}

export default Navigation;
