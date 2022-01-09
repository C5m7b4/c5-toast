import React from 'react';
import { TypeOptions } from '../../types';
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
};

export const Toast = ({ content, id, type, showIcon, theme }: ToastProps) => {
  const classNames = `${Default.CSS_NAMESPACE}__toast ${Default.CSS_NAMESPACE}__toast--${type} ${Default.CSS_NAMESPACE}__slide-in`;
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
