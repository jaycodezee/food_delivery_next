"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/DeliveryBoyLogin.module.css'; 

const DeliveryBoyLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const response = await fetch('/api/deliveryBoy/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    // console.log('data :>> ', data);
    if (data.success) {
      localStorage.setItem('deliveryBoy', JSON.stringify(data.result));
      setMessage('Login successful!');
      router.push('/deliverypartner/dashboard');
    } else {
      setMessage(`Error: ${data.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <title>DeliveryBoy Login</title>
      <h1 className={styles.title}>DeliveryBoy Login</h1>
      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="email">Email :</label>
          <input
            type="text"
            id="email"
            className={styles.input}
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="password">Password :</label>
          <input
            type="password"
            id="password"
            className={styles.input}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.button} onClick={handleLogin}>Login</button>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};

export default DeliveryBoyLogin;
