'use client';

import { useEffect } from 'react';

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const register = async () => {
        try {
          await navigator.serviceWorker.register('/sw.js', { scope: '/' });
        } catch (error) {
          console.error('SW registration failed', error);
        }
      };

      register();
    }
  }, []);

  return null;
}

export default ServiceWorkerRegister;
