import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import styles from './style';
import CustomButton from '../../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import Verify from '../../services/APIs/VerifyOtp';
import Resend from '../../services/APIs/resend';
import UserAPI from '../../services/APIs/UserAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtpScreen = () => {
  const [otp, setOtp] = useState('');
  const [data, setData] = useState();
  const navigation = useNavigation();
  const handleOtpChange = text => {
    setOtp(text);
  };
  const userdetails = async () => {
    UserAPI.Userdetails({}, res => {
      console.log(res.data);
      setData(res.data);
    });
  };
  useEffect(() => {
    userdetails();
  }, []);
  const handleSubmit = () => {
    if (otp.length === 4) {
      const otpString = String(otp);
      console.log('[[[[[[[[[[[[[[[[[[[[[[[[', otp);
      Verify.verifyOtp({ pincode: otp }, res => {
        console.log(res, '-----------');

        navigation.navigate(data ? 'AppoinmentDisplayScreen' : 'Home');
      });
    } else {
      Alert.alert('Invalid OTP', 'Please enter a 4-digit OTP');
    }
  };
  const handleResend = () => {
    console.log('----------clicked');
    Resend.sendMail({}, res => {
      console.log(res);
      Alert.alert('code send to your mailId');
    });
  };
  useEffect(() => {
    console.log('----------');
    handleResend();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.Header}>
        <Text style={styles.title}>Enter OTP</Text>
      </View>
      <Text style={{ top: '5%' }}>
        Please enter the OTP sent to your email for two-step authentication.
      </Text>
      <View style={styles.Body}>
        <OtpInput
          numberOfDigits={4}
          focusColor="#3498db"
          onTextChange={handleOtpChange}
          onFilled={handleOtpChange}
          theme={{
            containerStyle: styles.otpContainer,
            pinCodeContainerStyle: styles.otpBox,
            pinCodeTextStyle: styles.otpText,
          }}
        />
        <TouchableOpacity
          style={{ alignSelf: 'flex-end' }}
          onPress={handleResend}
        >
          <Text style={styles.resendText}>Resend Otp</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottom}>
        <CustomButton label="Verify Otp" onPress={handleSubmit}></CustomButton>
      </View>
    </View>
  );
};

export default OtpScreen;
