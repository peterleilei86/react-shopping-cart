import React from 'react';
import totalReducer, { initialState } from '../services/total/reducer';
import { UPDATE_CART } from '../services/cart/actionTypes';
import { useUseContext } from '.';
import { useCart } from './Cart';

const TotalContext = React.createContext();

function TotalProvider({ children }) {
  const [{ data }, dispatch] = React.useReducer(totalReducer, initialState);
  const { cartProducts } = useCart();

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
      type: UPDATE_CART,
      payload: cartTotal
    });
  };

  React.useEffect(() => {
    updateTotal(cartProducts);
  }, [cartProducts]);

  return (
    <TotalContext.Provider value={{ cartTotal: data, updateTotal }}>
      {children}
    </TotalContext.Provider>
  );
}

const useTotal = () => useUseContext(TotalContext);

export { TotalProvider, useTotal };
