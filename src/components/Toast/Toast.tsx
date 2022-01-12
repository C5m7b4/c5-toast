import React from 'react';
import { Default } from '../../utils';
import { toastManager, Event } from '../../core';
import { Icons } from '../Icons';
import { AnimationTypes, ToastProps } from '../../types';

const Toast: React.FC<ToastProps> = (props) => {
  const {
    content,
    toastId,
    type,
    theme = 'light',
    position = 'top-right',
    toastAnimation,
    toastShowIcon,
  } = props;
  let { animation = 'slide', showIcon = false } = props;

  if (toastAnimation) {
    animation = toastAnimation as AnimationTypes;
  }
  if (toastShowIcon === true || toastShowIcon === false) {
    showIcon = toastShowIcon;
  }
  const divAnimationClassName = `${Default.CSS_NAMESPACE}__${animation}-enter--${position}`;

  const classNames = `${Default.CSS_NAMESPACE}__toast ${Default.CSS_NAMESPACE}__toast--${type} ${divAnimationClassName}`;
  const maybeIcon = Icons[type as keyof typeof Icons];
  const iconProps = { theme, type };
  let Icon: React.ReactNode = maybeIcon && maybeIcon(iconProps);

  if (showIcon === false) {
    Icon = void 0;
  } else if (type === 'info') {
    Icon = Icons.info(iconProps);
  } else if (type === 'success') {
    Icon = Icons.success(iconProps);
  } else if (type === 'error') {
    Icon = Icons.error(iconProps);
  } else if (type === 'warning') {
    Icon = Icons.warning(iconProps);
  }

  const handleRemoveToast = () => {
    const toastDiv = document.getElementById(toastId as string);
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
        toastManager.publish(Event.Clear, toastId);
      }, 1000);
    }
  };

  return (
    <div
      className={classNames}
      id={toastId as string}
      onClick={handleRemoveToast}
      role="main"
    >
      {Icon && (
        <div className={`${Default.CSS_NAMESPACE}__toast-icon`}>{Icon}</div>
      )}
      <div className={`${Default.CSS_NAMESPACE}__toast-message`}>{content}</div>
    </div>
  );
};

export default Toast;
