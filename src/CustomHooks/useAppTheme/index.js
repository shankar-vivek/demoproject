import {useMemo} from 'react';
import {commonTheme} from './colors';

const useAppTheme = () => {
  const COLORS = useMemo(
    () => ({
      ...commonTheme,
    }),
    [],
  );

  return COLORS;
};

export default useAppTheme;
