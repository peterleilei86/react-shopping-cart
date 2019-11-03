import {
  LOAD_CART,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  CHANGE_PRODUCT_QUANTITY
} from './actionTypes';

const initialState = {
  products: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_CART:
      return {
        ...state,
        products: action.payload
      };
    case ADD_PRODUCT:
      const product = state.products.find(cp => cp.id === action.payload.id);
      if (!product) {
        return {
          ...state,
          products: state.products.concat(action.payload)
        };
      }
      return {
        ...state,
        products: state.products.map(p => {
          if (p.id === action.payload.id) {
            return { ...p, quantity: p.quantity + action.payload.quantity };
          }
          return p;
        })
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload.id)
      };
    case CHANGE_PRODUCT_QUANTITY:
      return {
        ...state,
        products: state.products.map(p => {
          if (p.id === action.payload.id) {
            return { ...p, quantity: action.payload.quantity };
          }
          return p;
        })
      };
    default:
      return state;
  }
}
