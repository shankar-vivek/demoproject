import {StyleSheet} from 'react-native';
import {
  FONT_FAMILY,
  fontPixel,
  heightPixel,
  widthPixel,
} from '../../utils/UiUtils';

const getStyles = COLORS =>
  StyleSheet.create({
    questionContainer: {
      marginVertical: 10,
      padding: 15,
      borderRadius: 8,
      backgroundColor: COLORS.cardBackground || '#f9f9f9',
    },
    questionText: {
      fontSize: fontPixel(14),
      fontFamily: FONT_FAMILY.Medium,
      textAlign: 'left',
    },
    optionButton: {
      padding: 12,
      borderRadius: 8,
      marginVertical: 6,
      borderWidth: 1,
    },
    optionText: {
      fontSize: fontPixel(14),
    },
    optionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: heightPixel(8),
      paddingHorizontal: heightPixel(12),
      marginVertical: widthPixel(4),
      borderRadius: heightPixel(8),
      backgroundColor: COLORS.lightGary4,
    },

    checkbox: {
      width: heightPixel(24),
      height: heightPixel(24),
      borderRadius: heightPixel(4),
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: heightPixel(10),
    },

    checkmark: {
      color: '#fff',
      fontFamily: FONT_FAMILY.Bold,
      fontSize: fontPixel(16),
    },

    optionText: {
      fontSize: fontPixel(14),
      flexShrink: 1,
      textAlign: 'left',
    },
  });
export default getStyles;
