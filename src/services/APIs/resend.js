import { USERS_URLS } from '../AxiosServices/ApiURL';
import { AxiosServiceMethods } from '../AxiosServices/AxiosMethods';
import { REQUEST_TYPE } from '../AxiosServices/REQUEST_TYPES';

const Resend = {
  sendMail: (params = {}, successCallback = () => {}) => {
    AxiosServiceMethods(
      true,
      USERS_URLS?.resendMailCode,
      REQUEST_TYPE.GET,
      params,
      successCallback,
      err => {
        console.log('Error in Axios:', err);
        if (err.response) {
          Alert.alert(err.response.data?.message);
        } else {
          apiErrorAlert('signUp', err);
        }
      },
    );
  },
};
export default Resend;
