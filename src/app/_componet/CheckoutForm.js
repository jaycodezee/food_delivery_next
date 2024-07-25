import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import styles from '../styles/CheckoutForm.module.css'; // Adjust path as needed

const CheckoutForm = ({ cartItems, totalAmount }) => {
  const router = useRouter()
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
    } else {
      // Handle successful payment here (e.g., send paymentMethod.id to your server)
      console.log('Payment successful!', paymentMethod);
      alert("Payment successful!,Delever item within the 25 min")
      setTimeout(() => {
        router.push("/")
      }, 200);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Payment Details</h2>
      <CardElement className={styles.cardElement} />
      {error && <div className={styles.error}>{error}</div>}
      <button type="submit" disabled={!stripe || loading} className={styles.button}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

export default CheckoutForm;
