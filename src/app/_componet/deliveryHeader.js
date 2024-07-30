"use client" 
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/CustmoreHeader.module.css';

const DeliveryHeader = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("deliveryBoy");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);


  const logout = () => {
    localStorage.removeItem('deliveryBoy');
    localStorage.removeItem('cart');
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
                    <Link href="/deliverypartner/dashboard" className={styles.navLink}>Profile</Link>
                  </li>
                  <li className={styles.navItem}>
                    <span onClick={logout} className={styles.navLink} style={{ cursor: 'pointer' }}>Logout</span>
                  </li>
                </>
                :
                <>
                  <li className={styles.navItem}>
                    <Link href="/deliverypartner" className={styles.navLink}>Login/SignUp</Link>
                  </li>
                </>
            }
            <li className={styles.navItem}>
              {/* <Link href="/" className={styles.navLink}>Delivery Partner</Link> */}
              {/* <Link href="/" className={styles.navLink}>Delivery Partner</Link> */}
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default DeliveryHeader;
