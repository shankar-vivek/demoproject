import { StyleSheet } from 'react-native';
import {
  fontPixel,
  heightPixel,
  widthPixel,
} from '../../utils/UiUtils';

const getStyles = COLORS =>
  StyleSheet.create({
    content: {
      fontSize: fontPixel(18),
      lineHeight: fontPixel(18 * 1.5),
      color: COLORS.black,
      textAlign: 'center',
      marginHorizontal: widthPixel(5),
    },
    required: {
      fontSize: fontPixel(20),
      color: 'red',
      marginBottom: heightPixel(10),
      lineHeight: fontPixel(20 * 1.5),
    },
  });
export default getStyles;
