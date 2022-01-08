import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Toast } from '../Toast';
import { useToastContainer } from '../../hooks';
import {
  ToastManager as toastManager,
  Event,
  ToastProps,
  toastList,
} from '../../core';
import { ToastContent, ToastPosition, TypeOptions } from '../../types';
import { Default } from '../../utils';

export interface ToastContainerProps {
  position: ToastPosition;
}

export type OnShowCallback = {
  content: ToastContent;
  id: string;
  type: TypeOptions;
};

export const ToastContainer = ({ position }: ToastContainerProps) => {
  const { loaded, portalId } = useToastContainer(position);
  const domElement = document.getElementById(portalId);
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  useEffect(() => {
    console.log('rendering toast container');
  }, [toasts]);

  toastManager.subscribe(Event.Show, (toast: OnShowCallback) => {
    console.log(`adding toast from subscripiton: ${toast}`);
    setToasts(toastManager.getToastList());
  });

  toastManager.subscribe(Event.Clear, () => {});

  if (domElement && loaded) {
    return ReactDOM.createPortal(
      <div className={`${Default.CSS_NAMESPACE}__toast-container`}>
        {toasts.map((event: any, i: number) => (
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
