"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/DeliveryBoySignup.module.css'; 

const DeliveryBoySignup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    const response = await fetch('/api/deliveryBoy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    console.log('data :>> ', data);
    if (data.success) {
      setMessage('Signup successful!');
      router.push('/deliverypartner');
    } else {
      setMessage(`Error: ${data.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>DeliveryBoy Signup</h1>
      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="username">Username :</label>
          <input
            type="text"
            id="username"
            className={styles.input}
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            className={styles.input}
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            id="password"
            className={styles.input}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.button} onClick={handleSignup}>Signup</button>
        <p className={styles.error}>{message}</p>
      </div>
    </div>
  );
};

export default DeliveryBoySignup;
