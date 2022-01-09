import React from 'react';
import { ToastPosition, TypeOptions } from '../../types';
import { Default } from '../../utils';
import { ToastContent, Theme } from '../../types';
import { ToastManager as toastManager, Event } from '../../core';
import { Icons } from '../Icons';

export type ToastProps = {
  content: ToastContent;
  id: string;
  type: TypeOptions;
  showIcon: boolean;
  theme: Theme;
  position: ToastPosition;
};

export const Toast = ({
  content,
  id,
  type,
  showIcon,
  theme,
  position,
}: ToastProps) => {
  let divAnimationClassName = `${Default.CSS_NAMESPACE}__slide-inFromRight`;
  let transformClassName = `${Default.CSS_NAMESPACE}__toast__${position}`;
  if (position == 'top-left' || position == 'bottom-left') {
    divAnimationClassName = `${Default.CSS_NAMESPACE}__slide-inFromLeft`;
  }

  const classNames = `${Default.CSS_NAMESPACE}__toast ${Default.CSS_NAMESPACE}__toast--${type} ${divAnimationClassName} ${transformClassName}`;
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
    const toastDiv = document.getElementById(id);
    if (toastDiv) {
      if (position == 'top-right' || position == 'bottom-right') {
        toastDiv.classList.remove(
          `${Default.CSS_NAMESPACE}__slide-inFromRight`
        );
        toastDiv.classList.add(`${Default.CSS_NAMESPACE}__slide-outToRight`);
        toastDiv.style.animation = `${Default.CSS_NAMESPACE}__slide-outToRight 1s ease forwards`;
      } else if (position == 'top-left' || position == 'bottom-left') {
        toastDiv.classList.remove(`${Default.CSS_NAMESPACE}__slide-inFromLeft`);
        toastDiv.classList.add(`${Default.CSS_NAMESPACE}__slide-outToLeft`);
        toastDiv.style.animation = `${Default.CSS_NAMESPACE}__slide-outToLeft .5s ease forwards`;
      }

      // now we can call another setTimeout used to remove the element entirely
      setTimeout(() => {
        console.log(`clearing toast from click with id: ${id}`);
        toastManager.publish(Event.Clear, { id });
      }, 550);
    }
  };

  return (
    <div className={classNames} id={id} onClick={handleRemoveToast}>
      {Icon && (
        <div className={`${Default.CSS_NAMESPACE}__toast-icon`}>{Icon}</div>
      )}
      <div className={`${Default.CSS_NAMESPACE}__toast-message`}>{content}</div>
    </div>
  );
};
