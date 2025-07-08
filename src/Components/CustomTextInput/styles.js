import {StyleSheet} from 'react-native';
import {
  FONT_FAMILY,
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '../../utils/UiUtils';


const getStyles = COLORS =>
  StyleSheet.create({
    container: {
      minHeight: heightPixel(80),
      marginBottom: pixelSizeVertical(12),
    },
    label: {
      fontSize: fontPixel(15),
      fontFamily: FONT_FAMILY.SemiBold,
      color: COLORS.black,
      paddingBottom: heightPixel(8),
    },
    required: {
      fontSize: fontPixel(12),
      color: COLORS.errorRed,
      fontFamily: FONT_FAMILY.SemiBold,
    },
    error: {
      fontSize: fontPixel(10),
      color: COLORS.errorRed,
      fontFamily: FONT_FAMILY.Regular,
      fontWeight: '400',
      marginLeft: pixelSizeHorizontal(5),
      marginTop: pixelSizeVertical(5),
    },
    txtInput: {
      height: heightPixel(44),
      borderRadius: widthPixel(13),
      backgroundColor: COLORS.lightDullWhite,
      fontFamily: FONT_FAMILY.Regular,
      fontSize: fontPixel(14),
      paddingHorizontal: pixelSizeHorizontal(12),
      borderWidth: 1,
      borderColor: 'grey',
      width: '100%',

    },
    showBorder: {
      borderColor: COLORS.errorRed,
      backgroundColor: COLORS.isTimerRunning,
      color: COLORS.Orange,
      backgroundColor: COLORS.white,
    },
    iconStyles: {
      position: 'absolute',
      right: widthPixel(10),
    },
  });
export default getStyles;
