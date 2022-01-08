import { TypeOptions } from '../types';

export const enum Default {
  COLLAPSE_DURATION = 300,
  CSS_NAMESPACE = 'Toastify',
}

type KeyOfType = 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR' | 'DEFAULT' | 'DARK';

export const TYPE: { [key in KeyOfType]: TypeOptions } = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  DEFAULT: 'default',
  DARK: 'dark',
};
