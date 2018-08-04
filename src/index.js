import React from 'react';
import { render } from 'react-dom';
import Index from './pages/Index';

// HtmlWebpackPlugin WITHOUT template
let root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

render(<Index />, document.getElementById('root'));
