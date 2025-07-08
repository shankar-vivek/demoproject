/* eslint-disable no-console */
import { USERS_URLS } from '../../AxiosServices/ApiURL.js';
import { REQUEST_TYPE } from '../../AxiosServices/REQUEST_TYPES.js';
import { AxiosServiceMethods } from '../AxiosServices/AxiosMethods.js';

const UserAPI = {
  signUp: (params = {}, successCallback = () => {}) => {
    AxiosServiceMethods(
      false,
      USERS_URLS?.signup,
      REQUEST_TYPE.POST,
      params,
      successCallback,
      err => {
        store.dispatch(setShowAppLoader(false));
        if (err.response) {
          console.log(err.response.data);
          Alert.alert(err.response.data?.message);
        } else {
          apiErrorAlert('signUp', err);
        }
      },
    );
  },
  signIn: (params = {}, successCallback = () => {}) => {
    AxiosServiceMethods(
      false,
      USERS_URLS?.signIn,
      REQUEST_TYPE.POST,
      params,
      successCallback,
      err => {
        if (err.response.data?.message) {
          console.log(err.response.data);
          Alert.alert(err.response.data?.message);
        } else {
          apiErrorAlert('signIn', err);
        }
      },
    );
  },
  Userdetails: ({}, successCallback = () => {}) => {
    AxiosServiceMethods(
      true,
      USERS_URLS?.userDetails,
      REQUEST_TYPE.GET,
      {},
      successCallback,
      err => {
        console.log('Error in Axios:', err);
        if (err.response) {
          Alert.alert(err.response.data?.message);
        } else {
          console.log;
          apiErrorAlert('userDetails---------', err);
        }
      },
    );
  },
};
export default UserAPI;
