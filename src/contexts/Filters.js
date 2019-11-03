import React from 'react';
import filtersReducer from '../services/filters/reducer';
import { UPDATE_FILTER } from '../services/filters/actionTypes';
import { useUseContext } from '.';

const FitlersContext = React.createContext();
function FiltersProvider({ children }) {
  const [{ items }, dispatch] = React.useReducer(filtersReducer, { items: [] });

  const updateFilters = filters => {
    dispatch({
      type: UPDATE_FILTER,
      payload: filters
    });
  };

  return (
    <FitlersContext.Provider value={{ filters: items, updateFilters }}>
      {children}
    </FitlersContext.Provider>
  );
}

const useFilters = () => useUseContext(FitlersContext);

export { FiltersProvider, useFilters };
