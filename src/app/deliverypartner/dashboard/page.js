"use client"
import { useEffect, useState } from 'react';
import React from 'react';
import DeliveryHeader from '../../_componet/deliveryHeader';
import styles from '../../styles/deliveryDashboard.module.css';
import deliveryAuth from '../../_hooks/deliveryAuth'

function Page() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');
  const authenticated = deliveryAuth();
  
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch('/api/orders');
      const data = await response.json();
      console.log('data :>> ', orders);
      if (data.success) {
        setOrders(data.orders); 
      } else {
        setMessage('Error fetching orders');
      }
    };

    fetchOrders();
  }, []);
  
  
    if (!authenticated) {
        return null; 
    }
    
  const handleAcceptOrder = async (orderId) => {
    const response = await fetch(`/api/orders/${orderId}/accept`, {
      method: 'POST',
    });
    const data = await response.json();
    if (data.success) {
      setMessage('Order accepted');
      setOrders(orders.map(order => order._id === orderId ? { ...order, status: 'Accepted' } : order));
    } else {
      setMessage('Error accepting order');
    }
  };

  const handleCancelOrder = async (orderId) => {
    const response = await fetch(`/api/orders/${orderId}/cancel`, {
      method: 'POST',
    });
    const data = await response.json();
    if (data.success) {
      setMessage('Order canceled');
      setOrders(orders.map(order => order._id === orderId ? { ...order, status: 'Canceled' } : order));
    } else {
      setMessage('Error canceling order');
    }
  };

  return (
    <div>
      <DeliveryHeader />
      <div className={styles.container}>
        <title>Delivery Partner Dashboard</title>
        <h1 className={styles.title}>Delivery Partner Dashboard</h1>
        <p>{message}</p>
        <div className={styles.orders}>
          {orders.length === 0 ? (
            <p>No orders available.</p>
          ) : (
            orders.map(order => (
              <div key={order._id} className={styles.order}>
                <p>Order ID: {order._id}</p>
                <br />
                <p>Customer: {order.user_id?.name || 'Unknown'}</p>
                <p>Mobile: {order.user_id?.mobile || 'Unknown'}</p>
                <p>Address: {order.user_id?.address || 'Unknown'}</p>
                <p>Status: {order.status}</p>
                <div>
                  <h3>Food Items:</h3>
                  <ul>
                    {order.foodItemIds?.length > 0 ? (
                      order.foodItemIds.map(foodItem => (
                        <li key={foodItem._id}>{foodItem.name}</li>
                      ))
                    ) : (
                      <li>No food items</li>
                    )}
                  </ul>
                </div>
                <button onClick={() => handleAcceptOrder(order._id)} className={styles.acceptButton}>Accept</button>
                <button onClick={() => handleCancelOrder(order._id)} className={styles.cancelButton}>Cancel</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
