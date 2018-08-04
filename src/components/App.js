import React, { Component } from 'react';
import board from '../board';

class App extends React.Component {
  componentDidMount() {
    board.onConnect(() => {
      console.log('Hey :)');
      board.sendCommand('version').then(response => {
        console.log(response);
      });
    });

    board.onUnplugged(() => {
      console.log('Bye bye...');
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, Electron!</h1>
        <p>Ready to fly?</p>
      </div>
    );
  }
}

export default App;
