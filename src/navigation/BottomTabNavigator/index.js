import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, CommonActions } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  FONT_FAMILY,
  fontPixel,
  heightPixel,
  isAndroid,
  widthPixel,
} from '../../../utils/UIUtils';
import { SCREEN_NAMES, TAB_NAMES } from '../ScreenNames';
import HomeTabNavigator from './HomeTabNavigator';
import LibraryTabNavigator from './LibraryTabNavigator';
import SelfCareTabNavigator from './SelfCareTabNavigator';
import useAppTheme from '../../CustomHooks/useAppTheme';

const Tab = createBottomTabNavigator();

function BottomNavigator() {
  const navigation = useNavigation();
  const COLORS = useAppTheme();
  const styles = getStyles(COLORS);

  const createTabPressResetHandler = (tabName, screenName) => {
    return ({ navigation }) => ({
      tabPress: e => {
        e.preventDefault();
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: tabName,
                state: {
                  routes: [{ name: screenName }],
                },
              },
            ],
          }),
        );
      },
    });
  };

  return (
    <Tab.Navigator
      initialRouteName={TAB_NAMES.HOME_TAB}
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        freezeOnBlur: true,
      }}
    >
      <Tab.Screen
        name={TAB_NAMES.HOME_TAB}
        component={HomeTabNavigator}
        options={{
          tabBarLabel: 'Daily Check-in',
        }}
        listeners={createTabPressResetHandler(
          TAB_NAMES.HOME_TAB,
          SCREEN_NAMES.HOME_SCREEN,
        )}
      />

      <Tab.Screen
        name={TAB_NAMES.LIBRARY_TAB}
        component={LibraryTabNavigator}
        options={{
          tabBarLabel: 'Appointments',
        }}
        listeners={createTabPressResetHandler(
          TAB_NAMES.LIBRARY_TAB,
          SCREEN_NAMES.LIBRARY_SCREEN,
        )}
      />

      <Tab.Screen
        name={TAB_NAMES.SELF_CARE_TAB}
        component={SelfCareTabNavigator}
        options={{
          tabBarLabel: 'Profile',
        }}
        listeners={createTabPressResetHandler(
          TAB_NAMES.SELF_CARE_TAB,
          SCREEN_NAMES.SELF_CARE_SCREEN,
        )}
      />
    </Tab.Navigator>
  );
}

export default React.memo(BottomNavigator);

const getStyles = COLORS =>
  StyleSheet.create({
    tabBarStyle: {
      backgroundColor: COLORS.white,
      paddingTop: widthPixel(10),
      paddingHorizontal: heightPixel(10),
      height: isAndroid() ? '10%' : '10%',
      width: '100%',
    },
    tabLabelStyle: focused => ({
      fontSize: fontPixel(10),
      fontFamily: FONT_FAMILY.Regular,
      color: focused ? COLORS.Blue : COLORS.gray,
      paddingBottom: heightPixel(isAndroid() ? 10 : 0),
    }),
    tabIconStyles: {
      padding: heightPixel(10),
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
