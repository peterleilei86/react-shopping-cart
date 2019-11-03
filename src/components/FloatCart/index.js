import React, { useState } from 'react';
import CartProduct from './CartProduct';
import { formatPrice } from '../../services/util';
import { useCart } from '../../contexts/Cart';
import { useTotal } from '../../contexts/Total';
import './style.scss';

const FloatCart = props => {
  const { cartProducts, removeProduct, changeProductQuantity } = useCart();
  const { cartTotal } = useTotal();
  const [isOpen, setOpen] = useState(false);

  const openFloatCart = () => setOpen(true);
  const closeFloatCart = () => setOpen(false);

  const proceedToCheckout = () => {
    const {
      totalPrice,
      productQuantity,
      currencyFormat,
      currencyId
    } = cartTotal;

    if (!productQuantity) {
      alert('Add some product in the cart!');
    } else {
      alert(
        `Checkout - Subtotal: ${currencyFormat} ${formatPrice(
          totalPrice,
          currencyId
        )}`
      );
    }
  };

  const products = cartProducts.map(p => {
    return (
      <CartProduct
        product={p}
        removeProduct={removeProduct}
        changeProductQuantity={changeProductQuantity}
        key={p.id}
      />
    );
  });

  let classes = ['float-cart'];

  if (!!isOpen) {
    classes.push('float-cart--open');
  }

  return (
    <div className={classes.join(' ')}>
      {isOpen ? (
        <div onClick={() => closeFloatCart()} className="float-cart__close-btn">
          X
        </div>
      ) : (
        <span
          onClick={() => openFloatCart()}
          className="bag bag--float-cart-closed"
        >
          <span className="bag__quantity">{cartTotal.productQuantity}</span>
        </span>
      )}
      <div className="float-cart__content">
        <div className="float-cart__header">
          <span className="bag">
            <span className="bag__quantity">{cartTotal.productQuantity}</span>
          </span>
          <span className="header-title">Cart</span>
        </div>

        <div className="float-cart__shelf-container">
          {products}
          {!products.length && (
            <p className="shelf-empty">
              Add some products in the cart <br />
              :)
            </p>
          )}
        </div>

        <div className="float-cart__footer">
          <div className="sub">SUBTOTAL</div>
          <div className="sub-price">
            <p className="sub-price__val">
              {`${cartTotal.currencyFormat} ${formatPrice(
                cartTotal.totalPrice,
                cartTotal.currencyId
              )}`}
            </p>
            <small className="sub-price__installment">
              {!!cartTotal.installments && (
                <span>
                  {`OR UP TO ${cartTotal.installments} x ${
                    cartTotal.currencyFormat
                  } ${formatPrice(
                    cartTotal.totalPrice / cartTotal.installments,
                    cartTotal.currencyId
                  )}`}
                </span>
              )}
            </small>
          </div>
          <div onClick={() => proceedToCheckout()} className="buy-btn">
            Checkout
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatCart;
