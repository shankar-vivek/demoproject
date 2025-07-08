import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { SCREEN_NAMES } from '../../navigation/ScreenNames';
import { setShowAppLoader } from '../../appConfig/Redux/Reducers/appCommon';
import { setUserData } from '../../appConfig/Redux/Reducers/userDetails';
import { getAsyncItem, setAsyncItem } from '../../utils';
import { useDispatch } from 'react-redux';
import { Platform } from 'react-native';
import UserAPI from '../../services/APIs/UserAPI';
// import {initialApiCalls} from '../../utils/apiUtils';

const SignInScreenViewModel = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isPassWordShow, setIsPassWordShowState] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .test(
        'password-validation',
        'Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character',
        value => {
          const isValidLength = value?.length >= 8;
          const hasUpperCase = /[A-Z]/.test(value);
          const hasLowerCase = /[a-z]/.test(value);
          const hasNumber = /[0-9]/.test(value);
          const hasSpecialChar = /[!@#$%^&*]/.test(value);
          return (
            isValidLength &&
            hasUpperCase &&
            hasLowerCase &&
            hasNumber &&
            hasSpecialChar
          );
        },
      ),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSignIn = handleSubmit(async data => {
    const fcmToken = await getAsyncItem('fcmToken');
    const emailId = data?.email?.trim();
    const params = {
      email: emailId?.toLowerCase(),
      password: data?.password,
      userType: 'user',
    };
    console.log('hhhhhhhh');
    console.log('params', params);

    UserAPI?.signIn(params, async res => {
      console.log('token', res?.data?.token);
      await setAsyncItem('temp_jwt', res?.data?.token);
      //await EncryptedStorage.setItem('Token',res?.data?.token)

      navigation.navigate('OtpScreen');
    });
  });

  const togglePasswordVisibility = useCallback(() => {
    setIsPassWordShowState(!isPassWordShow);
  }, [setIsPassWordShowState, isPassWordShow]);

  const onPressSignIn = useCallback(() => {
    navigation.navigate(SCREEN_NAMES?.SIGN_UP_SCREEN);
  }, [navigation]);

  return {
    control,
    handleSignIn,
    errors,
    getValues,
    isPassWordShow,
    togglePasswordVisibility,
    onPressSignIn,
  };
};

export default SignInScreenViewModel;
