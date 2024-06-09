import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { FaCoins } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';
//import { useNavigate } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const MakePayment = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [currentUser, setCurrentUser] = useState([]);
   // const navigate = useNavigate();
    useEffect(() => {
        getDataa()
    }, [user])

    const getDataa = async () => {
        const { data } = await axiosSecure(
            `/user/${user?.email}`)
        setCurrentUser(data)
    }

    return (
        <div className='mb-96'>
            <div className="flex gap-8 justify-end mr-8">

                <div>
                    <div className="flex pt-4">
                        <FaCoins className="text-yellow-500 text-xl" />
                        <div className="badge badge-primary font-bold ml-1">
                            {currentUser?.coin}</div>
                    </div>
                    <div className="mt-4 font-bold">
                        Name: {user?.displayName}</div>

                </div>

                <div>
                    <label tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                        title={user?.displayName}
                    >

                        <div className="tool w-10 rounded-full" >
                            <img className="idd"
                                src={user?.photoURL ||
                                    "https://i.ibb.co/sjymvr8/Capture4.png"} />
                        </div>


                    </label>



                    <div className="font-bold">
                        Role: {currentUser?.accountType}</div>
                </div>
                <div>
                    <IoIosNotifications className="text-4xl mt-4" />
                </div>


            </div>

            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm

                    ></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default MakePayment;