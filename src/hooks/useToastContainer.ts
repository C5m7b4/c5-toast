import { useState, useEffect } from 'react';
import { generateToastId } from '../utils';
import { PubSub } from '../core';

export const useToastContainer = () => {
  const [loaded, setLoaded] = useState(false);
  const [portalId] = useState(`toast-portal-${generateToastId()}`);

  useEffect(() => {
    const div = document.createElement('div');
    div.id = portalId;
    div.setAttribute('style', 'position: fixed; top: 10px; right: 10px');
    document.getElementsByTagName('body')[0].prepend(div);

    setLoaded(true);
    PubSub.setContainerId(portalId);

    return () => {
      document.getElementsByTagName('body')[0].removeChild(div);
    };
  }, [portalId]);

  return {
    portalId,
    loaded,
  };
};
