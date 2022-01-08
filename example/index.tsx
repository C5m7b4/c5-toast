import React from 'react';
import { render } from 'react-dom';
import { ToastDemo } from './components';

import '../scss/main.scss';

const App = () => {
  return (
    <div>
      <h2>Toasts</h2>
      <ToastDemo />
    </div>
  );
};

render(<App />, document.getElementById('root'));
