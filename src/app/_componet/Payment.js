import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm.js'; 

const stripePromise = loadStripe('pk_test_51PgOruKypdIcrErOeBxDKsm8rA37vY774VicymHR0dJJeyF7AyIOgyjIOwd4OvH8xgUEkVz75pGrLORznr6C94qn00CPI143ko');

const Payment = ({ cartItems, totalAmount }) => {
  return (
    <div>
      <h2>Payment</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm cartItems={cartItems} totalAmount={totalAmount} />
      </Elements>
    </div>
  );
};

export default Payment;
