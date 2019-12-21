import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectIsBoardConnected } from '../store/board/board.selectors';
import { selectCurrentPage } from '../store/navigation/navigation.selectors';

import { PageTypes } from '../constants/navigation.constants';
import Welcome from './Welcome';
import Board from './Board';
import Tunning from './Tunning';
import Setup from './Setup';
import Cli from './Cli';

interface Props {
  currentPage: PageTypes;
}

class Index extends Component<Props> {
  render() {
    const { currentPage } = this.props;

    switch (currentPage) {
      case PageTypes.Welcome:
        return <Welcome />;

      case PageTypes.Board:
        return <Board />;

      case PageTypes.Tunning:
        return <Tunning />;

      case PageTypes.Setup:
        return <Setup />;

      case PageTypes.Cli:
        return <Cli />;
    }
  }
}

const mapStateToProps = state => ({
  isConnected: selectIsBoardConnected(state),
  currentPage: selectCurrentPage(state),
});

export default connect(mapStateToProps)(Index);
