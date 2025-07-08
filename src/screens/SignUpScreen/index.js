import { Controller } from 'react-hook-form';
import { KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
import CustomButton from '../../Components/CustomButton';
import CustomTextInput from '../../Components/CustomTextInput';
import useAppTheme from '../../CustomHooks/useAppTheme';
import SignUpScreenViewModel from './ViewModel';
import getStyles from './styles';
import CustomText from '../../Components/CustomText';
import ScreenLayout from '../../Components/ScreenLayout';


const SignUpScreen = () => {
  const {
    isPassWordShow,
    control,
    errors,
    togglePasswordVisibility,
    handleSignUp,
    getValues,
    onPressSignIn,
    handleAppleSignUp,
  } = SignUpScreenViewModel();

  const COLORS = useAppTheme();
  const styles = getStyles(COLORS);

  return (
    <ScreenLayout>
      <KeyboardAvoidingView style={styles.container}>
        <CustomText label="Sign Up" style={styles.headerTxt} />
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
              showPassword={isPassWordShow.passWord}
              onPressPassWordShow={() => togglePasswordVisibility('passWord')}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: 'Please confirm your password',
            validate: value =>
              value === getValues('password') || 'Passwords do not match',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              HeaderLabel="Re-enter password"
              placeholder="Password must match"
              isRequired
              secureTextEntry
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              errorMessage={errors.confirmPassword?.message}
              showPassword={isPassWordShow.rePassWord}
              onPressPassWordShow={() => togglePasswordVisibility('rePassWord')}
            />
          )}
        />
        <CustomButton
          label="Sign Up"
          onPress={() => {
            handleSignUp();
          }}
        />
        <View style={styles.signInOption}>
          <CustomText
            label="Already have an account?"
            style={styles.txtSignIn}
          />
          <TouchableOpacity hitSlop={10} onPress={onPressSignIn}>
            <CustomText label="Sign in" style={styles.txtSignIn2} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
};

export default SignUpScreen;
