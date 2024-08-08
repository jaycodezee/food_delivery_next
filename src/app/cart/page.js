"use client";
import { useState, useEffect } from "react";
import { useCart } from "../_componet/CartContext";
import Payment from '../_componet/Payment';
import styles from "../styles/Cart.module.css"; 
import CustomerHeader from "../_componet/CustmoreHeader";
import { useRouter } from "next/navigation";
import Head from 'next/head';

const CartPage = () => {
  const { cartItems, cartNumber, removeFromCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const router = useRouter();

  useEffect(() => {
    const storedUserData = localStorage.getItem('userdata');
    if (!storedUserData) {
      router.push('/user');
    }
  }, [router]);

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
    <>
      <Head>
        <title>Shopping Cart</title>
      </Head>
      <main className={styles.cartContainer}>
        <CustomerHeader />
        <h1 className={styles.h1}>Shopping Cart</h1>
        {cartNumber === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
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
            </div>

            <div className={styles.totalAmountContainer}>
              <h2>Order Summary</h2>
              <div className={styles.orderAmount}>
                <span>Order Amount:</span>
                <span>₹{orderAmount.toFixed(2)}</span>
              </div>
              <div className={styles.deliveryCharge}>
                <span>Delivery Charge:</span>
                <span>₹{deliveryCharge.toFixed(2)}</span>
              </div>
              <div className={styles.gstAmount}>
                <span>GST (18%):</span>
                <span>₹{gstAmount.toFixed(2)}</span>
              </div>
              <div className={styles.totalAmount}>
                <span>Total Amount:</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>
            <Payment
              cartItems={cartItems}
              totalAmount={totalAmount}
              paymentMethod={paymentMethod}
              removeFromCart={removeFromCart}
            />
          </>
        )}
      </main>
    </>
  );
};

export default CartPage;
