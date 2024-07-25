"use client"
import { useCart } from './CartContext'; 
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/CustmoreHeader.module.css';

const CustmoreHeader = (props) => {
    // console.log('props :>> ', props);
  const { cartItems, cartNumber, addToCart, removeFromCart } = useCart();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("userdata");
    if (user) {
      setIsAuthenticated(true);
    }
    const userStorage = JSON.parse(localStorage.getItem('user'));
    setUser(userStorage);
  }, []);

  useEffect(() => {
    if (props.cartData) {
      if (cartItems.length && cartItems[0].resto_id !== props.cartData.resto_id) {
        localStorage.removeItem('cart');
        addToCart(props.cartData);
      } else {
        addToCart(props.cartData);
      }
    }
  }, [props.cartData]);

  useEffect(() => {
    if (props.removeCartData) {
      removeFromCart(props.removeCartData);
    }
  }, [props.removeCartData]);

  const logout = () => {
    localStorage.removeItem('userdata');
    setIsAuthenticated(false);
    router.push('/');
  };

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="/favicon.ico" alt="Logo" />
        </div>
        <div className={styles.hamburger}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className={`${styles.nav}`}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/" className={styles.navLink}>Home</Link>
            </li>
            {
              isAuthenticated ?
                <>
                  <li className={styles.navItem}>
                    <Link href="/" className={styles.navLink}>Profile</Link>
                  </li>
                  <li className={styles.navItem}>
                    <span onClick={logout} className={styles.navLink} style={{ cursor: 'pointer' }}>Logout</span>
                  </li>
                </>
                :
                <>
                  <li className={styles.navItem}>
                    <Link href="/user" className={styles.navLink}>Login/SignUp</Link>
                  </li>
                </>
            }
            <li className={styles.navItem}>
              <Link href={cartNumber ? "/cart" : "#"} className={styles.navLink}>Cart({cartNumber})</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/Restaurant" className={styles.navLink}>Add Restaurant</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/deliverypartner" className={styles.navLink}>Delivery Partner</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default CustmoreHeader;
