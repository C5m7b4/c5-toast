import React from 'react';
import { render } from 'react-dom';
import { ToastDemo } from './components';

import './index.css';

import '../scss/main.scss';

const App = () => {
  return (
    <div className="gradient-background main-background">
      <h2>Toasts Demo</h2>
      <ToastDemo />
    </div>
  );
};

render(<App />, document.getElementById('root'));
