// Redux/Reducers/appCommon.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showAppLoader: false,
};

export const appCommon = createSlice({
  name: 'appCommon',
  initialState,
  reducers: {
   setShowAppLoader: (state, action) => {
      state.showAppLoader = action?.payload;
    },
    resetAppCommon: () => initialState,
  },
});

export const { setShowAppLoader, resetAppCommon } = appCommon.actions;

export const appCommonStates = (() => {
  const appCommonDetails = state => state?.appCommon;
  return appCommonDetails;
})();