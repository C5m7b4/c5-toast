import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Toast from '../Toast';
import { useToastContainer } from '../../hooks';
import { toastManager, Event } from '../../core';
import { Default } from '../../utils';
import { ToastContainerProps } from '../../interfaces';
import { ToastContent } from '../../../dist';
import { Id, NotValidatedToastProps, ToastProps } from '../../types';

const ToastContainer: React.FC<ToastContainerProps> = (props) => {
  const {
    position = 'top-right',
    autoCloseDelay,
    showIcons,
    theme,
    animation,
    showLastOnTop,
  } = props;

  const { loaded, portalId } = useToastContainer(position);
  const domElement = document.getElementById(portalId);
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  let { autoClose } = props;

  useEffect(() => {}, [toasts]);

  function buildToast(
    content: ToastContent,
    { ...options }: NotValidatedToastProps
  ) {
    let toastList = [...toastManager.getToastList()];
    if (showLastOnTop) {
      toastList = toastList.reverse();
    }
    setToasts(toastList);

    if (options.autoClose === true || options.autoClose === false) {
      autoClose = options.autoClose;
    }

    if (autoClose) {
      setTimeout(() => {
        const toastDiv = document.getElementById(options.toastId as string);
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
            toastManager.publish(Event.Clear, options.toastId);
          }, 550);
        }
      }, autoCloseDelay);
    }
  }

  toastManager.subscribe(Event.Show, buildToast);

  //function removeToast(toastId: Id)
  function removeToast() {
    setToasts(toastManager.getToastList());
  }

  // TODO: we could actually put the toast removal here instead of where we put it below
  // to do so set the argument to removeToast to toastId as Id
  // and add toastId as the argument
  // toastManager.subscribe(Event.Clear, (toastId) => removeToast(toastId as Id));
  toastManager.subscribe(Event.Clear, () => removeToast());

  if (domElement && loaded) {
    return ReactDOM.createPortal(
      <div className={`${Default.CSS_NAMESPACE}__toast-container`}>
        {toasts.map((event: ToastProps, i: number) => {
          return (
            <Toast
              key={`toast-${i}`}
              toastId={event.toastId as Id}
              content={event.content}
              type={event.type}
              showIcon={showIcons}
              theme={theme}
              position={position}
              animation={animation || undefined}
              toastAnimation={event.toastAnimation}
              options={event.options}
              toastShowIcon={event.toastShowIcon}
              toastAutoClose={event.toastAutoClose}
              toastClassName={event.toastClassName}
              toastBodyStyle={event.toastBodyStyle}
            />
          );
        })}
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
