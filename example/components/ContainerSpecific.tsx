import React from 'react';
import { AnimationTypes } from '../../dist';

interface ContainerSpecificProps {
  autoClose: boolean;
  setAutoClose: (e: boolean) => void;
  autoCloseDelay: number;
  setAutoCloseDelay: (e: number) => void;
  animation: AnimationTypes;
  setAnimation: (e: AnimationTypes) => void;
  animations: AnimationTypes[];
  capitalize: (s: string) => string;
  showLastOnTop: boolean;
  setShowLastOnTop: (e: boolean) => void;
  showIcons: boolean;
  setShowIcons: (e: boolean) => void;
}

export const ContainerSpecific: React.FC<ContainerSpecificProps> = ({
  autoClose,
  setAutoClose,
  autoCloseDelay,
  setAutoCloseDelay,
  animation,
  setAnimation,
  animations,
  capitalize,
  showLastOnTop,
  setShowLastOnTop,
  showIcons,
  setShowIcons,
}) => {
  return (
    <div className="container-specific">
      <h2>Container Specifics</h2>
      <div className="demo-auto-close glassMorphism-reverse">
        <label htmlFor="autoclose">Auto Close: </label>
        <input
          type="checkbox"
          name="autoclose"
          checked={autoClose == true}
          onChange={(e) => setAutoClose(e.target.checked)}
        />

        {autoClose && (
          <React.Fragment>
            <br />
            <label htmlFor="autoclosedelay">Delay Time: </label>
            <input
              type="number"
              name="autoclosedelay"
              value={autoCloseDelay}
              onChange={(e) => setAutoCloseDelay(+e.target.value)}
            />
          </React.Fragment>
        )}
      </div>
      <div className="demo-animation-type glassMorphism-reverse">
        <label htmlFor="animation">Animation Type: </label>
        <select
          name="animation"
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
      <div className="demo-show-last glassMorphism-reverse">
        <label htmlFor="showlastontop">Show last on top</label>
        <input
          type="checkbox"
          name="showlastontop"
          checked={showLastOnTop === true}
          onChange={(e) => setShowLastOnTop(e.target.checked)}
        />
      </div>
      <div className="demo-show-icons glassMorphism-reverse">
        <label htmlFor="showicons">Show Icons</label>
        <input
          type="checkbox"
          name="showicons"
          checked={showIcons === true}
          onChange={(e) => setShowIcons(e.target.checked)}
        />
      </div>
    </div>
  );
};
