import  { useEffect, useState } from 'react';
import { FaCoins } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [payments, setPayments] = useState([]);

    const [currentUser, setCurrentUser] = useState([]);

    useEffect(() => {
        getDataa()
    }, [user])

    const getDataa = async () => {
        const { data } = await axiosSecure(
            `/user/${user?.email}`)
        setCurrentUser(data)
    }

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            try {
                const { data } = await axiosSecure.get(`/payments/${user?.email}`);
                setPayments(data);
            } catch (error) {
                console.error('Failed to fetch payment history', error);
            }
        };

        fetchPaymentHistory();
    }, [user, axiosSecure]);

    return (
        <div className="">

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
            <h1 className="text-3xl font-semibold text-center mb-8 mt-12">Payment History</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">#</th>
                            <th className="py-2 px-4 border-b">Transaction ID</th>
                            <th className="py-2 px-4 border-b">Date</th>
                            <th className="py-2 px-4 border-b">Amount (USD)</th>
                            <th className="py-2 px-4 border-b">Coins</th>
                            <th className="py-2 px-4 border-b">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id}>
                                <td className="py-2 px-4 border-b">{index + 1}</td>
                                <td className="py-2 px-4 border-b">{payment.transactionId}</td>
                                <td className="py-2 px-4 border-b">{new Date(payment.date).toLocaleString()}</td>
                                <td className="py-2 px-4 border-b">{payment.price}</td>
                                <td className="py-2 px-4 border-b">{payment.coin}</td>
                                <td className="py-2 px-4 border-b">{payment.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
