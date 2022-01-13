import React from 'react';
import { AnimationTypes } from '../../src';

interface ToastSpecificProps {
  toastAutoClose: boolean;
  setToastAutoClose: (e: boolean) => void;
  toastShowIcon: boolean;
  setToastShowIcon: (e: boolean) => void;
  toastAnimation: AnimationTypes;
  setToastAnimation: (e: AnimationTypes) => void;
  animations: AnimationTypes[];
  capitalize: (e: string) => string;
}

export const ToastSpecific: React.FC<ToastSpecificProps> = ({
  toastAutoClose,
  setToastAutoClose,
  toastShowIcon,
  setToastShowIcon,
  toastAnimation,
  setToastAnimation,
  animations,
  capitalize,
}) => {
  return (
    <div className="toast-specific">
      <h2>Toast Specifics</h2>
      <div className="demo-auto-close glassMorphism">
        <label htmlFor="toastAutoClose">Auto Close</label>
        <input
          type="checkbox"
          name="toastAutoClose"
          checked={toastAutoClose === true}
          onChange={(e) => setToastAutoClose(e.target.checked)}
        />
      </div>
      <div className="demo-show-icons glassMorphism">
        <label htmlFor="toastShowIcon">Show Icon</label>
        <input
          type="checkbox"
          name="toastShowIcon"
          checked={toastShowIcon === true}
          onChange={(e) => setToastShowIcon(e.target.checked)}
        />
      </div>
      <div className="demo-animation-type glassMorphism">
        <label htmlFor="toastanimation">Animation Type: </label>
        <select
          value={toastAnimation}
          name="toastanimation"
          onChange={(e) => setToastAnimation(e.target.value as AnimationTypes)}
        >
          {animations.map((animation, i) => (
            <option key={`animation-${i}`} value={animation}>
              {capitalize(animation)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
