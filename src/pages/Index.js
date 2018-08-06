import React, { Component } from 'react';
import board from '../board';
import Welcome from './Welcome';
import Cli from './Cli';

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
    return this.state.connected ? <Cli /> : <Welcome />;
  }
}

export default Index;
