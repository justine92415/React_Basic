import { useEffect } from 'react';

export default function useKey(key: string, action: () => void) {
  useEffect(
    function () {
      function callback(e: KeyboardEvent) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }

      document.addEventListener('keydown', callback);

      return function () {
        document.removeEventListener('keydown', callback);
      };
    },
    [action, key]
  );
}
