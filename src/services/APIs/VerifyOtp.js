import { Alert } from 'react-native';
import { USERS_URLS } from '../AxiosServices/ApiURL';
import { AxiosServiceMethods } from '../AxiosServices/AxiosMethods';
import { REQUEST_TYPE } from '../AxiosServices/REQUEST_TYPES';

const Verify = {
  verifyOtp: (params = {}, successCallback = () => {}) => {
    AxiosServiceMethods(
      true,
      USERS_URLS?.verifyOtp,
      REQUEST_TYPE.POST,
      params,
      successCallback,
      err => {
        console.log('Error in Axios:', err);
        if (err.response) {
          Alert.alert(err.response.data?.message);
        } else {  
          console.log
          apiErrorAlert('---------', err);
        }
      },
    );
  },
};
export default Verify;
