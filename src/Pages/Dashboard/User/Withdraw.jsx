import { useState, useEffect } from 'react';
import { FaCoins } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const WithdrawForm = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [coins, setCoins] = useState(0);
    const [withdrawCoin, setWithdrawCoin] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [paymentSystem, setPaymentSystem] = useState('Bkash');
    const [accountNumber, setAccountNumber] = useState('');
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
        const fetchUserData = async () => {
            try {
                const { data } = await axiosSecure.get(`/user/${user?.email}`);
                setCoins(data.coin);
            } catch (error) {
                console.error('Failed to fetch user data', error);
            }
        };

        fetchUserData();
    }, [user, axiosSecure]);

    useEffect(() => {
        setWithdrawAmount((withdrawCoin / 20).toFixed(2)); // 20 coins = 1 dollar
    }, [withdrawCoin]);

    const validateAccountNumber = (accountNumber) => {
        const accountNumberRegex = /^01\d{9}$/;
        return accountNumberRegex.test(accountNumber);
    };

    const handleWithdraw = async (e) => {
        e.preventDefault();

        if (!validateAccountNumber(accountNumber)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Account Number',
                text: 'Account number must be numeric, start with "01", and be exactly 11 digits long.',
            });
            return;
        }

        if (withdrawAmount > (coins / 20)) {
            Swal.fire({
                icon: 'error',
                title: 'Insufficient Coins',
                text: 'You do not have enough coins to withdraw this amount.',
            });
            return;
        }

        const withdrawData = {
            worker_email: user.email,
            worker_name: user.displayName,
            withdraw_coin: withdrawCoin,
            withdraw_amount: withdrawAmount,
            payment_system: paymentSystem,
            account_number: accountNumber,
            withdraw_time: new Date(),
        };

        try {
            const response = await axiosSecure.post('/withdraw', withdrawData);
            if (response.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Withdrawal Successful',
                    text: 'Your withdrawal request has been submitted successfully.',
                });

                // Optional: refetch user data to update the UI
                const { data } = await axiosSecure.get(`/user/${user?.email}`);
                setCoins(data.coin);
            } else {
                throw new Error('Failed to process withdrawal request');
            }
        } catch (error) {
            console.error('Failed to submit withdrawal request', error);
            Swal.fire({
                icon: 'error',
                title: 'Withdrawal Failed',
                text: 'There was an error submitting your withdrawal request.',
            });
        }
    };

    return (
        <div className="container mx-auto py-8">
            <div className="flex gap-8 justify-end mr-8">

                <div>
                    <div className="flex pt-4">
                        <FaCoins className="text-yellow-500 text-xl" />
                        <div className="badge badge-primary font-bold ml-1">
                            {coins}</div>
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
            <h1 className="text-3xl font-semibold text-center mb-8">Withdraw Coins</h1>
            <div className="max-w-lg mx-auto bg-white p-8 border border-gray-200 rounded">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxWithdraw">
                        Maximum Withdrawal Amount (USD)
                    </label>
                    <input
                        id="maxWithdraw"
                        type="text"
                        value={(coins / 20).toFixed(2)}
                        readOnly
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <form onSubmit={handleWithdraw}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="withdrawCoin">
                            Coins to Withdraw
                        </label>
                        <input
                            id="withdrawCoin"
                            type="number"
                            value={withdrawCoin}
                            onChange={(e) => setWithdrawCoin(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="withdrawAmount">
                            Withdraw Amount (USD)
                        </label>
                        <input
                            id="withdrawAmount"
                            type="number"
                            value={withdrawAmount}
                            readOnly
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentSystem">
                            Payment System
                        </label>
                        <select
                            id="paymentSystem"
                            value={paymentSystem}
                            onChange={(e) => setPaymentSystem(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="Bkash">Bkash</option>
                            <option value="Rocket">Rocket</option>
                            <option value="Nagad">Nagad</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="accountNumber">
                            Account Number
                        </label>
                        <input
                            id="accountNumber"
                            type="text"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Withdraw
                    </button>
                </form>
            </div>
        </div>
    );
};

export default WithdrawForm;
