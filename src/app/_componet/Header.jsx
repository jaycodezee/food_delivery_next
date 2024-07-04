'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import Link component from next/link
import styles from '../styles/Header.module.css';

const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem("restaurantUser");
        if (user) {
            setIsAuthenticated(true);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("restaurantUser");
        setIsAuthenticated(false);
        router.push("/Restaurant");
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src="/image.png" alt="Logo" />
            </div>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link href="/" className={styles.navLink}>
                            Home
                        </Link>
                    </li>
                    {isAuthenticated ? (
                        <>
                            <li className={styles.navItem}>
                                <Link href="/Restaurant" className={styles.navLink}>
                                    Profile
                                </Link>
                            </li>
                            <li className={styles.navItem}>
                                <span onClick={logout} className={styles.navLink} style={{ cursor: 'pointer' }}>
                                    Logout
                                </span>
                            </li>
                        </>
                    ) : (
                        <li className={styles.navItem}>
                            <Link href="/Restaurant" className={styles.navLink}>
                                Login / Signup
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
