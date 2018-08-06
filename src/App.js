import React, { Component } from 'react';
import IndexPage, { PAGE_TYPES } from './pages/Index';
import Navigation from './components/Navigation';
import board from './board';

import 'antd/dist/antd.css';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { connected: false, page: PAGE_TYPES.WELCOME };
    this.setPage = this.setPage.bind(this);
  }

  componentDidMount() {
    board.onConnect(() => {
      this.setState({ connected: true, page: PAGE_TYPES.CLI });
    });

    board.onUnplugged(() => {
      this.setState({ connected: false, page: PAGE_TYPES.WELCOME });
    });
  }

  setPage(page) {
    if (this.state.connected || page === PAGE_TYPES.WELCOME) {
      this.setState({ page });
    }
  }

  render() {
    const { page } = this.state;

    return (
      <div className="App">
        <IndexPage page={page} />
        <div className="App-footer">
          <Navigation page={page} setPage={this.setPage} />
        </div>
      </div>
    );
  }
}

export default App;
