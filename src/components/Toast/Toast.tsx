import React from 'react';
import { ToastPosition, TypeOptions } from '../../types';
import { Default } from '../../utils';
import { ToastContent, Theme } from '../../types';
import { ToastManager, Event } from '../../core';
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
  let divAnimationClassName = `${Default.CSS_NAMESPACE}__slide-inFromLeft`;
  let transformClassName = `${Default.CSS_NAMESPACE}__toast__${position}`;

  const classNames = `${Default.CSS_NAMESPACE}__toast ${Default.CSS_NAMESPACE}__toast--${type} ${divAnimationClassName} ${transformClassName}  }`;
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
    ToastManager.publish(Event.Clear, { id });
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
