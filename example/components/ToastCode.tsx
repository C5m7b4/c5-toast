import React from 'react';
import { AnimationTypes, TypeOptions } from '../../src';

function getType(type: string) {
  switch (type) {
    case 'default':
    default:
      return 'toast';
    case 'success':
      return (
        <React.Fragment>
          <span className="code__component">toast</span>
          <span>.</span>
          <span className="code__method">success</span>
        </React.Fragment>
      );
    case 'error':
      return (
        <React.Fragment>
          <span className="code__component">toast</span>
          <span>.</span>
          <span className="code__method">error</span>
        </React.Fragment>
      );
    case 'info':
      return (
        <React.Fragment>
          <span className="code__component">toast</span>
          <span>.</span>
          <span className="code__method">info</span>
        </React.Fragment>
      );
    case 'warning':
      return (
        <React.Fragment>
          <span className="code__component">toast</span>
          <span>.</span>
          <span className="code__method">warning</span>
        </React.Fragment>
      );
    case 'dark':
      return (
        <React.Fragment>
          <span className="code__component">toast</span>
          <span>.</span>
          <span className="code__method">dark</span>
        </React.Fragment>
      );
  }
}

export interface ToastCodeProps {
  type: TypeOptions;
  text: string;
  toastAutoClose: boolean;
  toastShowIcon: boolean;
  toastAnimation: AnimationTypes;
  showIcons: boolean; // this is from the maint toast component
  autoClose: boolean;
  animation: AnimationTypes;
}

export const ToastCode: React.FC<ToastCodeProps> = ({
  type = 'success',
  text = 'Super super slick!',
  toastAutoClose,
  toastShowIcon,
  toastAnimation,
  showIcons,
  autoClose,
  animation,
}) => {
  let isDefaults = false;
  if (
    toastAutoClose === autoClose &&
    toastShowIcon === showIcons &&
    toastAnimation === animation
  ) {
    isDefaults = true;
  }
  return (
    <div className="toast-code">
      <h3>Toast Code</h3>
      {isDefaults ? (
        <div className="code">
          <div>
            <span className="code__component">{getType(type)}</span>
            <span>(</span>
            <span className="code__component">{`'🙈 ${text}')`}</span>
          </div>
        </div>
      ) : (
        <div className="code">
          <div>
            <span className="code__component">{getType(type)}</span>
            <span>(</span>
            <span className="code__component">{`'🙈 ${text}'`}</span>
            <span>), &#123;</span>
          </div>
          <div>
            <span className="code__parameter">autoClose</span>
            <span className="code__value">{`=${
              toastAutoClose ? '{true}' : '{false}'
            }`}</span>
          </div>
          <div>
            <span className="code__parameter">showIcon</span>
            <span className="code__value">{`=${
              toastShowIcon ? '{true}' : '{false}'
            }`}</span>
          </div>
          <div>
            <span className="code__parameter">animation</span>
            <span className="code__value">{`={'${toastAnimation}'}`}</span>
          </div>

          <div>{`});`}</div>
        </div>
      )}
    </div>
  );
};
