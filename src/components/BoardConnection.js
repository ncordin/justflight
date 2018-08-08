import { Component } from 'react';
import { connect } from 'react-redux';
import board from '../board';
import { connected, disconnected } from '../store/board/board.actions';

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
  onBoardConnect: () => dispatch(connect()),
  onBoardDisconnect: () => dispatch(disconnected())
});

export default connect(
  null,
  mapDispatchToProps
)(BoardConnection);
