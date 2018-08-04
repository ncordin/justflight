import React, { Component } from 'react';
import board from '../board';

class Board extends Component {
  constructor() {
    super();
    this.state = { version: null, diff: null };
  }

  componentDidMount() {
    board.sendCommand('version').then(version => {
      this.setState({ version });
      board.sendCommand('diff').then(diff => {
        this.setState({ diff });
      });
    });

    // window.setTimeout(() => {
    //   board.reboot();
    // }, 2000);
  }

  render() {
    return (
      <div>
        <h1>Board is connected!</h1>
        <pre>{this.state.version}</pre>
        <pre>{this.state.diff}</pre>
      </div>
    );
  }
}

export default Board;
