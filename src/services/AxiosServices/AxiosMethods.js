import {api, privateAPI} from '.';
import { DEFAULT_ENV } from './Environment';
import {REQUEST_TYPE} from './REQUEST_TYPES';

export const AxiosServiceMethods = async (
  isPrivate = false,
  url = '',
  type = REQUEST_TYPE.POST,
  params = {},
  successCallback = () => {},
  errorCallback = () => {},
) => {
  const API = isPrivate ? privateAPI : api;
  
console.log('clicked---------------',API)
  const methodMap = {
    [REQUEST_TYPE.POST]: () => API.post( url, params),
    [REQUEST_TYPE.GET]: () => API.get(url, params),
    [REQUEST_TYPE.PATCH]: () => API.patch(url, params),
    [REQUEST_TYPE.DELETE]: () => API.delete(url, {data: params}), 
  };

  try {
    const res = await methodMap[type]();
    if (res && successCallback) {
      // res.data.data = res.data?.data ? decrypt(res.data.data) : [];
      successCallback(res?.data);
      if (res.status !== 200) {
        console.error(`Error: ${res.status} - ${res.statusText}`);
      }
    }
  } catch (err) {
    if (err && errorCallback) {
      errorCallback(err);
    }
  }
};

export const apiErrorAlert = (apiName, err) => {
  if (err.response) {
    // Server responded with a status code that falls out of the range of 2xx
    const statusCode = err.response.status;
    const errorMessage = err.response.data?.message || 'An error occurred';
    console.log(
      `Error while ${apiName}: Status Code: ${statusCode}, Message: ${errorMessage}`,
    );
    console.error(`Error ${statusCode}: ${errorMessage}`);
  } else if (err.request) {
    // The request was made but no response was received
    console.log(
      `Error while ${apiName}: No response received from server`,
      err.request,
    );
    console.error('No response from server. Please try again.');
  } else {
    // Something happened in setting up the request that triggered an error
    console.log(`Error while ${apiName}: Axios error`, err.message);
    console.error(`Request failed: ${err.message}`);
  }
};
