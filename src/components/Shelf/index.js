import React from 'react';
import Spinner from '../Spinner';
import ShelfHeader from './ShelfHeader';
import ProductList from './ProductList';
import { useProducts } from '../../contexts/Products';
import './style.scss';

const Shelf = props => {
  const { products, isLoading } = useProducts();

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
