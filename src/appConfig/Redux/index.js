// Redux/index.js
import { configureStore } from '@reduxjs/toolkit';
import { reducers } from './Reducers';

const getAllConfiguredReducers = (allReducers) =>
  Object.keys(allReducers).reduce((configuredReducers, reducerKey) => {
    const slice = allReducers[reducerKey]; 
    if (slice?.name && slice?.reducer) {
      configuredReducers[slice.name] = slice.reducer;
    }
    return configuredReducers;
  }, {});

export const store = configureStore({
  reducer: {
    ...getAllConfiguredReducers(reducers),
  },
});
