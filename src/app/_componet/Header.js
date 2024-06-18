// components/Header.js

import styles from '../styles/Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src="/image.png" alt="Logo" />
            </div>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <a href="/" target="_blank" rel="noopener noreferrer"  className={styles.navLink}>Home</a>
                    </li>
                    <li className={styles.navItem}>
                        <a href="/Restaurant" className={styles.navLink}>Login / Signup</a>
                    </li>
                    <li className={styles.navItem}>
                        <a href="/profile" className={styles.navLink}>Profile</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
