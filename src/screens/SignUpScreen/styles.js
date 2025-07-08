import { StyleSheet } from 'react-native';
import { FONT_FAMILY, fontPixel, heightPixel } from '../../utils/UiUtils';

const getStyles = COLORS =>
  StyleSheet.create({
    container: {
      height: '100%',
    },
    headerTxt: {
      fontFamily: FONT_FAMILY.Medium,
      fontSize: fontPixel(36),
    },
    btnStyle: {
      position: 'absolute',
      bottom: 0,
    },
    signInOption: {
      marginTop: heightPixel(10),
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 25,
    },
    customButton: {
      backgroundColor: COLORS.lightDullWhite,
      marginVertical: heightPixel(5),
    },
    buttonTxt: {
      color: COLORS.black,
      fontSize: fontPixel(16),
    },
    txtSignIn: {
      fontSize: fontPixel(15),
    },
    txtSignIn2: {
      fontSize: fontPixel(16),
      color: COLORS.Blue,
    },
  });

export default getStyles;
