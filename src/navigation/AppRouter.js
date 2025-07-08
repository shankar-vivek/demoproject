import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StatusBar} from 'react-native';
import {navigationRef} from './RootNavigation';
import {ROUTER_NAMES} from './RouterConstant';

const Stack = createStackNavigator();

function AppRouter({initialRouteName = ''}) {
  const COLORS = useAppTheme();

  console.log('Initial Route Name:', initialRouteName);

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar
        backgroundColor={'black'}
        animated
        barStyle="dark-content"
      />
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
          unmountOnBlur: true,
          gestureEnabled: false,
        }}>
        {ROUTER_NAMES.map(route => {
          
          return (
            <Stack.Screen
              key={route.key}
              name={route.name}
              component={route.component}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppRouter;
