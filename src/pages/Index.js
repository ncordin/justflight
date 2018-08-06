import React, { Component } from 'react';
import Welcome from './Welcome';
import Board from './Board';
import Tunning from './Tunning';
import Config from './Config';
import Cli from './Cli';

export const PAGE_TYPES = {
  WELCOME: 'welcome',
  BOARD: 'board',
  TUNNING: 'tunning',
  CONFIG: 'config',
  CLI: 'cli',
};

class Index extends React.Component {
  render() {
    switch (this.props.page) {
      case PAGE_TYPES.WELCOME:
        return <Welcome />;

      case PAGE_TYPES.BOARD:
        return <Board />;

      case PAGE_TYPES.TUNNING:
        return <Tunning />;

      case PAGE_TYPES.CONFIG:
        return <Config />;

      case PAGE_TYPES.CLI:
        return <Cli />;

      default:
        return <Welcome />;
    }
  }
}

export default Index;
