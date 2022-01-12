import React, { useState, useEffect } from 'react';
import { AnimationTypes, TypeOptions } from '../../src/types';

import './ToastDemo.css';

const MadButton = () => {
  return (
    <div>
      <h2>This is a really cool toast</h2>
      <p>Here is a paragraph</p>
      <p>
        I'm not going to close on my own, so click me when you are done reading.
      </p>
    </div>
  );
};

const types = ['info', 'warning', 'error', 'default', 'dark', 'success'];
const animations: AnimationTypes[] = [
  'slide',
  'bounce',
  'spin',
  'zoom',
  'flip',
];

import {
  ToastManager as toastManager,
  ToastContainer,
  toast,
} from '../../src/index';

export const ToastDemo = () => {
  const [text, setText] = useState('');
  const [id, setId] = useState('');
  const [type, setType] = useState('info');
  const [autoClose, setAutoClose] = useState(true);
  const [autoCloseDelay, setAutoCloseDelay] = useState(3000);
  const [animation, setAnimation] = useState('slide');
  const [showLastOnTop, setShowLastOnTop] = useState(true);

  useEffect(() => {
    console.log('rerendering demo');
  }, [type, showLastOnTop, autoClose, animation]);

  const logCallback = () => {
    console.log('Im saying hello');
  };

  const madButton = () => {
    toast.success(<MadButton />, {
      autoClose: false,
      showIcon: false,
    });
  };

  const handleRegister = () => {
    switch (type) {
      case 'success':
        toast.success(text, {
          animation: 'zoom',
        });
        break;
      case 'warning':
        toast.warning(text);
        break;
      case 'info':
        toast.info(text);
        break;
      case 'error':
        toast.error(text);
        break;
      case 'dark':
        toast.dark(text);
        break;
      default:
        toast.success(text);
    }

    setText('');
  };

  const capitalize = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <div className="demo-wrapper">
      <div className="toast-types">
        <div className="toast-types-header">Types</div>
        <ul>
          {types.map((option: string, i: number) => {
            return (
              <li key={`type=${option}`}>
                <label htmlFor={option}>
                  <input
                    type="radio"
                    name="type"
                    value={type}
                    onChange={() => setType(option)}
                    checked={option == type}
                  />
                  {option}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="demo-message">
        <label>Message: </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="demo-auto-close">
        <label>Auto Close: </label>
        <input
          type="checkbox"
          checked={autoClose == true}
          onChange={(e) => setAutoClose(e.target.checked)}
        />

        {autoClose && (
          <React.Fragment>
            <br />
            <label>Delay Time: </label>
            <input
              type="number"
              value={autoCloseDelay}
              onChange={(e) => setAutoCloseDelay(+e.target.value)}
            />
          </React.Fragment>
        )}
      </div>
      <div className="demo-animation-type">
        <label>Animation Type: </label>
        <select
          value={animation}
          onChange={(e) => setAnimation(e.target.value)}
        >
          {animations.map((animation, i) => (
            <option key={`animation-${i}`} value={animation}>
              {capitalize(animation)}
            </option>
          ))}
        </select>
      </div>
      <div className="demo-show-last">
        <label>Show last on top</label>
        <input
          type="checkbox"
          checked={showLastOnTop === true}
          onChange={(e) => setShowLastOnTop(e.target.checked)}
        />
      </div>

      <ToastContainer
        autoClose={autoClose}
        autoCloseDelay={autoCloseDelay}
        showIcons={true}
        position="top-right"
        animation={animation as AnimationTypes}
        showLastOnTop={showLastOnTop}
      />
      <div className="demo-buttons">
        <button className="demo-button-show" onClick={handleRegister}>
          RShow Toast
        </button>
        <button className="demo-awesome-button" onClick={madButton}>
          Awesome Button
        </button>
      </div>
    </div>
  );
};
