import { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import UserAPI from '../../services/APIs/UserAPI.js';
import { getAsyncItem, setAsyncItem } from '../../utils';
import { Platform } from 'react-native';
import { SCREEN_NAMES } from '../../navigation/ScreenNames.js';

const SignUpScreenViewModel = () => {
  const navigation = useNavigation();
  const [isPassWordShow, setIsPassWordShowState] = useState({
    passWord: false,
    rePassWord: false,
  });
 const getToken=async()=>{
  const Token = await EncryptedStorage.getItem('Token');
  console.log(Token,'----------------')
 }
 getToken()
 useEffect(()=>{
  getToken()
 },[])
  const schema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .lowercase()
      .required('Email is required')
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        'Please enter a valid email address',
      ),
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
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSignUp = handleSubmit(async data => {
    console.log('----> clicked ');
    const params = {
      email: data?.email?.toLowerCase(),
      password: data?.password,
      confirmPassword: data?.confirmPassword,
      fcmToken: await getAsyncItem('fcmToken'),
      deviceType: Platform.OS,
      userType: 'User',
    };
    navigation.navigate('OtpScreen');

    UserAPI?.signUp(params, async res => {
      console.log('token', res?.data?.token);
      await setAsyncItem('temp_jwt', res?.data?.token);
    });
  });


  const togglePasswordVisibility = useCallback(
    field => {
      setIsPassWordShowState(prev => ({
        passWord:
          field === 'passWord'
            ? isPassWordShow?.passWord
              ? false
              : true
            : false,
        rePassWord:
          field === 'rePassWord'
            ? isPassWordShow?.rePassWord
              ? false
              : true
            : false,
      }));
    },
    [
      setIsPassWordShowState,
      isPassWordShow?.rePassWord,
      isPassWordShow?.passWord,
    ],
  );
  const onPressSignIn = useCallback(() => {
    navigation.navigate(SCREEN_NAMES.SIGN_IN_SCREEN);
  }, [navigation]);

  return {
    control,
    handleSignUp,
    errors,
    getValues,
    isPassWordShow,
    togglePasswordVisibility,
    onPressSignIn,
  };
};

export default SignUpScreenViewModel;
