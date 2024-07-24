'use client';
import { useState } from 'react';
import styles from '../styles/Footer.module.css';

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Subscribed with email:", email);
        setEmail('');
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerSection}>
                    <h3>Explore</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/user">Login</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
                <div className={styles.footerSection}>
                    <h3>Connect</h3>
                    <ul>
                        <li><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                        <li><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                        <li><a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                    </ul>
                </div>
                <div className={styles.footerSection}>
                    <h3>Contact Us</h3>
                    <p>
                        123 Restaurant St,<br />
                        Cityville, State 12345<br />
                        Phone: (123) 456-7890<br />
                        {/* Email: Food@restaurant.com */}
                        <a href="mailto:Food@restaurant.com" target="_blank" rel="noopener noreferrer">Email: Food@restaurant.com</a>
                    </p>
                </div>
            </div>
            <div className={styles.subscribe}>
                <h3>Subscribe Now</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <button type="submit">Subscribe</button>
                </form>
            </div>
            <div className={styles.copyRight}>
                &copy; {new Date().getFullYear()} Restaurant . All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
