import React from 'react';
import { Provider } from 'react-redux';

import { configureStore } from './store';
import BoardConnection from './components/BoardConnection';
import IndexPage from './pages/Index';
import Navigation from './components/Navigation';

import 'antd/dist/antd.css';
import './App.css';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <BoardConnection>
      <div className="App">
        <IndexPage />
        <div className="App-footer">
          <Navigation />
        </div>
      </div>
    </BoardConnection>
  </Provider>
);

export default App;
