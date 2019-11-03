import React from 'react';
import cartReducer from '../services/cart/reducer';
import {
  LOAD_CART,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  CHANGE_PRODUCT_QUANTITY
} from '../services/cart/actionTypes';
import { useUseContext } from '.';
const CartContext = React.createContext();

function CartProvider({ children }) {
  const [{ products }, dispatch] = React.useReducer(cartReducer, {
    products: []
  });

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

  const changeProductQuantity = product =>
    dispatch({
      type: CHANGE_PRODUCT_QUANTITY,
      payload: product
    });

  React.useEffect(() => {
    const products = JSON.parse(window.localStorage.getItem('__USER_CART__'));
    if (products) {
      loadCart(products);
    }
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem('__USER_CART__', JSON.stringify(products));
  }, [products]);

  return (
    <CartContext.Provider
      value={{
        cartProducts: products,
        addProduct,
        removeProduct,
        changeProductQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

const useCart = () => useUseContext(CartContext);

export { CartProvider, useCart };
