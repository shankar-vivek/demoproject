import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SELF_CARE_ROUTER_NAMES } from '../RouterConstant';

const Stack = createStackNavigator();

function SelfCareTabNavigator({ initialRouteName = 'SELF_CARE_SCREEN' }) {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
        unmountOnBlur: true,
      }}
    >
      {SELF_CARE_ROUTER_NAMES.map(route => (
        <Stack.Screen
          key={route?.key}
          name={route.name}
          component={route.component}
        />
      ))}
    </Stack.Navigator>
  );
}

export default SelfCareTabNavigator;
