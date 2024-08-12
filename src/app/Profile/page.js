"use client"
import { useState, useEffect } from 'react';
import styles from '../styles/Profile.module.css'; 
import { useRouter } from 'next/navigation';
import CustomerHeader from "../_componet/CustmoreHeader";
import { Spinner } from "@nextui-org/react";

const ProfilePage = () => {
  const [orders, setOrders] = useState([]);
  const [foodItems, setFoodItems] = useState({});
  const [user, setUser] = useState(null);  // Add state for user
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('userdata'));
        const userId = user?._id;
        if (!userId) {
          throw new Error('User ID not found');
        }
        if (!userData) {
          router.push('/user');
          return;
        }
        const userResponse = await fetch(`/api/user/${userId}`);
        const userData = await userResponse.json();
        if (userData.success) {
          setUser(userData.user);
        } else {
          throw new Error(userData.error || 'Failed to fetch user data');
        }

        // Fetch orders
        const ordersResponse = await fetch(`/api/order?id=${userId}`);
        const ordersData = await ordersResponse.json();
        if (ordersData.success) {
          setOrders(ordersData.orders);
          const foodItemIds = ordersData.orders.flatMap(order => order.foodItemIds);
          
          // Fetch food items
          const foodResponse = await fetch('/api/foodItems', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids: foodItemIds })
          });
          const foodData = await foodResponse.json();
          if (foodData.success) {
            const foodItemMap = foodData.foodItems.reduce((map, item) => {
              map[item._id] = item;
              return map;
            }, {});
            setFoodItems(foodItemMap);
          } else {
            setError(foodData.error);
          }
        } else {
          setError(ordersData.error);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  if (loading) return <Spinner label="Loading" />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <CustomerHeader />
      <main className={styles.profileContainer}>
        <title>Your Profile</title>
        <h1>Your Profile</h1>
        {user && (
          <div className={styles.userDetails}>
            <h2>User Details</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email || 'Not provided'}</p>
            <p>Mobile: {user.mobile || 'Not provided'}</p>
            <p>Address: {user.address || 'Not provided'}</p>
          </div>
        )}
        <h1>Your Orders</h1>
        {orders.length === 0 ? (
          <p>You have no orders.</p>
        ) : (
          <div className={styles.orderList}>
            {orders.map(order => (
              <div key={order._id} className={styles.orderItem}>
                <h2>Order ID: {order._id}</h2>
                <br/>
                <p>Time: {order.createdAt}</p>
                <p>Delivery Boy ID: {order.deliveryBoy_id}</p>
                <p>Status: {order.status}</p>
                <p>Total Amount: ₹{order.amount}</p>
                <ul>
                  {order.foodItemIds.map(itemId => {
                    const item = foodItems[itemId];
                    return (
                      <li key={itemId} className={styles.foodItem}>
                        <h4>{item?.name}</h4>
                        <img src={item?.img_path} alt={item?.name} className={styles.foodItemImage} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;
