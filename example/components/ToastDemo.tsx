import React, { useState, useEffect } from 'react';
import { AnimationTypes, ToastPosition, TypeOptions } from '../../src/types';
import { ContainerCode } from './ContainerCode';
import { ToastCode } from './ToastCode';

import './ToastDemo.css';

const emojis = ['😎', '😵', '🤳', '🐱‍🏍', '🤺', '👹', '🤿', '🩺'];

const getRandomEmoji = () => emojis[Math.floor(Math.random() * emojis.length)];

const MadButton = () => {
  return (
    <div>
      <h2>This is a really cool toast</h2>
      <p>Here is a paragraph</p>
      <p>
        I'm not going to close on my own, so click me when you are done reading.
      </p>
    </div>
  );
};

const types = ['info', 'warning', 'error', 'default', 'dark', 'success'];
const animations: AnimationTypes[] = [
  'slide',
  'bounce',
  'spin',
  'zoom',
  'flip',
];
const positions: ToastPosition[] = [
  'top-right',
  'top-center',
  'top-left',
  'bottom-right',
  'bottom-center',
  'bottom-left',
];

import {
  ToastManager as toastManager,
  ToastContainer,
  toast,
} from '../../src/index';

export const ToastDemo = () => {
  const [text, setText] = useState('');
  const [id, setId] = useState('');
  const [type, setType] = useState('info');
  const [autoClose, setAutoClose] = useState(true);
  const [autoCloseDelay, setAutoCloseDelay] = useState(3000);
  const [animation, setAnimation] = useState<AnimationTypes>('slide');
  const [showLastOnTop, setShowLastOnTop] = useState(true);
  const [showIcons, setShowIcons] = useState(true);

  const [toastAutoClose, setToastAutoClose] = useState(true);
  const [toastShowIcon, setToastShowIcon] = useState(true);
  const [toastAnimation, setToastAnimation] = useState<AnimationTypes>('slide');

  useEffect(() => {
    console.log('rerendering demo');
  }, [
    type,
    showLastOnTop,
    autoClose,
    animation,
    showIcons,
    toastAutoClose,
    toastShowIcon,
  ]);

  const logCallback = () => {
    console.log('Im saying hello');
  };

  const madButton = () => {
    toast.success(<MadButton />, {
      autoClose: false,
      showIcon: false,
    });
  };

  const handleRegister = () => {
    let anim = animation;
    if (toastAnimation !== animation) {
      anim = toastAnimation;
    }

    let ac = autoClose;
    if (toastAutoClose !== autoClose) {
      ac = toastAutoClose;
    }

    let si = showIcons;
    if (toastShowIcon !== showIcons) {
      si = toastShowIcon;
    }

    const options = {
      animation: anim,
      autoClose: ac,
      showIcon: si,
    };
    switch (type) {
      case 'success':
        toast.success(text, options);
        break;
      case 'warning':
        toast.warning(text, options);
        break;
      case 'info':
        toast.info(text, options);
        break;
      case 'error':
        toast.error(text, options);
        break;
      case 'dark':
        toast.dark(text, options);
        break;
      default:
        toast.success(text, options);
    }

    setText('');
  };

  const capitalize = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <div className="demo-wrapper">
      <div className="demo-code">
        <ContainerCode
          position="top-right"
          autoClose={autoClose}
          isDefaultProps={false}
          autoCloseDelay={autoCloseDelay}
          showLastOnTop={showLastOnTop}
          showIcons={showIcons}
          animation={animation}
        />
        <ToastCode
          type={type as TypeOptions}
          text={text}
          toastAutoClose={toastAutoClose}
          toastShowIcon={toastShowIcon}
          toastAnimation={toastAnimation}
          showIcons={showIcons}
          autoClose={autoClose}
          animation={animation}
        />
      </div>
      <div className="toast-types">
        <div className="toast-types-header">Types</div>
        <div className="toast-types-list">
          <ul>
            {types.map((option: string, i: number) => {
              return (
                <li key={`type=${option}`}>
                  <label htmlFor={option}>
                    <input
                      type="radio"
                      name="type"
                      value={type}
                      onChange={() => setType(option)}
                      checked={option == type}
                    />
                    {option} {getRandomEmoji()}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="demo-message">
        <label>Message: </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="demo-position">
        <label>Position: </label>
        <select>
          {positions.map((pos: ToastPosition, i: number) => (
            <option key={`pos-${i}`} value={pos}>
              {pos.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      <div className="specifics">
        <div className="container-specific">
          <h2>Container Specifics</h2>
          <div className="demo-auto-close">
            <label>Auto Close: </label>
            <input
              type="checkbox"
              checked={autoClose == true}
              onChange={(e) => setAutoClose(e.target.checked)}
            />

            {autoClose && (
              <React.Fragment>
                <br />
                <label>Delay Time: </label>
                <input
                  type="number"
                  value={autoCloseDelay}
                  onChange={(e) => setAutoCloseDelay(+e.target.value)}
                />
              </React.Fragment>
            )}
          </div>
          <div className="demo-animation-type">
            <label>Animation Type: </label>
            <select
              value={animation}
              onChange={(e) => setAnimation(e.target.value as AnimationTypes)}
            >
              {animations.map((animation, i) => (
                <option key={`animation-${i}`} value={animation}>
                  {capitalize(animation)}
                </option>
              ))}
            </select>
          </div>
          <div className="demo-show-last">
            <label>Show last on top</label>
            <input
              type="checkbox"
              checked={showLastOnTop === true}
              onChange={(e) => setShowLastOnTop(e.target.checked)}
            />
          </div>
          <div className="demo-show-icons">
            <label>Show Icons</label>
            <input
              type="checkbox"
              checked={showIcons === true}
              onChange={(e) => setShowIcons(e.target.checked)}
            />
          </div>
        </div>
        <div className="toast-specific">
          <h2>Toast Specifics</h2>
          <div className="demo-auto-close">
            <label htmlFor="toastAutoClose">Auto Close</label>
            <input
              type="checkbox"
              name="toastAutoClose"
              checked={toastAutoClose === true}
              onChange={(e) => setToastAutoClose(e.target.checked)}
            />
          </div>
          <div className="demo-show-icons">
            <label htmlFor="toastShowIcon">Show Icon</label>
            <input
              type="checkbox"
              name="toastShowIcon"
              checked={toastShowIcon === true}
              onChange={(e) => setToastShowIcon(e.target.checked)}
            />
          </div>
          <div className="demo-animation-type">
            <label>Animation Type: </label>
            <select
              value={toastAnimation}
              onChange={(e) =>
                setToastAnimation(e.target.value as AnimationTypes)
              }
            >
              {animations.map((animation, i) => (
                <option key={`animation-${i}`} value={animation}>
                  {capitalize(animation)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <ToastContainer
        autoClose={autoClose}
        autoCloseDelay={autoCloseDelay}
        showIcons={true}
        position="top-right"
        animation={animation as AnimationTypes}
        showLastOnTop={showLastOnTop}
      />
      <div className="demo-buttons">
        <button className="demo-button-show" onClick={handleRegister}>
          Show Toast
        </button>
        <button className="demo-awesome-button" onClick={madButton}>
          Awesome Button
        </button>
      </div>
    </div>
  );
};
