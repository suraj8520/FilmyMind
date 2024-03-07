import axios from 'axios';

// we can also specify header here and other options as well
// which can make it so that you don't have to write it again and again
const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// const AxiosInstance = axios.create();

// i'm using custom instance and interceptor because the error response return had a lot of nesting so with the help of interceptor i can basically return it in the way i want.
AxiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error.response.data);
  },
);

//DO something before the request is sent
// This can be used for multiple things but i would consider that it's most helpful in scenario where we need to pass Auth token along with the request

//we basically don't use this here cause cookies get automatically sent and we just have to handle them on server-side.

// AxiosInstance.interceptors.request.use(
//   function (config) {},
//   function (error) {
//     return Promise.reject(error);
//   },
// );

export default AxiosInstance;

// we don't need this since it's only setting up the base url right now
// in other case we can basically use this.
