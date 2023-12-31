import axios, { AxiosResponse, AxiosError } from 'axios';
import showToast from '../utils/Toast';
import { IResponseBase } from '../models/baseModel';
const uninterceptedAxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});
// axios.defaults.baseURL = 'https://apidev.lged.gov.bd/api/';
// uninterceptedAxiosInstance.defaults.baseURL = process.env.EXPO_PUBLIC_API_URL;

// uninterceptedAxiosInstance.defaults.withCredentials = true;
console.log('uninterceptedAxiosInstance', uninterceptedAxiosInstance);
const responseBody = (response: AxiosResponse) => response.data;

uninterceptedAxiosInstance.interceptors.response.use(
  async (response) => {
    // await sleep();
    return response;
  },
  (error: AxiosError) => {
    const { data, status }: any = error.response!;
    switch (status) {
      case 400:
        showToast('error', data.message, 400);
        break;
      case 401:
        showToast('error', data.message, 401);
        break;
      case 500:
        showToast('error', data.message, 500);
        break;

      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

//response handle
function handleResponse(response: AxiosResponse<any>) {
  //do something with the response data
  const { status, data } = response;
  const { message } = data as IResponseBase<object>;
  if (status === 201) {
    if (message !== null || message !== '') {
      showToast('error', message);
    }
  }
  return response;
}

//response error handle
function errorResponse(error: any) {
  // console.log('error response agent', error);
  if (error === undefined) {
    return Promise.reject(error);
  }
  //HANDLE WHEN API IS DOWN
  //handle network error
  if (error.message === 'Network Error' && !error.response) {
    showToast('error', 'Network error!');
  }
  showToast('error', error?.data?.message);

  throw error.response;
}

const agentNoInterceptor = () => {
  uninterceptedAxiosInstance.interceptors.response.use(
    handleResponse,
    errorResponse
  );
  const get = (url: string) =>
    uninterceptedAxiosInstance.get(url).then(responseBody);
  const post = (url: string, body: {}) =>
    uninterceptedAxiosInstance.post(url, body).then(responseBody);
  const put = (url: string, body: {}) =>
    uninterceptedAxiosInstance.put(url, body).then(responseBody);
  const del = (url: string) =>
    uninterceptedAxiosInstance.delete(url).then(responseBody);
  return { get, post, put, del };
};

export default agentNoInterceptor;
