import React, { useState, useEffect } from 'react';
import { AnimationTypes, TypeOptions } from '../../src/types';

import './ToastDemo.css';

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
  const [autoClose, setAutoClose] = useState(false);
  const [autoCloseDelay, setAutoCloseDelay] = useState(10000);
  const [animation, setAnimation] = useState('flip');

  useEffect(() => {
    console.log('running useEffect in demo');
  }, [type]);

  const logCallback = () => {
    console.log('Im saying hello');
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
    <div>
      <div>
        <button onClick={handleRegister}>Register</button>
      </div>
      <div>
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
      </div>
      <div>
        <label>Message: </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
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
      <div style={{ marginTop: '10px' }}>
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

      <ToastContainer
        autoClose={autoClose}
        autoCloseDelay={autoCloseDelay}
        showIcons={true}
        position="top-right"
        animation={animation as AnimationTypes}
      />
    </div>
  );
};
