import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectIsBoardConnected } from '../store/board/board.selectors';
import { selectCurrentPage } from '../store/navigation/navigation.selectors';

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
  CLI: 'cli'
};

class Index extends Component {
  render() {
    const { currentPage } = this.props;

    switch (currentPage) {
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

const mapStateToProps = state => ({
  isConnected: selectIsBoardConnected(state),
  currentPage: selectCurrentPage(state)
});

export default connect(mapStateToProps)(Index);
