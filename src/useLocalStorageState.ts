import { useEffect, useState } from 'react';
import { IWatchedMovie } from './types';

export default function useLocalStorageState(
  initialState: IWatchedMovie[],
  key: string
): [IWatchedMovie[], React.Dispatch<React.SetStateAction<IWatchedMovie[]>>] {
  const [value, setValue] = useState<IWatchedMovie[]>(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
