import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const [price, setPrice] = useState(0);
    const [coins, setCoins] = useState(0);
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    // const [cart, refetch] = useCart();
    const navigate = useNavigate();

    //console.log(coins, price);
    useEffect(() => {
        const fetchTempData = async () => {
            try {
                const { data } = await axiosSecure.get(`/temp-payment/${user?.email}`);
                if (data) {
                    setPrice(data.price);
                    setCoins(data.coins);
                }
            } catch (error) {
                console.error('Error fetching temp payment data:', error);
            }
        };

        fetchTempData();
    }, [axiosSecure, user]);

   // console.log(coins, price);

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price: price })
                .then(res => {
                  //  console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, price])

    const handleSubmit = async e => {
        e.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod)
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous'
                    }
                }
            })

        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {

                console.log('transaction id', paymentIntent.id);

                setTransactionId(paymentIntent.id);

                     // now save the payment in the database
                     const payment = {
                        email: user.email,
                        name: user.displayName,
                        coin: coins,
                        price: price,
                        transactionId: paymentIntent.id,
                        date: new Date(), // utc date convert. use moment js to 
                        status: 'pending'
                    }

                    const res = await axiosSecure.post('/payments', payment);

                    console.log('payment saved', res.data);
                   // refetch();

                    if (res.data?.paymentResult?.insertedId) {

                        await axiosSecure.delete(`/temp-payment/${user.email}`);
                        Swal.fire({
                            icon: "success",
                            title: "Payment Successful!",

                        });

                        navigate('/dashboard/history')
                    }

            }
        }


    }
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
            <button className="btn btn-sm btn-primary my-4"
                type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>

            <p className="text-red-600">{error}</p>

            {transactionId && <p className="text-green-600">
                Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;