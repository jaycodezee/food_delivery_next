'use client'
import Link from 'next/link';
import { useState } from 'react'; 
import styles from '../styles/CustmoreHeader.module.css'

const CustmoreHeader = () => {
    const [user, setUser] = useState(null); 
    const cartNumber = 3; 
   
    const logout = () => {
        localStorage.removeItem('user');
        router.push('/user-auth')
    };

    return (
    <div>
       <header className={styles.header}>
       <div className={styles.logo}>
           <img src="/favicon.ico" alt="Logo" />
       </div>
       <div className={styles.hamburger} >
           <span></span>
           <span></span>
           <span></span>
       </div>
       <nav className={`${styles.nav} `}>
           <ul className={styles.navList}>
               <li className={styles.navItem}>
                   <Link href="/" className={styles.navLink}>
                       Home
                   </Link>
               </li>
               {
                user ?
                    <>
                        <li className={styles.navItem}>
                            <Link href="/myprofile"  className={styles.navLink} >{user.name}</Link>
                        </li>
                        <li className={styles.navItem}><button onClick={logout}>Logout</button></li>
                    </>
                    :
                    <>
                        <li className={styles.navItem}>
                            <Link href="/user"  className={styles.navLink}>Login/SignUp</Link>
                        </li>
                    </>
            }
            <li className={styles.navItem}>
                <Link href={cartNumber ? "/cart" : "#"}  className={styles.navLink}>Cart({cartNumber ? cartNumber : 0})</Link>
            </li>
            <li className={styles.navItem}>
                <Link href="/Restaurant"  className={styles.navLink}>Add Restaurant</Link>
            </li>
            <li className={styles.navItem}>
                <Link href="/deliverypartner" className={styles.navLink} >Delivery Partner</Link>
            </li>
           
           </ul>
       </nav>
       </header>
        </div>
    );
};

export default CustmoreHeader;
