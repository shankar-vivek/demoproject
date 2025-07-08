import { Text } from 'react-native';
import useAppTheme from '../../CustomHooks/useAppTheme';
import getStyles from './styles';

function CustomText({ label = '', style = {}, requiredStyle, isRequired, numberOfLines, ...rest }) {
  const COLORS = useAppTheme();
  const styles = getStyles(COLORS);

  return (
    <Text
      style={[
        styles.content,
        style,
        style?.fontSize && { lineHeight: style.lineHeight ?? style?.fontSize * 1.5 },
      ]}
      {...rest}
      ellipsizeMode="tail"
      numberOfLines={numberOfLines}
    >
      {label}
      {isRequired && <Text style={[styles.required, requiredStyle || {}]}> *</Text>}
    </Text>
  );
}
export default CustomText;