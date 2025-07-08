
import Home from '../screens/HomeScreen/Home';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import {SCREEN_NAMES} from './ScreenNames';
export const ROUTER_NAMES = [
  
  {
    key: 1,
    name: SCREEN_NAMES.SIGN_UP_SCREEN,
    component: SignUpScreen,
  },
  {
    key: 2,
    name: SCREEN_NAMES.SIGN_IN_SCREEN,
    component: SignInScreen,
    
  },
  {
    key: 3,
    name: SCREEN_NAMES.HOME,
    component: Home,
  },

];
