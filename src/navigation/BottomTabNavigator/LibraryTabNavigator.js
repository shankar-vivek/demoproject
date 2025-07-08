import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LIBRARY_ROUTER_NAMES } from '../RouterConstant';
import { useRoute } from '@react-navigation/native';

const Stack = createStackNavigator();

function LibraryTabNavigator({ initialRouteName = 'LIBRARY_SCREEN' }) {
  const routeRoot = useRoute();
  // console.log('routeRoot', routeRoot);
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
        unmountOnBlur: true,
      }}
    >
      {LIBRARY_ROUTER_NAMES.map(route => {
        return (
          <Stack.Screen
            key={route.key}
            name={route.name}
            component={route.component}
            initialParams={routeRoot?.params?.params || {}}
          />
        );
      })}
    </Stack.Navigator>
  );
}

export default LibraryTabNavigator;
