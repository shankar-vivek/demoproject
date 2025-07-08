import {StyleSheet} from 'react-native';
import {
  FONT_FAMILY,
  fontPixel,
  heightPixel,
  widthPixel,
} from '../../utils/UiUtils';

const getStyles = COLORS =>
  StyleSheet.create({
    safAreaView: {
      width: '100%',
      height: '100%',
      backgroundColor:'#fff',
    },
    headerContainer: {
      width: '100%',
      minHeight: heightPixel(10),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingHorizontal: widthPixel(16),
    },
    justifyHeader: {
      justifyContent: 'flex-end',
    },
    HeaderLabel: {
      fontWeight: '600',
      fontSize: fontPixel(14),
      color: COLORS.Orange,
      fontFamily: FONT_FAMILY.Bold,
    },
    backArrowStyles: {
      backgroundColor: COLORS.white,
      width: widthPixel(40),
      height: widthPixel(40),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: widthPixel(10),
    },
  });
export default getStyles;
