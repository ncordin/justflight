import React from 'react';
import IndexPage from './pages/Index';
import Navigation from './components/Navigation';

import 'antd/dist/antd.css';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <IndexPage />
      <div className="App-footer">
        <Navigation />
      </div>
    </div>
  );
};

export default App;
