import axios from 'axios';
import { toast } from 'react-toastify';
import { authenticate, getCookie, isAuth, signOut } from '../../helpers/auth';
import { setAuthToken } from '../../helpers/setAuthToken';
import {
  REGISTER_USER,
  USER_LOADED,
  USER_LOADING,
  LOGOUT,
  AUTH_ERROR,
  LOGIN_USER,
  ACTIVE_ACCOUNT,
  RESET_PASSWORD,
  FORGET_PASSWORD,
  AUTH_LOADING,
} from './types';

export const loadUser = () => dispatch => {
  setAuthToken(getCookie('token'));
  try {
    dispatch({ type: USER_LOADING });
    if (isAuth()) {
      dispatch({ type: USER_LOADED, payload: isAuth() });
    } else {
      dispatch({ type: AUTH_ERROR });
    }
  } catch (err) {
    console.log(err);
  }
};
export const registerUser = dataToSubmit => async dispatch => {
  try {
    dispatch(authLoading());
    const { data } = await axios.post('/api/user/register', dataToSubmit);
    toast.success(data.msg);
    dispatch({ type: REGISTER_USER, payload: data });
  } catch (err) {
    toast.error(err.response.data.msg);
    dispatch({ type: AUTH_ERROR });
    console.log(err);
  }
};

export const activeAccount = token => async dispatch => {
  try {
    dispatch(authLoading());
    console.log(token);
    const { data } = await axios.post(`/api/user/activation`, { token });
    toast.success(data.msg);
    dispatch({
      type: ACTIVE_ACCOUNT,
    });
  } catch (err) {
    toast.error(err.response.data.msg);
    dispatch({ type: AUTH_ERROR });
    console.log(err);
  }
};
export const forgetPassword = email => async dispatch => {
  try {
    dispatch(authLoading());
    const { data } = await axios.post(`/api/password/forget`, email);
    toast.success(data.msg);
    dispatch({
      type: FORGET_PASSWORD,
    });
  } catch (err) {
    toast.error(err.response.data.msg);
    dispatch({ type: AUTH_ERROR });
    console.log(err);
  }
};
export const resetPassword = dataToSubmit => async dispatch => {
  try {
    dispatch(authLoading());
    const { data } = await axios.put(`/api/resetPassword`, dataToSubmit);
    toast.success(data.msg);
    dispatch({
      type: RESET_PASSWORD,
    });
  } catch (err) {
    toast.error(err.response.data.msg);
    dispatch({ type: AUTH_ERROR });
    console.log(err);
  }
};

export const login = dataToSubmit => async dispatch => {
  try {
    dispatch(authLoading());
    const res = await axios.post('/api/user/login', dataToSubmit);
    authenticate(res);
    toast.success(`Hey ${res.data.user.name}, welcome back`);

    dispatch({ type: LOGIN_USER, payload: res.data.user });
  } catch (err) {
    toast.error(err.response.data.msg);
    dispatch({ type: AUTH_ERROR });
    console.log(err);
  }
};

export const logout = () => async dispatch => {
  signOut();
  dispatch({ type: LOGOUT });
};

export const authLoading = () => ({ type: AUTH_LOADING });
