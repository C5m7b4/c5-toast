import React, { useState, useEffect } from 'react';
import { TypeOptions } from '../../src/types';

const types = ['info', 'warning', 'error', 'default', 'dark', 'success'];

import {
  ToastManager as toastManager,
  events,
  ToastContainer,
} from '../../src/index';

export const ToastDemo = () => {
  const [text, setText] = useState('');
  const [id, setId] = useState('');
  const [type, setType] = useState('info');

  useEffect(() => {}, [events, type]);

  const logCallback = () => {
    console.log('Im saying hello');
  };

  const handleRegister = () => {
    const newId = toastManager.add(text, type as TypeOptions, logCallback);
    setId(newId);
    setText('');
  };

  const handleRemove = (id: string) => {
    toastManager.remove(id);
  };

  const handleEmit = () => {
    toastManager.emit('sayHello');
  };

  return (
    <div>
      <div>
        <button onClick={handleRegister}>Register</button>
        <button onClick={handleEmit}>Emit</button>
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

      <div>
        {events.map((e, i) => (
          <div style={{ marginTop: '10px' }} key={i}>
            {e.id} {e.content}
            <span
              style={{ marginLeft: '10px', cursor: 'pointer' }}
              onClick={() => handleRemove(e.id)}
            >
              X
            </span>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};
