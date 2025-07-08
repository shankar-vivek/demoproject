import {ImageBackground, SafeAreaView, StatusBar, View} from 'react-native';
import useAppTheme from '../../CustomHooks/useAppTheme';
import Header from './Header';
import getStyles from './styles';
import {heightPixel} from '../../utils/UiUtils';

function ScreenLayout({
  children = {},
  headerRightLabel = '',
  disableRightLabel = false,
  hideLBackButton = false,
  onBackButtonPress = () => {},
  onPressRightLabel = () => {},
  BackIcon,
}) {
  const COLORS = useAppTheme();
  const styles = getStyles(COLORS);
  return (
    <ImageBackground  style={styles.safAreaView}>
      <SafeAreaView style={styles.safAreaView}>
        <StatusBar backgroundColor={COLORS.black} />
        <Header
          headerRightLabel={headerRightLabel}
          disableRightLabel={disableRightLabel}
          hideLBackButton={hideLBackButton}
          onBackButtonPress={onBackButtonPress}
          onPressRightLabel={onPressRightLabel}
          BackIcon={BackIcon}
        />
        <View
          style={{
            padding: heightPixel(16),
            width: '100%',
            height: '100%',
          }}>
          {children || null}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default ScreenLayout;
