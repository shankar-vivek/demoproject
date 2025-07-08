import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: {},
};

export const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action?.payload;
    },
    resetUserDetails: () => initialState,
  },
});

export const {setUserData, resetUserDetails} =
  userReducer.actions;

export const userReducerStates = (() => {
  const userDetails = state => state?.userReducer;
  return userDetails;
})();
