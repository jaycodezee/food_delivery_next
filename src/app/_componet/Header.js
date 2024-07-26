"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import styles from "../styles/Header.module.css";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
    router.push("/");
    // setTimeout(() => {
    //     window.location.reload(false);
    // }, 300);
  };
  const deleteacc = () => {
    router.push("/delete-account");
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/image.png" alt="Logo" />
      </div>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className={`${styles.nav} ${isOpen ? styles.open : ""}`}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li className={styles.navItem}>
                <Link href="/Restaurant/dashboard" className={styles.navLink}>
                  Dashboard
                </Link>
              </li>
              <li className={styles.navItem}>
                <span
                  onClick={logout}
                  className={styles.navLink}
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </span>
              </li>
              <li className={styles.navItem}>
                <Link
                  href="/Restaurant/delete-account"
                  className={styles.navLink}
                >
                  Delete Account
                </Link>
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
