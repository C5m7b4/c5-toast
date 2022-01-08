import React from 'react';
import { TypeOptions } from '../../types';
import { Default } from '../../utils';
import { ToastContent } from '../../types';
import { ToastManager, Event } from '../../core';

export type ToastProps = {
  content: ToastContent;
  id: string;
  type: TypeOptions;
};

export const Toast = ({ content, id, type }: ToastProps) => {
  const classNames = `${Default.CSS_NAMESPACE}__toast ${Default.CSS_NAMESPACE}__toast--${type}`;

  const handleRemoveToast = () => {
    ToastManager.publish(Event.Clear, { id });
  };
  return (
    <div className={classNames} id={id} onClick={handleRemoveToast}>
      <div>{content}</div>
    </div>
  );
};
