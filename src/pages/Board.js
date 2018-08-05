import React, { Component } from 'react';
import board from '../board';

class Board extends Component {
  constructor() {
    super();
    this.state = { version: null, response: null };
    this.handleSendClick = this.handleSendClick.bind(this);
    this.inputRef = React.createRef();
  }

  handleSendClick() {
    const command = this.inputRef.current.value;

    board.sendCommand(command).then(response => {
      this.setState({ response });
    });
  }

  componentDidMount() {
    board.sendCommand('version').then(response => {
      this.setState({ response });
    });
  }

  render() {
    return (
      <div>
        <h1>Board is connected!</h1>
        <pre>{this.state.response}</pre>
        <input
          ref={this.inputRef}
          type="text"
          placeholder="Type command here"
        />
        <button onClick={this.handleSendClick}>Send</button>
      </div>
    );
  }
}

export default Board;
