import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import Logo from '../../components/Logo';
import { PAGE_TYPES } from '../../pages/Index';

import './Navigation.css';

const icons = {
  [PAGE_TYPES.BOARD]: 'qrcode',
  [PAGE_TYPES.TUNNING]: 'rocket',
  [PAGE_TYPES.CONFIG]: 'setting',
  [PAGE_TYPES.CLI]: 'code',
};

class Navigation extends Component {
  renderTab(page, active) {
    const { setPage } = this.props;

    return (
      <li
        key={page}
        onClick={() => setPage(page)}
        className={page === active ? 'tab active' : 'tab'}
      >
        <Icon type={icons[page]} />
      </li>
    );
  }
  render() {
    const activePage = this.props.page;

    return (
      <ul className="Navigation">
        <li>
          <Logo />
        </li>
        {Object.keys(icons).map(pageType =>
          this.renderTab(pageType, activePage),
        )}
        <li>
          <Button type="primary">Save</Button>
        </li>
      </ul>
    );
  }
}

export default Navigation;
