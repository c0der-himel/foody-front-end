import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { css } from '@emotion/react';
import RingLoader from 'react-spinners/RingLoader';

const override = css`
  margin: 30px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckOutForm = ({ cart, user, dispatch, clearCart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const price = cart.cartTotalAmount;
  const [errors, setErrors] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    fetch(
      'https://powerful-retreat-84363.herokuapp.com/create-payment-intent',
      {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ price }),
      }
    )
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    setProcessing(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });
    if (error) {
      setSuccess('');
      setErrors(error.message);
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setErrors('');
    }
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });
    if (intentError) {
      setSuccess('');
      setErrors(intentError.message);
    } else {
      setSuccess('Payment processed successfully');
      setErrors('');
      console.log(paymentIntent);
      toast.success('Payment processed successfully', {
        position: 'bottom-left',
        autoClose: 3000,
      });
      const items = cart.cartItems;
      const orders = [];
      for (let item of items) {
        orders.push({
          name: item.name,
          quantity: item.cartQuantity,
          price: item.price,
          img: 'item.img',
          category: item.category,
          username: user.displayName,
          email: user.email,
          userPhoto: user.photoURL,
          paymentCreated: paymentIntent.created,
          paymentTransaction: paymentIntent.client_secret,
          status: 'Payment Done',
        });
      }
      axios
        .post('https://powerful-retreat-84363.herokuapp.com/orders', orders)
        .then((res) => {
          toast.success('Payment done. Enjoy your food.', {
            position: 'bottom-left',
            autoClose: 3000,
          });
          dispatch(clearCart());
          console.log(res.data);
        })
        .catch((err) => console.log(err));
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      {errors && (
        <div className="p-1.5 my-5 bg-rose-500 text-white text-center rounded-full font-bold">
          {errors}
        </div>
      )}
      {success && (
        <div className="p-1.5 my-5 bg-emerald-500 text-white text-center rounded-full font-bold">
          {success}
        </div>
      )}
      {processing ? (
        <RingLoader
          css={override}
          size={50}
          color={'#f59e0b'}
          loading={processing}
        />
      ) : (
        <button
          type="submit"
          disabled={!stripe || success}
          className="px-16 py-3 border border-transparent rounded-full shadow-sm text-base font-bold text-white bg-orange-600 hover:bg-orange-700 transition duration-300"
        >
          Pay ${price}
        </button>
      )}
    </form>
  );
};

export default CheckOutForm;
