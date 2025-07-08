import React, { useState } from 'react';
import {
  SafeAreaView,
  Button,
  Platform,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomText from '../../Components/CustomText';
import Appoinment from '../../services/APIs/Appoinment';
import { useNavigation } from '@react-navigation/native';

const AppoinmentsScreen = () => {
  const navigation = useNavigation();
  const [appointmentData, setAppointmentData] = useState({
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    showDatePicker: false,
    showStartTimePicker: false,
    showEndTimePicker: false,
    reminder: '5',
  });

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: '5 minutes', value: '5' },
    { label: '10 minutes', value: '10' },
    { label: '15 minutes', value: '15' },
    { label: '30 minutes', value: '30' },
    { label: '1 hour', value: '60' },
  ]);

  const updateData = (key, value) => {
    setAppointmentData(prev => ({ ...prev, [key]: value }));
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      updateData('date', selectedDate);
    }
    updateData('showDatePicker', false);
  };

  const handleStartTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      updateData('startTime', selectedTime);
    }
    updateData('showStartTimePicker', false);
  };

  const handleEndTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      updateData('endTime', selectedTime);
    }
    updateData('showEndTimePicker', false);
  };

  const formatDate = date => {
    return date.toISOString().split('T')[0]; // e.g., "2025-07-05"
  };

  const saveAppointment = () => {
    const { date, startTime, endTime, reminder } = appointmentData;

    const payload = {
      date: formatDate(date), // "YYYY-MM-DD"
      startTime: startTime.toISOString(), // timestamp in milliseconds
      endTime: endTime.toISOString(), // timestamp in milliseconds
      remindBefore: Number(reminder), // ensure number type
    };

    console.log('📦 Appointment payload:', payload);

    Appoinment.bookAppoinment(payload, res => {
      navigation.goBack();
    });
  };

  return (
    <SafeAreaView style={localStyles.container}>
      <CustomText label="Create Appointment" style={localStyles.header} />

      <Button
        title="Select Date"
        onPress={() => updateData('showDatePicker', true)}
      />
      {appointmentData.showDatePicker && (
        <DateTimePicker
          value={appointmentData.date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Button
        title="Select Start Time"
        onPress={() => updateData('showStartTimePicker', true)}
      />
      {appointmentData.showStartTimePicker && (
        <DateTimePicker
          value={appointmentData.startTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleStartTimeChange}
        />
      )}

      <Button
        title="Select End Time"
        onPress={() => updateData('showEndTimePicker', true)}
      />
      {appointmentData.showEndTimePicker && (
        <DateTimePicker
          value={appointmentData.endTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleEndTimeChange}
        />
      )}

      <CustomText
        label="Reminder Time (before start)"
        style={localStyles.label}
      />

      <View style={{ zIndex: 1000 }}>
        <DropDownPicker
          open={open}
          value={appointmentData.reminder}
          items={items}
          setOpen={setOpen}
          setValue={value => updateData('reminder', value())}
          setItems={setItems}
          style={{ marginBottom: open ? 120 : 20 }}
        />
      </View>

      <Button title="Save Appointment" onPress={saveAppointment} />
    </SafeAreaView>
  );
};

export default AppoinmentsScreen;

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    zIndex: 0,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
  label: {
    marginTop: 16,
    marginBottom: 4,
  },
});
