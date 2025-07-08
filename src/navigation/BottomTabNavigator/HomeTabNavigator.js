import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HOME_ROUTER_NAMES } from '../RouterConstant';

const Stack = createStackNavigator();

function HomeTabNavigator({ initialRouteName = 'HOME_SCREEN' }) {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
        unmountOnBlur: true,
      }}
    >
      {HOME_ROUTER_NAMES.map(route => {
        return (
          <Stack.Screen
            key={route.key}
            name={route.name}
            component={route.component}
          />
        );
      })}
    </Stack.Navigator>
  );
}

export default HomeTabNavigator;
