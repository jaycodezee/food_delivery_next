import { useState } from 'react';
import styles from '../styles/Payment.module.css';
import { useRouter } from 'next/navigation';
import { useCart } from '../_componet/CartContext';

const Payment = ({ cartItems, totalAmount }) => {
  const router = useRouter();
  const { clearCart } = useCart(); // Use clearCart
  const [paymentStatus, setPaymentStatus] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePayment = async () => {
    const restoId = cartItems.length > 0 ? cartItems[0].resto_id : null;
    const userid = JSON.parse(localStorage.getItem('userdata'));
    if (!paymentMethod) {
      setPaymentStatus('Please select a payment method.');
      return;
    }

    try {
      const orderDetails = {
        user_id: userid._id,
        foodItemIds: cartItems.map(item => item._id),
        resto_id: restoId,
        deliveryBoy_id: null,
        amount: totalAmount,
      };

      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });

      const data = await response.json();
      if (data.success) {
        setPaymentStatus('Order placed successfully!');
        clearCart(); 
        localStorage.removeItem("cart")
        setTimeout(() => {
        router.push('/Profile');
        }, 500);
      } else {
        setPaymentStatus(`Error placing order: ${data.error}`);
      }
    } catch (error) {
      setPaymentStatus(`Error placing order: ${error.message}`);
    }
  };

  return (
    <div className={styles.paymentContainer}>
      <div className={styles.paymentMethods}>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            onChange={() => setPaymentMethod('card')}
          />
          Card
        </label>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="upi"
            onChange={() => setPaymentMethod('upi')}
          />
          UPI
        </label>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="cash"
            onChange={() => setPaymentMethod('cash')}
          />
          Cash on Delivery
        </label>
      </div>
      <button onClick={handlePayment} className={styles.paymentButton}>
        Proceed to Payment
      </button>
      {paymentStatus && <p className={styles.paymentStatus}>{paymentStatus}</p>}
    </div>
  );
};

export default Payment;
