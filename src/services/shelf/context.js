import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';
import { useFilter } from '../filters/context';
import { productsAPI } from '../util';
import { FETCH_PRODUCTS } from './actionTypes';
import { UPDATE_SORT } from './actionTypes';

const compare = {
  lowestprice: (a, b) => {
    if (a.price < b.price) return -1;
    if (a.price > b.price) return 1;
    return 0;
  },
  highestprice: (a, b) => {
    if (a.price > b.price) return -1;
    if (a.price < b.price) return 1;
    return 0;
  }
};

function shelfReducer(state, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    case UPDATE_SORT:
      return {
        ...state,
        sort: action.payload
      };
    default:
      return state;
  }
}

const ShelfContext = createContext();

const ShelfProvider = ({ children }) => {
  const initialState = {
    products: [],
    sort: ''
  };
  const { filters } = useFilter();
  const [state, dispatch] = useReducer(shelfReducer, initialState);

  const fetchProducts = () => {
    return axios.get(productsAPI).then(res => {
      let { products } = res.data;

      if (!!filters && filters.length > 0) {
        products = products.filter(p =>
          filters.find(f => p.availableSizes.find(size => size === f))
        );
      }

      if (!!state.sort) {
        products = products.sort(compare[state.sort]);
      }

      dispatch({
        type: FETCH_PRODUCTS,
        payload: products
      });
    });
  };

  const updateSort = sort => {
    dispatch({
      type: UPDATE_SORT,
      payload: sort
    });
  };

  return (
    <ShelfContext.Provider value={{ shelf: state, fetchProducts, updateSort }}>
      {children}
    </ShelfContext.Provider>
  );
};

const useShelf = () => {
  const context = useContext(ShelfContext);
  if (context === undefined) {
    throw Error('Context must be wrapped in a Provider!');
  }

  return context;
};

export { ShelfProvider, useShelf };
