import { Alert } from 'react-native';

import { AxiosServiceMethods } from '../AxiosServices/AxiosMethods';
import { REQUEST_TYPE } from '../AxiosServices/REQUEST_TYPES';
import { USERS_URLS } from '../AxiosServices/ApiURL';

const Appoinment = {
  bookAppoinment: (params = {}, successCallback = () => {}) => {
    AxiosServiceMethods(
      true,
      USERS_URLS.appoinment,
      REQUEST_TYPE.POST,
      params,
      successCallback,
      err => {
        console.log('Error in Axios:', err);
        if (err.response) {
          Alert.alert(err.response.data?.message);
        } else {
          console.log;
          apiErrorAlert('---------', err);
        }
      },
    );
  },
};
export default Appoinment;
