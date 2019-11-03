import React from 'react';
import sortReducer from '../services/sort/reducer';
import { UPDATE_SORT } from '../services/sort/actionTypes';
import { useUseContext } from '.';

const SortContext = React.createContext();
function SortProvider({ children }) {
  const [{ type }, dispatch] = React.useReducer(sortReducer, { type: '' });

  const updateSort = sort => {
    dispatch({
      type: UPDATE_SORT,
      payload: sort
    });
  };
  return (
    <SortContext.Provider value={{ sort: type, updateSort }}>
      {children}
    </SortContext.Provider>
  );
}

const useSort = () => useUseContext(SortContext);

export { SortProvider, useSort };
