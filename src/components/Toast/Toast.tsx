import React from 'react';
import { TypeOptions } from '../../types';
import { Default } from '../../utils';

export type ToastProps = {
  content: string;
  id: string;
  type: TypeOptions;
};

export const Toast = ({ content, id, type }: ToastProps) => {
  const classNames = `${Default.CSS_NAMESPACE}__toast ${Default.CSS_NAMESPACE}__toast--${type}`;
  return (
    <div className={classNames} id={id}>
      <div>{content}</div>
    </div>
  );
};
