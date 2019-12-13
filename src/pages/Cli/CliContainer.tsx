import React, { Component } from 'react';
import { getGlobalBoardConnectionInstance } from 'libs/board';
import Cli from './Cli';

class CliContainer extends Component {
  state = { response: null };

  onSubmit = command => {
    getGlobalBoardConnectionInstance()
      .sendCommand(command)
      .then(response => {
        this.setState({ response });
      });
  };

  componentDidMount() {
    getGlobalBoardConnectionInstance()
      .sendCommand('version')
      .then(response => {
        this.setState({ response });
      });
  }

  formatResponse() {
    const response = this.state.response || '';

    // We slice first line because it is the command.
    // And the last because it is a # character.
    return response
      .split('\n')
      .slice(1, -1)
      .map((line, index) => <div key={index}>{line}</div>);
  }

  render() {
    return <Cli response={this.formatResponse()} onSubmit={this.onSubmit} />;
  }
}

export default CliContainer;
