'use client'
import { useState } from 'react';
import styles from '../styles/Signup.module.css';
import { signIn } from 'next-auth/react';
import Google from "./Google";
import { useRouter } from "next/navigation";


const Signup = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    restaurantName: '',
    password: '',
    confirmPassword: '',
    email: '',
    city: '',
    address: '',
    pinCode: '',
    restaurantContact: '',
  });

  const [errors, setErrors] = useState({});
  const router = useRouter();


  const validate = () => {
    const newErrors = {};

    if (!formData.ownerName) newErrors.ownerName = 'Please enter the owner name';
    if (!formData.restaurantName) newErrors.restaurantName = 'Please enter the restaurant name';
    if (!formData.password) newErrors.password = 'Please enter a password';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.email) {
      newErrors.email = 'Please enter an email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.city) newErrors.city = 'Please enter the city';
    if (!formData.address) newErrors.address = 'Please enter the address';
    if (!formData.pinCode) {
      newErrors.pinCode = 'Please enter the pin code';
    } else if (!/^\d{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = 'Please enter a valid 6-digit pin code';
    }
    if (!formData.restaurantContact) {
      newErrors.restaurantContact = 'Please enter the restaurant contact';
    } else if (!/^\d{10}$/.test(formData.restaurantContact)) {
      newErrors.restaurantContact = 'Please enter a valid 10-digit contact number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      // Example of handling the form data, replace with your actual form handling logic
      const response = await fetch('http://localhost:3000/api/restaurant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful form submission, e.g., redirect or show success message
        router.push('/Restaurant');
      } else {
        // Handle errors
        console.error('Form submission failed');
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Restaurant Signup</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>Owner Name:</label>
          <input
            type="text"
            name="ownerName"  
            value={formData.ownerName}
            onChange={handleChange}
            required
          />
          {errors.ownerName && <span className={styles.inputError}>{errors.ownerName}</span>}
        </div>
        <div className={styles.inputGroup}>
          <label>Restaurant Name:</label>
          <input
            type="text"
            name="restaurantName"
            value={formData.restaurantName}
            onChange={handleChange}
            required
          />
          {errors.restaurantName && <span className={styles.inputError}>{errors.restaurantName}</span>}
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
          {errors.password && <span className={styles.inputError}>{errors.password}</span>}
        </div>
        <div className={styles.inputGroup}>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <span className={styles.inputError}>{errors.confirmPassword}</span>}
        </div>
        <div className={styles.inputGroup}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className={styles.inputError}>{errors.email}</span>}
        </div>
        <div className={styles.inputGroup}>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          {errors.city && <span className={styles.inputError}>{errors.city}</span>}
        </div>
        <div className={styles.inputGroup}>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          {errors.address && <span className={styles.inputError}>{errors.address}</span>}
        </div>
        <div className={styles.inputGroup}>
          <label>Pin Code:</label>
          <input
            type="number"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            required
          />
          {errors.pinCode && <span className={styles.inputError}>{errors.pinCode}</span>}
        </div>
        <div className={styles.inputGroup}>
          <label>Restaurant Contact:</label>
          <input
            type="number"
            name="restaurantContact"
            value={formData.restaurantContact}
            onChange={handleChange}
            required
          />
          {errors.restaurantContact && <span className={styles.inputError}>{errors.restaurantContact}</span>}
        </div>
        <button className={styles.button} type="submit">Signup</button>
        <br />
      </form>
      <Google/>
    </div>
  );
};

export default Signup;
