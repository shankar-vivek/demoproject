import axios from 'axios';
import { getAsyncItem, setAsyncItem } from '../../utils';
import { Platform } from 'react-native';
import { USERS_URLS } from './ApiURL';
import { DEFAULT_ENV } from './Environment';

export const instance = axios?.create({
  baseURL: DEFAULT_ENV?.BASE_URL,
  timeout: 60000,
});

export const api = instance;

export const privateInstance = axios?.create({
  baseURL: DEFAULT_ENV?.BASE_URL,
  timeout: 60000,
});

privateInstance.interceptors.request.use(async req => {
  const temp_jwt = await getAsyncItem('temp_jwt');
  
  const accessToken = temp_jwt  ;

  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  console.log(req.headers.Authorization,'====token==')
 
  return req;
});

export const privateAPI = privateInstance;
