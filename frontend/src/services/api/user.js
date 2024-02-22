import AxiosInstance from './../AxiosInstance';
// import axios from 'axios';
// we don't need try catch blocks since react-query handles that itself
// thrown error will go into error state and returned data will go into data.

export async function signup({ email, name, password, confirmPassword }) {
  const { data } = await AxiosInstance.post('/api/auth/signup', {
    email,
    name,
    password,
    confirmPassword,
  });

  console.log(data);
  if (data.status !== 'success') {
    throw new Error(data.message);
  }

  return data.data;
}

export async function login({ email, password }) {
  const { data } = await AxiosInstance.post('/api/auth/login', {
    email,
    password,
  });

  if (data.status !== 'success') {
    throw new Error(data.message);
  }
  return data.data;
}

export async function getUser() {
  const { data } = await AxiosInstance.get('/api/users/me');
  if (data.status !== 'success') {
    throw new Error(data.message);
  }

  return data.data;
}

export async function logout() {
  const { data } = await AxiosInstance.get('/api/auth/logout');
  if (data.status !== 'success') {
    throw new Error(data.message);
  }
  return null;
}
