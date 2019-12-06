import React, { Component } from 'react';
import { connect } from 'react-redux';

import Board from './Board';
import { fetchBoardDetails } from '../../store/board/board.actions';
import { selectBoardDetails } from '../../store/board/board.selectors';

interface Props {
  fetchIt: () => void;
  details: any;
}

class BoardContainer extends Component<Props> {
  componentDidMount() {
    this.props.fetchIt();
  }

  render() {
    return <Board details={this.props.details} />;
  }
}

const mapStateToProps = state => ({
  details: selectBoardDetails(state),
});

const mapDispatchToProps = dispatch => ({
  fetchIt: () => dispatch(fetchBoardDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);