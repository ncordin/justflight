import React, { Component } from 'react';
import board from '../board';
import Welcome from './Welcome';
import Board from './Board';

class Index extends React.Component {
  constructor() {
    super();
    this.state = { connected: false, error: false };
  }

  componentDidMount() {
    board.onConnect(() => {
      this.setState({ connected: true });
    });

    board.onUnplugged(() => {
      this.setState({ connected: false });
    });
  }

  render() {
    return this.state.connected ? <Board /> : <Welcome />;
  }
}

export default Index;
