import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Toast } from '../Toast';
import { useToastContainer } from '../../hooks';
import { ToastManager as toastManager, Event, ToastProps } from '../../core';
import {
  ToastContent,
  ToastPosition,
  TypeOptions,
  Theme,
  AnimationTypes,
} from '../../types';
import { Default } from '../../utils';

export interface ToastContainerProps {
  position: ToastPosition;
  autoClose: boolean;
  autoCloseDelay: number;
  showIcons: boolean;
  theme: Theme;
  animation: AnimationTypes;
  showLastOnTop: boolean;
}

export type OnShowCallback = {
  content: ToastContent;
  id: string;
  type: TypeOptions;
};

const ToastContainer: React.FC<ToastContainerProps> = (props) => {
  const {
    position,
    autoClose,
    autoCloseDelay,
    showIcons,
    theme,
    animation,
    showLastOnTop,
  } = props;
  const { loaded, portalId } = useToastContainer(position);
  const domElement = document.getElementById(portalId);
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  useEffect(() => {
    console.log('rendering toast container');
  }, [toasts]);

  toastManager.subscribe(Event.Show, (toast: OnShowCallback) => {
    console.log(`adding toast from subscripiton: ${toast}`);
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
          const toastDiv = document.getElementById(toast.id);
          if (toastDiv) {
            toastDiv.classList.remove(
              `${Default.CSS_NAMESPACE}__${animation}-enter--${position}`
            );
            toastDiv.classList.add(
              `${Default.CSS_NAMESPACE}__${animation}-exit--${position}`
            );

            toastDiv.style.animationDuration = '1s';
            toastDiv.style.animationFillMode = 'forwards';

            // now we can call another setTimeout used to remove the element entirely
            setTimeout(() => {
              console.log(`auto clearing toast with id: ${toast.id}`);
              toastManager.publish(Event.Clear, { id: toast.id });
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
        {toasts.map((event: any, i: number) => (
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
