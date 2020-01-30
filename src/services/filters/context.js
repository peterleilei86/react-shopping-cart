import React, { createContext, useContext, useReducer } from 'react';
import { UPDATE_FILTER } from './actionTypes';

const filterReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FILTER:
      const filter = action.payload;
      const newFilters =
        state.filters.indexOf(filter) < 0
          ? [...state.filters, filter]
          : state.filters.filter(f => f !== filter);
      return {
        ...state,
        filters: newFilters
      };
    default:
      return state;
  }
};

const FiltersContext = createContext();

function FilterProvider({ children }) {
  const [{ filters }, dispatch] = useReducer(filterReducer, { filters: [] });

  const updateFilters = filter => {
    dispatch({
      type: UPDATE_FILTER,
      payload: filter
    });
  };

  return (
    <FiltersContext.Provider value={{ filters, updateFilters }}>
      {children}
    </FiltersContext.Provider>
  );
}

const useFilter = () => {
  const context = useContext(FiltersContext);
  if (context === undefined) {
    throw new Error('Context must be used within a Provider!');
  }
  return context;
};

export { FilterProvider, useFilter };
