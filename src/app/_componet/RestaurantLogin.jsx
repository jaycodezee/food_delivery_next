import { useState } from 'react';
import styles from '../styles/Login.module.css';
import { useRouter } from "next/navigation";

const RestaurantLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ email: false, password: false });
    const router = useRouter();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const emailError = !validateEmail(email);
        const passwordError = !password;

        if (emailError || passwordError) {
            setError({ email: emailError, password: passwordError });
            return;
        } else {
            setError({ email: false, password: false });
        }

        try {
            let response = await fetch("http://localhost:3000/api/restaurant", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, login: true }),
            });

            response = await response.json();

            if (response.success) {
                const { result } = response;
                delete result.password;
                localStorage.setItem("restaurantUser", JSON.stringify(result));
                router.push("/Restaurant/dashboard");
            } else {
                alert("Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login. Please try again.");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Login</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                    />
                    {error.email && <span className={styles.error}>Please enter a valid email</span>}
                </div>
                <div className={styles.inputGroup}>
                    <label>Password:</label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                    />
                    {error.password && <span className={styles.error}>Please enter a valid password</span>}
                </div>
                <div className={styles.inputGroup}>
                    <button type="submit" className={styles.button}>Login</button>
                </div>
            </form>
        </div>
    );
};

export default RestaurantLogin;
