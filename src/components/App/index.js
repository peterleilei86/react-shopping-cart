import React from 'react';
import Shelf from '../Shelf';
import Filter from '../Shelf/Filter';
import GithubCorner from '../github/Corner';
import FloatCart from '../FloatCart';
import { FilterProvider } from '../../services/filters/context';
import { ShelfProvider } from '../../services/shelf/context';
import { CartProvider } from '../../services/cart/context';

const App = () => (
  <React.Fragment>
    <GithubCorner />
    <CartProvider>
      <main>
        <FilterProvider>
          <ShelfProvider>
            <Filter />
            <Shelf />
          </ShelfProvider>
        </FilterProvider>
      </main>
      <FloatCart />
    </CartProvider>
  </React.Fragment>
);

export default App;
