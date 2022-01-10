import React from 'react';
import { render } from '@testing-library/react';
import { Toast } from '../../src/components/Toast/Toast';
import { generateToastId } from '../../src/utils';

describe('Toast', () => {
  it('should match snapshot', () => {
    const toastId = generateToastId();
    const { asFragment } = render(
      <Toast
        id={toastId}
        type="info"
        content="Here is a toast"
        theme="light"
        position="top-right"
        showIcon={false}
      />
    );
    expect(asFragment).toMatchSnapshot();
  });
});
