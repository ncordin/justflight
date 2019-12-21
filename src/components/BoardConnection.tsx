import { Component } from 'react';
import { connect } from 'react-redux';

import { makeGlobalBoardConnectionAndSetInstance } from 'libs/board';
import { connected, disconnected } from '../store/board/board.actions';
import { fetchSettings } from '../store/settings/settings.actions';
import { setCurrentPage } from '../store/navigation/navigation.actions';
import { PageTypes } from '../constants/navigation.constants';

interface Props {
  onBoardConnect: () => void;
  onBoardDisconnect: () => void;
  children: JSX.Element;
}

const electron = window.require('electron');
const usbModule = electron.remote.require('usb');

class BoardConnection extends Component<Props> {
  componentDidMount() {
    const { onBoardConnect, onBoardDisconnect } = this.props;
    const board = makeGlobalBoardConnectionAndSetInstance({ usbModule });

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
    dispatch(setCurrentPage(PageTypes.Board));
  },
  onBoardDisconnect: () => {
    dispatch(disconnected());
    dispatch(setCurrentPage(PageTypes.Welcome));
  },
});

export default connect(null, mapDispatchToProps)(BoardConnection);
