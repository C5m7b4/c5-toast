import React from 'react';
import ReactDOM from 'react-dom';
import { Toast } from '../Toast';
import { useToastContainer } from '../../hooks';
import { events, ToastManagerEvent } from '../../core';
import { ToastPosition } from '../../types';
import { Default } from '../../utils';

export interface ToastContainerProps {
  position: ToastPosition;
}

export const ToastContainer = ({ position }: ToastContainerProps) => {
  const { loaded, portalId } = useToastContainer(position);
  const domElement = document.getElementById(portalId);

  if (domElement && loaded) {
    return ReactDOM.createPortal(
      <div className={`${Default.CSS_NAMESPACE}__toast-container`}>
        {events.map((event: ToastManagerEvent, i: number) => (
          <Toast
            key={`toast-${i}`}
            id={event.id}
            content={event.content}
            type={event.type}
          />
        ))}
      </div>,
      domElement
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
};

ToastContainer.defaultProps = {
  position: 'top-right',
};
