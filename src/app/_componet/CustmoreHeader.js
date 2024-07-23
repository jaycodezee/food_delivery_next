'use client'
import Link from 'next/link';
import { useState,useEffect } from 'react'; 
import styles from '../styles/CustmoreHeader.module.css'
import { useRouter } from 'next/navigation';

const CustmoreHeader = () => {
    // const [user, setUser] = useState(null); 
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const cartNumber = 0; 
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem("userdata");
        if (user) {
            setIsAuthenticated(true);
        }
    }, []);
    
    const logout = () => {
        localStorage.removeItem("userdata");
        setIsAuthenticated(false);
        router.push("/");
        setTimeout(() => {
            window.location.reload(false); 
        }, 300);
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
                isAuthenticated ?
                    <>
                        <li className={styles.navItem}>
                            <Link href="/myprofile"  className={styles.navLink} >profile</Link>
                        </li>
                        <li className={styles.navItem}>
                                <span onClick={logout} className={styles.navLink} style={{ cursor: 'pointer' }}>
                                    Logout
                                </span>
                            </li>
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
