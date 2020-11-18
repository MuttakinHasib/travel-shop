import { GET_PRODUCT, SET_LOADING, UPLOAD_PRODUCT } from '../../actions/types';

const initial = {
  products: [],
  postSize: 0,
  loading: false,
};

export default (state = initial, action) => {
  switch (action.type) {
    case UPLOAD_PRODUCT:
      return { ...state, loading: false };
    case GET_PRODUCT:
      return {
        ...state,
        products: action.loadMore
          ? [...state.products, ...action.payload]
          : action.payload,
        postSize: action.postSize,
        loading: false,
      };
    case SET_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};
