import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import Home from '../screens/HomeScreen/Home';
import OtpScreen from '../screens/OtpScreen';
import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppoinmentsScreen from '../screens/AppoinmentScreen';
import AppointmentDisplayScreen from '../screens/AppointmentsDisplayScreen';
import CheckinScreen from '../screens/CheckinScreen/index';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const [initialRoute, setInitialRoute] = useState(null); // null means loading

  useEffect(() => {
    const checkToken = async () => {
      try {
        const jwtToken = await AsyncStorage.getItem('temp_jwt');
        console.log(jwtToken, '-------lll');
        setInitialRoute(jwtToken ? 'OtpScreen' : 'SignInScreen');
      } catch (error) {
        console.error('Error reading token', error);
        setInitialRoute('SignInScreen');
      }
    };

    checkToken();
  }, []);

  // Show loading screen while checking token
  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="AppoinmentScreen" component={AppoinmentsScreen} />
      <Stack.Screen
        name="AppoinmentDisplayScreen"
        component={AppointmentDisplayScreen}
      />
      <Stack.Screen name="CheckIn" component={CheckinScreen} />

      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          headerTitle: 'Home',
          headerLeft: () => null,
          headerRight: () => null,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
