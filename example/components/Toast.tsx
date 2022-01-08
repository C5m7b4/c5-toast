import React, { useState, useEffect } from 'react';

import { PubSub, events, ToastContainer } from '../../src/index';

export const Toast = () => {
  const [text, setText] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {}, [events]);

  const logCallback = () => {
    console.log('Im saying hello');
  };

  const handleRegister = () => {
    const newId = PubSub.add(text, logCallback);
    setId(newId);
    setText('');
  };

  const handleRemove = (id: string) => {
    PubSub.remove(id);
  };

  const handleEmit = () => {
    PubSub.emit('sayHello');
  };

  return (
    <div>
      <div>
        <button onClick={handleRegister}>Register</button>
        <button onClick={handleEmit}>Emit</button>
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
            {e.id} {e.eventName}
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
