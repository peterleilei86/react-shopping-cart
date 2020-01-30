import React, { useState, useEffect } from 'react';
import CartProduct from './CartProduct';
import { formatPrice } from '../../services/util';
import { useCart } from '../../services/cart/context';

import './style.scss';

const FloatCart = () => {
  const [isOpen, setIsopen] = useState(false);
  const { cartProducts, updateTotal, total } = useCart();

  useEffect(() => {
    updateTotal(cartProducts);
    window.localStorage.setItem(
      'cart',
      JSON.stringify({ cartProducts, total })
    );
  }, [cartProducts]);

  const proceedToCheckout = () => {
    const { totalPrice, productQuantity, currencyFormat, currencyId } = total;

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

  let classes = ['float-cart'];

  if (!!isOpen) {
    classes.push('float-cart--open');
  }

  return (
    <div className={classes.join(' ')}>
      {/* If cart open, show close (x) button */}
      {isOpen && (
        <div onClick={() => setIsopen(false)} className="float-cart__close-btn">
          X
        </div>
      )}

      {/* If cart is closed, show bag with quantity of product and open cart action */}
      {!isOpen && (
        <span
          onClick={() => setIsopen(true)}
          className="bag bag--float-cart-closed"
        >
          <span className="bag__quantity">{total.productQuantity}</span>
        </span>
      )}

      <div className="float-cart__content">
        <div className="float-cart__header">
          <span className="bag">
            <span className="bag__quantity">{total.productQuantity}</span>
          </span>
          <span className="header-title">Cart</span>
        </div>

        <div className="float-cart__shelf-container">
          <Products cartProducts={cartProducts} />
          {!cartProducts.length && (
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
              {`${total.currencyFormat} ${formatPrice(
                total.totalPrice,
                total.currencyId
              )}`}
            </p>
            <small className="sub-price__installment">
              {!!total.installments && (
                <span>
                  {`OR UP TO ${total.installments} x ${
                    total.currencyFormat
                  } ${formatPrice(
                    total.totalPrice / total.installments,
                    total.currencyId
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

function Products({ cartProducts }) {
  return cartProducts.map(p => {
    return <CartProduct product={p} key={p.id} />;
  });
}

export default FloatCart;
