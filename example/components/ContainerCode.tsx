import React from 'react';
import { AnimationTypes, ToastContainerProps } from '../../src';

function getProp<L, R>(prop: L, value: R) {
  return value ? (
    <div>
      <span className="code__props">{prop}</span>
    </div>
  ) : (
    <div>
      <span className="code__props">{prop}</span>
      {`={false}`}
    </div>
  );
}

export interface ContainerCodeProps extends Partial<ToastContainerProps> {
  isDefaultProps: boolean;
  autoCloseDelay: number;
  animation: AnimationTypes;
}

export const ContainerCode: React.FC<ContainerCodeProps> = ({
  position,
  autoClose,
  showLastOnTop,
  autoCloseDelay,
  showIcons,
  animation,
}) => (
  <div className="container-code">
    <h3>Toast Container</h3>
    <div className="code">
      <div>
        <span>{`<`}</span>
        <span className="code__component">ToastContainer</span>
      </div>
      <div>
        <span className="code__props">position</span>
        {`="${position}"`}
      </div>
      {getProp('showLastOnTop', showLastOnTop)}
      {getProp('autoClose', autoClose)}
      {autoClose == true ? (
        <div>
          <span className="code__props">autoCloseDelay</span>=&#123;
          {autoCloseDelay}&#125;
        </div>
      ) : null}
      {getProp('showIcons', showIcons)}
      <div>
        <span className="code__props">animation</span>
        {`={'${animation}'}`}
      </div>
      <div>
        <span>{`/>`}</span>
      </div>
    </div>
  </div>
);
