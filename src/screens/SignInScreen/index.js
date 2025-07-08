import { Controller } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomButton from '../../Components/CustomButton';
import useAppTheme from '../../CustomHooks/useAppTheme';
import ScreenLayout from '../../Components/ScreenLayout';
import getStyles from './styles';
import CustomText from '../../Components/CustomText';
import SignInScreenViewModel from './ViewModel';
import CustomTextInput from '../../Components/CustomTextInput';
import { SVG } from '../../assets/svg';
import {
  FONT_FAMILY,
  fontPixel,
  heightPixel,
  widthPixel,
} from '../../utils/UiUtils';

const SignInScreen = () => {
  const {
    isPassWordShow,
    control,
    errors,
    togglePasswordVisibility,
    handleSignIn,
    getValues,
    onPressSignIn,
  } = SignInScreenViewModel();

  const COLORS = useAppTheme();
  const styles = getStyles(COLORS);

  return (
    <ScreenLayout>
      <KeyboardAvoidingView style={styles.container}>
        <CustomText label="Sign In" style={styles.headerTxt} />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              HeaderLabel="Email"
              placeholder="Enter your email address"
              isRequired
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              errorMessage={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              HeaderLabel="Password"
              placeholder="Minimum 8 characters"
              isRequired
              secureTextEntry
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              errorMessage={errors.password?.message}
              showPassword={isPassWordShow}
              onPressPassWordShow={() => togglePasswordVisibility('passWord')}
            />
          )}
        />
        {/* <CustomButton label="Sign in" onPress={handleSignIn} /> */}
        <TouchableOpacity
          onPress={handleSignIn}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.ButtonColor,
            minHeight: heightPixel(48),
            minWidth: widthPixel(343),
            borderRadius: heightPixel(12),
            shadowColor: '#000',
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              fontSize: fontPixel(16),
              textAlign: 'center',
              color: COLORS.white,
              fontFamily: FONT_FAMILY.SemiBold,
            }}
          >
            Sign In
          </Text>
        </TouchableOpacity>

        <CustomText label="OR" style={{ margin: 10 }} />

        <CustomButton
          ButtonIcon={SVG.GoogleIcon}
          label="Sign In with Google"
          onPress={() => {
            console.log('Pressed');
          }}
          style={styles.customButton}
          textStyle={styles.buttonTxt}
        />

        <View style={styles.btnStyle}>
          <View style={styles.signInOption}>
            <CustomText
              label="Don’t have an account? "
              style={styles.txtSignIn}
            />
            <TouchableOpacity hitSlop={10} onPress={onPressSignIn}>
              <CustomText label="Sign Up" style={styles.txtSignIn2} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
};

export default SignInScreen;
