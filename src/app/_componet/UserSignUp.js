import { useState } from 'react';
import styles from '../styles/Signup.module.css';
import { useRouter } from "next/navigation"; 

const UserSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    address: '',
    mobile: '',
  });

  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Please enter your name';
    if (!formData.password) newErrors.password = 'Please enter a password';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.email) {
      newErrors.email = 'Please enter an email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.city) newErrors.city = 'Please enter your city';
    if (!formData.address) newErrors.address = 'Please enter your address';
    if (!formData.mobile) {
      newErrors.mobile = 'Please enter your mobile number';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
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
      try {
        const response = await fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log(data);

        if (data.success) {
          // Handle successful signup
          localStorage.setItem('user', JSON.stringify(data.result));
          router.push('/'); // Redirect to homepage or dashboard after successful signup
        } else {
          // Handle signup failure
          if (data.message === 'Email already registered') {
            setErrors({ email: 'Email is already registered' });
          } else {
            console.error('Signup failed:', data.message);
          }
        }
      } catch (error) {
        console.error('Form submission failed', error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <title>User signup</title>
      <h1 className={styles.title}>User Signup</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span className={styles.inputError}>{errors.name}</span>}
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
          <label>Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
          {errors.mobile && <span className={styles.inputError}>{errors.mobile}</span>}
        </div>
        <button className={styles.button} type="submit">Signup</button>
      </form>
    </div>
  );
};

export default UserSignup;
