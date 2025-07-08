import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, Image } from 'react-native';
import useAppTheme from '../../CustomHooks/useAppTheme';
import { heightPixel, widthPixel } from '../../utils/UiUtils';
import getStyles from './styles';
import { SVG } from '../../assets/svg';

function CustomButton({
  label = '',
  style,
  textStyle,
  onPress = () => {},
  disabled = false,
  isLoading = false,
  ButtonIcon,
  iconColor,
}) {
  const COLORS = useAppTheme();
  const styles = getStyles(COLORS);
  return (
    <TouchableOpacity
      disabled={disabled || isLoading}
      style={[styles.btnStyle, style]}
      onPress={onPress}
      activeOpacity={1}
    >
      {ButtonIcon && (
        <ButtonIcon
          width={25}
          height={25}
          color={iconColor}
          style={{ marginRight: 8 }}
        />
      )}

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={[styles.btnTextStyle, textStyle]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

export default CustomButton;
