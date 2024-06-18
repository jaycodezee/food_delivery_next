// pages/login.js
'use cilent'
import { useState } from 'react';
import styles from '../styles/Login.module.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add form submission logic here
        console.log(formData);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Login</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className={styles.button} type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
