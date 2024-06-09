import { useEffect, useState } from "react";
import { FaCoins } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

//const stripePromise = loadStripe("your-public-stripe-key");
//const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const PaymentOptions = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [currentUser, setCurrentUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getDataa()
    }, [user])

    const getDataa = async () => {
        const { data } = await axiosSecure(
            `/user/${user?.email}`)
        setCurrentUser(data)
    }
    const handlePayment = (price, coins) => {
        Swal.fire({
            title: `Are you sure you want to buy ${coins} coins?`,
            text: `This will cost ${price} USD.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, buy it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axiosSecure.post("/temp-payment", {
                        price,
                        coins,
                        email: user.email
                    });

                    if (response.data.success) {
                        

                        // Navigate to the checkout page or handle next steps
                       // navigate('/checkout', { state: { price, coins } });
                       navigate('/dashboard/make-payment')
                    } else {
                        throw new Error("Failed to save payment details");
                    }
                } catch (error) {
                    console.error("Error saving payment details:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Payment Error",
                        text: "Failed to save payment details"
                    });
                }
            }
        });
    };

    return (
        <div className="mb-96">
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
            <h1 className='text-center mt-12 text-4xl font-semibold text-cyan-500'>Buy Coins</h1>
            <h2 className='text-center mt-2 text-lg text-gray-600'>Select a package to purchase coins</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-12 mx-[2%] sm:mx-[4%]">
                <button

                    className="bg-gradient-to-r 
                        from-cyan-400 to-cyan-600 
                        text-white shadow-lg 
                        rounded-lg p-8 cursor-pointer
                         hover:scale-105 transform transition-transform 
                         duration-300 ease-in-out hover:shadow-2xl"
                    onClick={() => handlePayment(1, 10)}
                >
                    <h2 className="text-3xl font-bold mb-4">10 Coins</h2>
                    <p className="text-2xl">1 USD</p>
                    <div className="mt-4">
                        <p className="text-sm">Regular</p>
                    </div>
                </button>


                <button

                    className="bg-gradient-to-r 
                        from-cyan-400 to-cyan-600 
                        text-white shadow-lg 
                        rounded-lg p-8 cursor-pointer
                         hover:scale-105 transform transition-transform 
                         duration-300 ease-in-out hover:shadow-2xl"
                    onClick={() => handlePayment(9, 100)}
                >
                    <h2 className="text-3xl font-bold mb-4">100 Coins</h2>
                    <p className="text-2xl">9 USD</p>
                    <div className="mt-4">
                        <p className="text-sm">Save 1 USD</p>
                    </div>
                </button>


                <button

                    className="bg-gradient-to-r 
                        from-cyan-400 to-cyan-600 
                        text-white shadow-lg 
                        rounded-lg p-8 cursor-pointer
                         hover:scale-105 transform transition-transform 
                         duration-300 ease-in-out hover:shadow-2xl"
                    onClick={() => handlePayment(19, 500)}
                >
                    <h2 className="text-3xl font-bold mb-4">500 Coins</h2>
                    <p className="text-2xl">19 USD</p>
                    <div className="mt-4">
                        <p className="text-sm">Save 31 USD</p>
                    </div>
                </button>


                <button

                    className="bg-gradient-to-r 
                        from-cyan-400 to-cyan-600 
                        text-white shadow-lg 
                        rounded-lg p-8 cursor-pointer
                         hover:scale-105 transform transition-transform 
                         duration-300 ease-in-out hover:shadow-2xl"
                    onClick={() => handlePayment(39, 1000)}
                >
                    <h2 className="text-3xl font-bold mb-4">1000 Coins</h2>
                    <p className="text-2xl">39 USD</p>
                    <div className="mt-4">
                        <p className="text-sm">Save 61 USD</p>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default PaymentOptions;
