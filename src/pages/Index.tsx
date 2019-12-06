import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectIsBoardConnected } from '../store/board/board.selectors';
import { selectCurrentPage } from '../store/navigation/navigation.selectors';

import { PAGE_TYPES } from '../constants/navigation.constants';
import Welcome from './Welcome';
import Board from './Board';
import Tunning from './Tunning';
import Setup from './Setup';
import Cli from './Cli';

interface Props {
  currentPage: string;
}

class Index extends Component<Props> {
  render() {
    const { currentPage } = this.props;

    switch (currentPage) {
      case PAGE_TYPES.WELCOME:
        return <Welcome />;

      case PAGE_TYPES.BOARD:
        return <Board />;

      case PAGE_TYPES.TUNNING:
        return <Tunning />;

      case PAGE_TYPES.SETUP:
        return <Setup />;

      case PAGE_TYPES.CLI:
        return <Cli />;

      default:
        return <Welcome />;
    }
  }
}

const mapStateToProps = state => ({
  isConnected: selectIsBoardConnected(state),
  currentPage: selectCurrentPage(state),
});

export default connect(mapStateToProps)(Index);
