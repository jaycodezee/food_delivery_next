"use client"
import { useEffect, useState } from 'react';
import React from 'react'
import DeliveryHeader from '../../_componet/deliveryHeader'
import styles from '../../styles/deliveryDashboard.module.css'

function page() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch('/api/orders');
      const data = await response.json();
      console.log('data :>> ', data);
      if (data.success) {
        setOrders(data.data);
      } else {
        setMessage('Error fetching orders');
      }
    };

    fetchOrders();
  }, []);

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
      <h1 className={styles.title}>Delivery Partner Dashboard</h1>
      <p>{message}</p>
      <div className={styles.orders}>
        {orders.map(order => (
          <div key={order._id} className={styles.order}>
            <p>Order ID: {order._id}</p>
            <p>Customer: {order.Name}</p>
            <p>Status: {order.status}</p>
            <button onClick={() => handleAcceptOrder(order._id)} className={styles.acceptButton}>Accept</button>
            <button onClick={() => handleCancelOrder(order._id)} className={styles.cancelButton}>Cancel</button>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default page
