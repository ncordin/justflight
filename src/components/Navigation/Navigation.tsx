import React, { Component } from 'react';
import { Button, Icon, Badge } from 'antd';

import Logo from '../../components/Logo';
import {
  PAGE_DETAILS,
  PageDetail,
  PageTypes,
} from '../../constants/navigation.constants';

import './Navigation.css';

interface Props {
  currentPage: PageTypes;
  setPage: (type: PageTypes) => void;
  changes: number;
  isSaving: boolean;
  onSave: () => void;
}

class Navigation extends Component<Props> {
  renderTab(page: PageDetail) {
    const { currentPage, setPage } = this.props;

    return (
      <li
        key={page.label}
        onClick={() => setPage(page.type)}
        className={page.type === currentPage ? 'tab active' : 'tab'}
      >
        <Icon type={page.icon} />
      </li>
    );
  }

  render() {
    const { onSave, changes, isSaving } = this.props;
    const navigables = PAGE_DETAILS.filter(details => details.navigation);

    return (
      <ul className="Navigation">
        <li>
          <Logo />
        </li>
        {navigables.map(pageDetails => this.renderTab(pageDetails))}
        <li>
          <Badge count={changes}>
            <Button type="primary" loading={isSaving} onClick={() => onSave()}>
              {!isSaving && 'Save'}
            </Button>
          </Badge>
        </li>
      </ul>
    );
  }
}

export default Navigation;
