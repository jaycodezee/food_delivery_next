"use client"
import { useState } from "react";
import { useCart } from "../_componet/CartContext";
import Payment from '../_componet/Payment';
import { useAuth } from '../utils/auth'; 
import styles from "../styles/Cart.module.css"; 
import CustomerHeader from "../_componet/CustmoreHeader";

const CartPage = () => {
  useAuth();
  const { cartItems, cartNumber, removeFromCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const orderAmount = cartItems.reduce((total, item) => total + item.price, 0);
  const deliveryCharge = orderAmount >= 499 ? 0 : 49;
  const gstRate = 0.18;
  const gstAmount = orderAmount * gstRate;
  const totalAmount = orderAmount + deliveryCharge + gstAmount;

  return (
    <main className={styles.cartContainer}>
      <title>Add to cart</title>
      <CustomerHeader />
      <h1>Shopping Cart</h1>
      {cartNumber === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className={styles.cartList}>
          {cartItems.map(item => (
            <div key={item._id} className={styles.cartItem}>
              <img src={item.img_path} alt={item.name} className={styles.cartItemImage} />
              <div className={styles.cartItemDetails}>
                <h2 className={styles.cartItemName}>{item.name}</h2>
                <p className={styles.cartItemPrice}>₹{item.price.toFixed(2)}</p>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <Payment
            cartItems={cartItems}
            totalAmount={totalAmount}
            paymentMethod={paymentMethod}
            removeFromCart={removeFromCart}  
          />
        </div>
      )}
    </main>
  );
};

export default CartPage;
