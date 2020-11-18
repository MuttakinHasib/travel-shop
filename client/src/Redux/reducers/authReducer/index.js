import { getCookie } from '../../../helpers/auth';
import {
  ACTIVE_ACCOUNT,
  AUTH_ERROR,
  AUTH_LOADING,
  FORGET_PASSWORD,
  LOGIN_USER,
  LOGOUT,
  REGISTER_USER,
  RESET_PASSWORD,
  USER_LOADED,
  USER_LOADING,
} from '../../actions/types';

const initial = {
  user: null,
  isAuth: false,
  isLoading: false,
  token: getCookie(),
};
export default (state = initial, action) => {
  switch (action.type) {
    case USER_LOADING:
      return { ...state, isLoading: true };
    case USER_LOADED:
      return { ...state, isAuth: true, isLoading: false, user: action.payload };
    case REGISTER_USER:
    case ACTIVE_ACCOUNT:
    case RESET_PASSWORD:
    case FORGET_PASSWORD:
      return {
        ...state,
        ...action.payload,
        isAuth: false,
        isLoading: false,
      };
    case LOGIN_USER:
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        isLoading: false,
      };
    case LOGOUT:
    case AUTH_ERROR:
      return {
        ...state,
        token: null,
        user: null,
        isAuth: false,
        isLoading: false,
      };
    case AUTH_LOADING:
      return { ...state, isLoading: true };
    default:
      return state;
  }
};
