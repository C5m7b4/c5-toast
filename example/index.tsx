import React from 'react';
import { render } from 'react-dom';
import { Toast } from './components';

const App = () => {
  return (
    <div>
      <h2>Toasts</h2>
      <Toast />
    </div>
  );
};

render(<App />, document.getElementById('root'));
