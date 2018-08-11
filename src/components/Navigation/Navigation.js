import React, { Component } from 'react';
import { Button, Icon } from 'antd';

import Logo from '../../components/Logo';
import { PAGE_DETAILS } from '../../constants/navigation.constants';

import './Navigation.css';

const findIn = (object, test) => {
  const keys = Object.keys(object);
  const values = keys.map(key => object[key]);

  return values.filter(test);
};

class Navigation extends Component {
  renderTab(page) {
    const { currentPage, setPage } = this.props;

    return (
      <li
        key={page.name}
        onClick={() => setPage(page.name)}
        className={page.name === currentPage ? 'tab active' : 'tab'}
      >
        <Icon type={page.icon} />
      </li>
    );
  }

  render() {
    const { onSave } = this.props;
    const pages = findIn(PAGE_DETAILS, details => details.navigation);

    return (
      <ul className="Navigation">
        <li>
          <Logo />
        </li>
        {pages.map(page => this.renderTab(page))}
        <li>
          <Button type="primary" onClick={() => onSave()}>
            Save
          </Button>
        </li>
      </ul>
    );
  }
}

export default Navigation;
