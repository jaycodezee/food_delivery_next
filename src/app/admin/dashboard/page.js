"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/adminDashboard.module.css';

const Page = () => {
  const [user, setUser] = useState([]);
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes,deliveryBoyRes, restaurantRes] = await Promise.all([
          axios.get('/api/user'),
          axios.get('/api/deliveryBoy'),
          axios.get('/api/restaurant'),
        ]);
        setUser(userRes.data.result);
        setDeliveryBoys(deliveryBoyRes.data.result);
        setRestaurants(restaurantRes.data.result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <h1>Admin Dashboard</h1>
      <section>
        <h2>Users</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user) => (
              <tr key={user.id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section>
        <h2>Delivery Boys</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {deliveryBoys.map((deliveryBoy) => (
              <tr key={deliveryBoy.id}>
                <td>{deliveryBoy._id}</td>
                <td>{deliveryBoy.username}</td>
                <td>{deliveryBoy.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section>
        <h2>Restaurants</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant) => (
              <tr key={restaurant.id}>
                <td>{restaurant._id}</td>
                <td>{restaurant.restaurantName}</td>
                <td>{restaurant.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Page;
