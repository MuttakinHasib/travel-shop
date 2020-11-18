import axios from 'axios';
import { toast } from 'react-toastify';

import { GET_PRODUCT, SET_LOADING, UPLOAD_PRODUCT } from './types';

export const uploadProduct = product => async dispatch => {
  try {
    await axios.post('/api/product/uploadProduct', product);
    dispatch({ type: UPLOAD_PRODUCT });
    toast.success('Product uploaded');
  } catch (err) {
    console.log(err.message);
    toast.error(err.response.data.msg);
  }
};

export const getProduct = loadData => async dispatch => {
  try {
    dispatch(loading());
    const { data } = await axios.post('/api/product/getProducts', loadData);

    dispatch({
      type: GET_PRODUCT,
      payload: data?.products,
      postSize: data?.postSize,
      loadMore: data?.loadMore,
    });
  } catch (err) {
    console.log(err.message);
    toast.error(err.response.data.msg);
  }
};

export const loading = () => ({ type: SET_LOADING });
