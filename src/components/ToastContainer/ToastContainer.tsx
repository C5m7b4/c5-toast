import React from 'react';
import ReactDOM from 'react-dom';
import { useToastContainer } from '../../hooks';
import { events, PubSubEvent } from '../../core';

const toastContainerStyles = {
  gap: '10px',
  display: 'flex',
  flexDirection: 'column',
};

export const ToastContainer = () => {
  const { loaded, portalId } = useToastContainer();
  const domElement = document.getElementById(portalId);

  if (domElement && loaded) {
    return ReactDOM.createPortal(
      <div>
        {events.map((event: PubSubEvent, i: number) => (
          <div key={`toast-${i}`}>{event.id}</div>
        ))}
      </div>,
      domElement
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
};
