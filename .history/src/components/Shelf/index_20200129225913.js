import React, { useState, useEffect } from 'react';
import Spinner from '../Spinner';
import ShelfHeader from './ShelfHeader';
import ProductList from './ProductList';
import { useFilter } from '../../services/filters/context';
import { useShelf } from '../../services/shelf/context';

import './style.scss';

const Shelf = () => {
  const {
    shelf: { products, sort },
    fetchProducts
  } = useShelf();
  const { filters } = useFilter();
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setIsloading(true);
    fetchProducts().then(_ => {
      setIsloading(false);
    });
  }, [filters, sort, fetchProducts]);

  return (
    <React.Fragment>
      {isLoading && <Spinner />}
      <div className="shelf-container">
        <ShelfHeader productsLength={products.length} />
        <ProductList products={products} />
      </div>
    </React.Fragment>
  );
};

export default Shelf;
