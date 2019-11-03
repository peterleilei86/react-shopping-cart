import React, { useState } from 'react';
import Thumb from '../../Thumb';
import { formatPrice } from '../../../services/util';

const CartProduct = ({ product, removeProduct, changeProductQuantity }) => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleMouseOver = () => {
    setIsMouseOver(true);
  };

  const handleMouseOut = () => {
    setIsMouseOver(false);
  };

  const handleOnIncrease = () => {
    const newProduct = { ...product, quantity: product.quantity + 1 };
    changeProductQuantity(newProduct);
  };

  const handleOnDecrease = () => {
    const newProduct = { ...product, quantity: product.quantity - 1 };
    changeProductQuantity(newProduct);
  };

  const classes = ['shelf-item'];

  if (!!isMouseOver) {
    classes.push('shelf-item--mouseover');
  }

  return (
    <div className={classes.join(' ')}>
      <div
        className="shelf-item__del"
        onMouseOver={() => handleMouseOver()}
        onMouseOut={() => handleMouseOut()}
        onClick={() => removeProduct(product)}
      />
      <Thumb
        classes="shelf-item__thumb"
        src={require(`../../../static/products/${product.sku}_2.jpg`)}
        alt={product.title}
      />
      <div className="shelf-item__details">
        <p className="title">{product.title}</p>
        <p className="desc">
          {`${product.availableSizes[0]} | ${product.style}`} <br />
          Quantity: {product.quantity}
        </p>
      </div>
      <div className="shelf-item__price">
        <p>{`${product.currencyFormat}  ${formatPrice(product.price)}`}</p>
        <div>
          <button
            onClick={handleOnDecrease}
            disabled={product.quantity === 1 ? true : false}
            className="change-product-button"
          >
            -
          </button>
          <button onClick={handleOnIncrease} className="change-product-button">
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
