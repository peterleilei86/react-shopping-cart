import React, { useReducer, useEffect } from 'react';
import shelfReducer from '../services/shelf/reducer';
import { fetchProducts, compare } from '../services/shelf/actions';
import { FETCH_PRODUCTS, IS_FETCHING } from '../services/shelf/actionTypes';
import { useFilters } from './Filters';
import { useSort } from './Sort';
import { useUseContext } from '.';

const ProductContext = React.createContext();

function ProductProvider({ children }) {
  const [{ products, isLoading }, dispatch] = useReducer(shelfReducer, {
    products: [],
    isLoading: false
  });

  const { filters } = useFilters();
  const { sort } = useSort();

  useEffect(() => {
    dispatch({ type: IS_FETCHING });
    fetchProducts()
      .then(products => {
        if (!!filters && filters.length > 0) {
          products = products.filter(p =>
            filters.find(f => p.availableSizes.find(size => size === f))
          );
        }

        if (!!sort) {
          products = products.sort(compare[sort]);
        }

        dispatch({
          type: FETCH_PRODUCTS,
          payload: products
        });
      })
      .catch(e => {
        dispatch({
          type: FETCH_PRODUCTS,
          payload: []
        });
      });
  }, [filters, sort]);

  return (
    <ProductContext.Provider value={{ products, isLoading }}>
      {children}
    </ProductContext.Provider>
  );
}

const useProducts = () => useUseContext(ProductContext);

export { ProductProvider, useProducts };
