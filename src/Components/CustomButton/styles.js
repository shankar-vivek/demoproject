import {StyleSheet} from 'react-native';
import { FONT_FAMILY, fontPixel, heightPixel, widthPixel } from '../../utils/UiUtils';


const getStyles = COLORS =>
  StyleSheet.create({
    btnStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.ButtonColor,
      minHeight: heightPixel(48),
      minWidth: widthPixel(343),
      borderRadius: heightPixel(12),
      shadowColor: '#000',
      flexDirection: 'row',
    },
    btnTextStyle: {
      fontSize: fontPixel(16),
      textAlign: 'center',
      color: COLORS.white,
      fontFamily: FONT_FAMILY.SemiBold,
    },
  });

export default getStyles;
