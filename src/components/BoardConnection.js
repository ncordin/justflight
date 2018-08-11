import { Component } from 'react';
import { connect } from 'react-redux';

import board from '../board';
import { connected, disconnected } from '../store/board/board.actions';
import { fetchSettings } from '../store/settings/settings.actions';
import { setCurrentPage } from '../store/navigation/navigation.actions';
import { PAGE_TYPES } from '../constants/navigation.constants';

class BoardConnection extends Component {
  componentDidMount() {
    const { onBoardConnect, onBoardDisconnect } = this.props;

    onBoardDisconnect();

    board.onConnect(() => {
      onBoardConnect();
    });

    board.onUnplugged(() => {
      onBoardDisconnect();
    });
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

const mapDispatchToProps = dispatch => ({
  onBoardConnect: () => {
    dispatch(connected());
    dispatch(fetchSettings());
    dispatch(setCurrentPage(PAGE_TYPES.BOARD));
  },
  onBoardDisconnect: () => {
    dispatch(disconnected());
    dispatch(setCurrentPage(PAGE_TYPES.WELCOME));
  },
});

export default connect(
  null,
  mapDispatchToProps
)(BoardConnection);
