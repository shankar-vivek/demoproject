import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import CustomText from '../../Components/CustomText';
import useAppTheme from '../../CustomHooks/useAppTheme';
import {SVG} from '../../assets/svg';
import {heightPixel, widthPixel} from '../../utils/UiUtils';
import getStyles from './styles';

function Header({
  headerRightLabel = '',
  disableRightLabel = false,
  hideLBackButton = true,
  onBackButtonPress = () => {},
  onPressRightLabel = () => {},
  BackIcon = SVG.LeftArrow1,
}) {
  const COLORS = useAppTheme();
  const styles = getStyles(COLORS);
  return (
    <View
      style={[styles.headerContainer, hideLBackButton && styles.justifyHeader]}>
      {hideLBackButton && (
        <TouchableOpacity
          onPress={onBackButtonPress}
          style={styles.backArrowStyles}>
          <BackIcon width={widthPixel(18)} height={heightPixel(18)} />
        </TouchableOpacity>
      )}
      {Boolean(headerRightLabel) && (
        <TouchableOpacity
          onPress={onPressRightLabel}
          disabled={disableRightLabel}>
          <CustomText style={[styles?.HeaderLabel]} label={headerRightLabel} />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default Header;
