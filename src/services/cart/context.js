import React, { createContext, useReducer, useContext } from 'react';
import {
  LOAD_CART,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  CHANGE_PRODUCT_QUANTITY,
  UPDATE_TOTAL
} from './actionTypes';

function cartReducer(state, action) {
  switch (action.type) {
    case LOAD_CART:
      return {
        ...state,
        cartProducts: action.payload
      };
    case ADD_PRODUCT:
      const productToAdd = action.payload;
      const isInCart = !!state.cartProducts.find(p => p.id === productToAdd.id);
      const newProducts = isInCart
        ? state.cartProducts.map(p => {
            if (p.id === productToAdd.id) {
              return { ...p, quantity: p.quantity + productToAdd.quantity };
            }
            return p;
          })
        : [...state.cartProducts, productToAdd];
      return {
        ...state,
        cartProducts: newProducts
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        cartProducts: state.cartProducts.filter(p => p.id !== action.payload.id)
      };
    case CHANGE_PRODUCT_QUANTITY:
      const { id, quantity } = action.payload;
      return {
        ...state,
        cartProducts: state.cartProducts.map(p => {
          if (p.id === id) {
            return { ...p, quantity: p.quantity + quantity };
          }
          return p;
        })
      };
    case UPDATE_TOTAL:
      return {
        ...state,
        total: action.payload
      };
    default:
      return state;
  }
}

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const initialState = JSON.parse(window.localStorage.getItem('cart')) || {
    cartProducts: [],
    total: {
      productQuantity: 0,
      installments: 0,
      totalPrice: 0,
      currencyId: 'USD',
      currencyFormat: '$'
    }
  };
  const [{ cartProducts, total }, dispatch] = useReducer(
    cartReducer,
    initialState
  );

  const loadCart = products =>
    dispatch({
      type: LOAD_CART,
      payload: products
    });

  const addProduct = product =>
    dispatch({
      type: ADD_PRODUCT,
      payload: product
    });

  const removeProduct = product =>
    dispatch({
      type: REMOVE_PRODUCT,
      payload: product
    });

  const changeProductQuantity = (id, quantity = 1) =>
    dispatch({
      type: CHANGE_PRODUCT_QUANTITY,
      payload: { id, quantity }
    });

  const updateTotal = cartProducts => {
    let productQuantity = cartProducts.reduce((sum, p) => {
      sum += p.quantity;
      return sum;
    }, 0);

    let totalPrice = cartProducts.reduce((sum, p) => {
      sum += p.price * p.quantity;
      return sum;
    }, 0);

    let installments = cartProducts.reduce((greater, p) => {
      greater = p.installments > greater ? p.installments : greater;
      return greater;
    }, 0);

    let cartTotal = {
      productQuantity,
      installments,
      totalPrice,
      currencyId: 'USD',
      currencyFormat: '$'
    };

    dispatch({
      type: UPDATE_TOTAL,
      payload: cartTotal
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        total,
        loadCart,
        addProduct,
        removeProduct,
        changeProductQuantity,
        updateTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw Error('Context must be wrapped in a Provider');
  }
  return context;
};

export { CartProvider, useCart };
