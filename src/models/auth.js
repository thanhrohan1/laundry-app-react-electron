// Buat nyimpen data login sama logout
import api from '../utils/api';
import { action, thunk } from 'easy-peasy';

export default {
  authData: {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
  },

  loadUser: thunk(async (actions) => {
    try {
      const res = await api.get('/auth');
      actions.userLoaded(res.data);
    } catch (err) {
      return 0;
    }
  }),

  userLoaded: action((state, payload) => {
    state.authData = {
      ...state.authData,
      isAuthenticated: true,
      loading: false,
      user: payload,
    };
  }),

  loginSuccess: thunk(async (actions, payload) => {
    const body = { email: payload.email, password: payload.password };

    try {
      const res = await api.post('/auth', body);

      actions.login(res.data);

      actions.loadUser();
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => console.log(error)); //dispatch(setAlert(error.msg, 'danger')));
      }
    }
  }),

  login: action((state, payload) => {
    state.authData = {
      ...state.authData,
      ...payload,
      isAuthenticated: true,
      loading: false,
    };
  }),

  logout: action((state) => {
    state.authData = {
      ...state.authData,
      token: null,
      isAuthenticated: false,
      loading: false,
      user: null,
    };
  }),
};
