import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

const login = async (payload) => {
  const URL = `${BASE_URL}/user/login`;
  return axios
    .post(URL, payload)
    .then((result) => result.data);
};

const registerr = async (payload) => {
  const URL = `${BASE_URL}/user/register`;
  return axios
    .post(URL, payload)
    .then((result) => result.data);
};

export { login, registerr };
