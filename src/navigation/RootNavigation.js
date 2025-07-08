import React from 'react';

export const navigationRef = React.createRef(null);

export const navigate = (name, params) =>
  navigationRef?.current ? navigationRef.current.navigate(name, params) : null;

export const getRouterName = () => navigationRef?.current?.getCurrentRoute();
