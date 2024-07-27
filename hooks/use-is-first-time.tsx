import { useState, useEffect } from 'react';

import { getItem, setItem } from '~/utils/storage';

const IS_FIRST_TIME = 'IS_FIRST_TIME';

export const useIsFirstTime = () => {
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIsFirstTime = async () => {
      try {
        const value = await getItem(IS_FIRST_TIME);
        setIsFirstTime(value === null);
      } catch (e) {
        console.error('Failed to load isFirstTime from AsyncStorage', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIsFirstTime();
  }, []);

  const updateIsFirstTime = async (value: boolean) => {
    await setItem(IS_FIRST_TIME, value);
    setIsFirstTime(value);
  };

  return { isFirstTime, isLoading, updateIsFirstTime };
};
