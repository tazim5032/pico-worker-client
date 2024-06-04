import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useAuth from "../Hooks/useAuth";
import { FaCoins } from "react-icons/fa";

const Card = ({ item }) => {

    const { user } = useAuth();

    //const { _id, title, difficulty, description, marks, deadline, photo, username, email } = item;



    return (
        <motion.div

            className="w-full max-w-xs mx-auto"
        >
            <div className="shadow-2xl rounded-lg overflow-hidden h-full">
                <img className="w-full h-48 object-cover object-center" src={item.image} />
                <div className="py-1 px-6">
                    <h2 className="text-xl font-semibold ">{item.title}</h2>
                    <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm mr-1">
                                Quantity: {item.quantity}
                            </span>
                            <span className='text-sm mr-1'>
                                Payment {item.price}<FaCoins></FaCoins>
                            </span>

                        </div>
                        <span className="text-sm">
                            Deadline: {new Date(item.deadline).toLocaleDateString()}
                        </span>
                    </div>
                </div>

                <div className="px-6 flex justify-end pb-2">
                    <Link to={`/details/${item._id}`} className="text-sm text-gray-600 hover:text-gray-900">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default Card;