import { FETCH_PRODUCTS, IS_FETCHING } from './actionTypes';

export default function(state, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        isLoading: false
      };
    case IS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
}
