import React from 'react';
import { ProductProvider } from './Products';
import { SortProvider } from './Sort';
import { FiltersProvider } from './Filters';
import { CartProvider } from './Cart';
import { TotalProvider } from './Total';

export const useUseContext = context => {
  const value = React.useContext(context);
  if (value === undefined) {
    throw Error('Context consumer must be wrapped in a Provider');
  }
  return value;
};

function AppProviders({ children }) {
  return (
    <FiltersProvider>
      <SortProvider>
        <ProductProvider>
          <CartProvider>
            <TotalProvider>{children}</TotalProvider>
          </CartProvider>
        </ProductProvider>
      </SortProvider>
    </FiltersProvider>
  );
}

export default AppProviders;
