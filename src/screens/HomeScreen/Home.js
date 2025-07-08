import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import styles from './style';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomButton from '../../Components/CustomButton';
import { useState } from 'react';
import TakeScreener from './TakeScreener';
import Update from '../../services/APIs/updateuser';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const [isScreener, setIsScreener] = useState(false);
  const [name, setName] = useState('');
  const navigation = useNavigation();
  const [lname, lastSetName] = useState('');
  const [age, SetAge] = useState('');
  const update = () => {
    const params = { firstName: name, lastNamer: lname, age: age };
    Update.UpdateUser(params, res => {
      console.log(res, '==============');

      Alert.alert(res.message);
      navigation.navigate('AppoinmentDisplayScreen');
    });
  };
  if (!isScreener) return <TakeScreener setIsScreener={setIsScreener} />;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <ScrollView
        style={styles.body}
        contentContainerStyle={{ paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.question}>
          <Text style={styles.questionText}>1) Enter Your First Name</Text>
        </View>
        <CustomTextInput
          containerStyles={styles.Input}
          onChangeText={text => setName(text)}
        />

        <View style={styles.question}>
          <Text style={styles.questionText}>2) Enter Your Last Name</Text>
        </View>
        <CustomTextInput
          containerStyles={styles.Input}
          onChangeText={text => lastSetName(text)}
        />

        <View style={styles.question}>
          <Text style={styles.questionText}>3) Enter Your Age</Text>
        </View>
        <CustomTextInput
          containerStyles={styles.Input}
          onChangeText={text => {
            SetAge(text);
          }}
        />
      </ScrollView>

      <View style={styles.bottomContainer}>
        <CustomButton
          label="Submit Answer"
          onPress={() => {
            update();
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
