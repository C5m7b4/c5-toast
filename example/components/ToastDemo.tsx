import React, { useState, useEffect } from 'react';
import { AnimationTypes, ToastPosition, TypeOptions } from '../../src/types';
import { ContainerCode } from './ContainerCode';
import { ToastCode } from './ToastCode';
import { MadButton } from './MadButton';

import './ToastDemo.css';

type TypeTypes = {
  type: string;
  emoji: string;
};

type TypeTypeArray = TypeTypes[];

const types: TypeTypeArray = [
  { type: 'info', emoji: '🚀' },
  { type: 'warning', emoji: '💀' },
  { type: 'error', emoji: '😡' },
  { type: 'default', emoji: '🥱' },
  { type: 'dark', emoji: '💩' },
  { type: 'success', emoji: '👑' },
];

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

import { ToastContainer, toast } from '../../src/index';
import { ToastSpecific } from './ToastSpecific';
import { ContainerSpecific } from './ContainerSpecific';

export const ToastDemo = () => {
  const [text, setText] = useState('');
  const [type, setType] = useState('info');
  const [autoClose, setAutoClose] = useState(true);
  const [autoCloseDelay, setAutoCloseDelay] = useState(3000);
  const [animation, setAnimation] = useState<AnimationTypes>('slide');
  const [showLastOnTop, setShowLastOnTop] = useState(true);
  const [showIcons, setShowIcons] = useState(true);
  const [position, setPosition] = useState<ToastPosition>('top-right');

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

  useEffect(() => {}, [position]);

  const madButton = () => {
    toast.success(<MadButton />, {
      autoClose: false,
      showIcon: false,
    });
  };

  const handleRegister = () => {
    if (text.length === 0) {
      toast.error('Please include a Message');
    }
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

    let className = null;

    if (type == 'custom') {
      className = 'testClass';
    }

    let bodyStyle = {};
    if (type == 'custom') {
      bodyStyle = {
        borderRadius: '20px',
      };
    }

    const options = {
      animation: anim,
      autoClose: ac,
      showIcon: si,
      className,
      bodyStyle,
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
      <div className="toast-types glassMorphism">
        <div className="toast-types-header">Types</div>
        <div className="toast-types-list ">
          <ul>
            {types.map((option: TypeTypes, i: number) => {
              return (
                <li key={`type=${i}`}>
                  <label htmlFor={option.type}>
                    <input
                      type="radio"
                      name={option.type}
                      value={type}
                      onChange={() => setType(option.type)}
                      checked={option.type == type}
                    />
                    {option.type} {option.emoji}
                  </label>
                </li>
              );
            })}
            <li>
              <label htmlFor="custom">
                <input
                  type="radio"
                  name="custom"
                  value={type}
                  onChange={() => setType('custom')}
                  checked={type == 'custom'}
                />
                Custom-🐱
              </label>
            </li>
          </ul>
        </div>
      </div>
      <div className="demo-message glassMorphism">
        <label htmlFor="text">Message: </label>
        <input
          type="text"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="demo-position glassMorphism">
        <label htmlFor="position">Position: </label>
        <select
          name="position"
          value={position}
          onChange={(e) => setPosition(e.target.value as ToastPosition)}
        >
          {positions.map((pos: ToastPosition, i: number) => (
            <option key={`pos-${i}`} value={pos}>
              {pos.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      <div className="specifics">
        <ContainerSpecific
          autoClose={autoClose}
          setAutoClose={setAutoClose}
          autoCloseDelay={autoCloseDelay}
          setAutoCloseDelay={setAutoCloseDelay}
          animation={animation}
          setAnimation={setAnimation}
          animations={animations}
          capitalize={capitalize}
          showLastOnTop={showLastOnTop}
          setShowLastOnTop={setShowLastOnTop}
          showIcons={showIcons}
          setShowIcons={setShowIcons}
        />

        <ToastSpecific
          toastAutoClose={toastAutoClose}
          setToastAutoClose={setToastAutoClose}
          toastShowIcon={toastShowIcon}
          setToastShowIcon={setToastShowIcon}
          toastAnimation={toastAnimation}
          setToastAnimation={setToastAnimation}
          animations={animations}
          capitalize={capitalize}
        />
      </div>

      <ToastContainer
        autoClose={autoClose}
        autoCloseDelay={autoCloseDelay}
        showIcons={true}
        position={position}
        animation={animation as AnimationTypes}
        showLastOnTop={showLastOnTop}
      />
      <div className="demo-buttons glassMorphism">
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
