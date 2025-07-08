import {StyleSheet} from 'react-native';
import {FONT_FAMILY, fontPixel, heightPixel} from '../../utils/UiUtils';

const getStyles = COLORS =>
  StyleSheet.create({
    container: {
      height: '70%',
      justifyContent: 'space-between',
    },
    headerTxt: {
      fontFamily: FONT_FAMILY.Medium,
      fontSize: fontPixel(36),
    },
    btnStyle: {
      // position: 'absolute',
      // bottom: -200,
    },
    signInOption: {
      marginTop: heightPixel(10),
      flexDirection: 'row',
      justifyContent: 'center',
    },
    customButton: {
      backgroundColor: COLORS.lightDullWhite,
      marginVertical: heightPixel(5),
    },
    buttonTxt: {
      color: COLORS.black,
      fontSize: fontPixel(16),
    },
    customButton1: {
      backgroundColor: COLORS.transparent,
      marginVertical: heightPixel(5),
    },
    buttonTxt1: {
      color: COLORS.Blue,
      fontSize: fontPixel(14),
    },
    txtSignIn: {
      fontSize: fontPixel(15),
    },
    txtSignIn2: {
      fontSize: fontPixel(15),
      color: COLORS.Blue,
    },
  });

export default getStyles;
