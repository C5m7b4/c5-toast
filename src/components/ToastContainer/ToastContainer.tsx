import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Toast from '../Toast';
import { useToastContainer } from '../../hooks';
import { ToastManager as toastManager, Event } from '../../core';
import { Default } from '../../utils';
import {
  CoreToastProps,
  ToastContainerProps,
  ToastManagerToastProps,
} from '../../interfaces';
import { OnShowCallback } from '../../types';

const ToastContainer: React.FC<ToastContainerProps> = (props) => {
  const {
    position = 'top-right',
    autoClose,
    autoCloseDelay,
    showIcons,
    theme,
    animation,
    showLastOnTop,
  } = props;
  const { loaded, portalId } = useToastContainer(position);
  const domElement = document.getElementById(portalId);
  const [toasts, setToasts] = useState<ToastManagerToastProps[]>([]);

  useEffect(() => {}, [toasts]);

  toastManager.subscribe(Event.Show, (toast: CoreToastProps) => {
    let toastList = [...toastManager.getToastList()];
    if (showLastOnTop) {
      toastList = toastList.reverse();
    }
    setToasts(toastList);

    if (autoClose) {
      setTimeout(() => {
        // if we use the id of the div, we can change the classname to slide-out
        // then wait the appropriate amount of time
        // and them remove the element
        if (toast) {
          const toastDiv = document.getElementById(toast.id as string);
          if (toastDiv) {
            toastDiv.classList.remove(
              `${Default.CSS_NAMESPACE}__${animation}-enter--${position}`
            );
            toastDiv.classList.add(
              `${Default.CSS_NAMESPACE}__${animation}-exit--${position}`
            );

            toastDiv.style.animationDuration = '1s';
            toastDiv.style.animationFillMode = 'forwards';

            // TODO: Remove the error type!!
            // now we can call another setTimeout used to remove the element entirely
            setTimeout(() => {
              toastManager.publish(Event.Clear, {
                id: toast.id,
                content: '',
                type: 'error',
              });
            }, 550);
          }
        }
      }, autoCloseDelay);
    }
  });

  toastManager.subscribe(Event.Clear, (toast: OnShowCallback) => {
    console.log(`removing toast: ${toast.id}`);
    setToasts(toastManager.getToastList());
  });

  if (domElement && loaded) {
    return ReactDOM.createPortal(
      <div className={`${Default.CSS_NAMESPACE}__toast-container`}>
        {toasts.map((event: OnShowCallback, i: number) => (
          <Toast
            key={`toast-${i}`}
            id={event.id}
            content={event.content}
            type={event.type}
            showIcon={showIcons}
            theme={theme}
            position={position}
            animation={animation}
            toastAnimation={event.toastAnimation}
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
  autoClose: true,
  autoCloseDelay: 10000,
  showIcons: false,
  theme: 'dark',
  showLastOnTop: false,
};

export default ToastContainer;
