import AsyncStorage from '@react-native-async-storage/async-storage';

export const removeAsyncItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('error on removeAsyncItem');
  }
};

export const clearAllAsyncItem = async () => {
  try {
    await AsyncStorage.clear();
    console.log('All AsyncStorage data cleared');
  } catch (e) {
    console.error('Failed to clear AsyncStorage:', e);
  }
};

export const setAsyncItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log('error on setAsyncItem');
  }
};

export const getAsyncItem = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    const parsedValue = JSON.parse(value);
    return parsedValue;
  } catch (e) {
    console.log('error on getAsyncItem');
  }
};

