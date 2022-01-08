import React, { useState, useEffect } from 'react';
import { TypeOptions } from '../../src/types';

const types = ['info', 'warning', 'error', 'default', 'dark', 'success'];

import {
  ToastManager as toastManager,
  ToastContainer,
  toast,
} from '../../src/index';

export const ToastDemo = () => {
  const [text, setText] = useState('');
  const [id, setId] = useState('');
  const [type, setType] = useState('info');

  useEffect(() => {
    console.log('running useEffect in demo');
  }, [type]);

  const logCallback = () => {
    console.log('Im saying hello');
  };

  const handleRegister = () => {
    switch (type) {
      case 'success':
        toast.success(text);
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
        toast.error(text);
    }

    setText('');
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
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <ToastContainer />
    </div>
  );
};
