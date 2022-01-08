import { useState, useEffect } from 'react';
import { generateToastId } from '../utils';
import { ToastManager as toastManager } from '../core';
import { ToastPosition } from '../types';
import { getToastContainerPosition } from '../utils';

export const useToastContainer = (position: ToastPosition) => {
  const [loaded, setLoaded] = useState(false);
  const [portalId] = useState(`toast-portal-${generateToastId()}`);

  const containerStyle = getToastContainerPosition(position);

  useEffect(() => {
    const div = document.createElement('div');
    div.id = portalId;
    div.setAttribute('style', containerStyle);
    document.getElementsByTagName('body')[0].prepend(div);

    setLoaded(true);
    toastManager.setContainerId(portalId);

    return () => {
      document.getElementsByTagName('body')[0].removeChild(div);
    };
  }, [portalId]);

  return {
    portalId,
    loaded,
  };
};
