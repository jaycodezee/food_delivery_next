import { useState } from 'react';
import styles from '../styles/Login.module.css';
import { useRouter } from "next/navigation";

const RestaurantLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ email: false, password: false });
    const [loading, setLoading] = useState(false); // Add loading state
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

        setLoading(true); 

        try {
            // console.log("Starting login request"); // Log start
            let response = await fetch("http://localhost:3000/api/restaurant", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, login: true }),
            });

            response = await response.json();
            // console.log("Login request completed", response);

            if (response.success) {
                const { result } = response;
                delete result.password;
                // console.log("Storing user in localStorage", result);
                localStorage.setItem("restaurantUser",JSON.stringify(result));
                console.log("Redirecting to /Restaurant/dashboard");
                router.push("/Restaurant/dashboard");
            }else {
                alert("Eneter valid email or password ")
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login. Please try again.");
        } finally {
            setLoading(false); // Reset loading state
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
                        disabled={loading} // Disable input when loading
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
                        disabled={loading} // Disable input when loading
                    />
                    {error.password && <span className={styles.error}>Please enter a valid password</span>}
                </div>
                <div className={styles.inputGroup}>
                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RestaurantLogin;
