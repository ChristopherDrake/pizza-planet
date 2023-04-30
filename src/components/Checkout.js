import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/functions';

function CheckoutForm({ cartItems }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const createPaymentIntent = firebase.functions().httpsCallable('createPaymentIntent');
    const paymentIntentData = {
        amount: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
      };
      

    try {
      const { data: clientSecret } = await createPaymentIntent(paymentIntentData);

      // Confirm the card payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        console.error('[error]', error);
      } else {
        console.log('[PaymentIntent]', paymentIntent);
        // Handle post-payment actions
      }
    } catch (error) {
      console.error('[createPaymentIntent error]', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  )
}

export default CheckoutForm;
