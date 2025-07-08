// ViewModel.js
import { useState } from 'react';

const useHomeScreenViewModel = () => {
  const [appointmentData, setAppointmentData] = useState({
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    reminder: '10',
    showDatePicker: false,
    showStartTimePicker: false,
    showEndTimePicker: false,
  });

  const updateData = (key, value) => {
    setAppointmentData(prev => ({ ...prev, [key]: value }));
  };

  const handleDateChange = (event, selectedDate) => {
    updateData('showDatePicker', false);
    if (selectedDate) updateData('date', selectedDate);
  };

  const handleStartTimeChange = (event, selectedTime) => {
    updateData('showStartTimePicker', false);
    if (selectedTime) updateData('startTime', selectedTime);
  };

  const handleEndTimeChange = (event, selectedTime) => {
    updateData('showEndTimePicker', false);
    if (selectedTime) updateData('endTime', selectedTime);
  };

  const saveAppointment = () => {
    console.log('Appointment Saved:', appointmentData);
    // Here you could call an API or store the data
  };

  return {
    appointmentData,
    updateData,
    handleDateChange,
    handleStartTimeChange,
    handleEndTimeChange,
    saveAppointment,
  };
};

export default useHomeScreenViewModel;
