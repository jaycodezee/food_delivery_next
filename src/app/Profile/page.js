"use client"
import { useState, useEffect } from 'react';
import styles from '../styles/Profile.module.css'; 
import { useRouter } from 'next/navigation';
import CustomerHeader from "../_componet/CustmoreHeader";
import { useAuth } from '../_hooks/userAuth';
import {Spinner} from "@nextui-org/react";

const ProfilePage = () => {
  useAuth()
  const [orders, setOrders] = useState([]);
  const [foodItems, setFoodItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Retrieve userId from local storage
        const user =  JSON.parse(localStorage.getItem('userdata'));
        // console.log('user', user)
        const userId = user._id;
        if (!userId) {
          throw new Error('User ID not found');
        }

        const response = await fetch('/api/order?id='+userId);
        const data = await response.json();
        if (data.success) {
          setOrders(data.orders);
          // console.log('data', data)
          const foodItemIds = data.orders.flatMap(order => order.foodItemIds);
          
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
          setError(data.error);
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  if (loading) return   <Spinner  label="loading" />
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <CustomerHeader />
      <main className={styles.profileContainer}>
        <title>Your Profile</title>
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
