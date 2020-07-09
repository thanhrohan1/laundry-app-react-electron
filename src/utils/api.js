import axios from 'axios';
import store from '../store';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.data.msg === 'Token is not valid') {
      store.getActions().auth.logout();
    }
    return Promise.reject(err);
  }
);

export default api;
