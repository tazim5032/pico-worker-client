import { useEffect, useState } from "react";
import { FaCoins } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import Card from "../../../../Components/Card";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const TaskList = () => {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 6;

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

    useEffect(() => {
        fetchTasks(currentPage);
    }, [currentPage]);

    const fetchTasks = (page) => {
        fetch(`http://localhost:5000/all-task?page=${page}&limit=${itemsPerPage}`)
            .then(res => res.json())
            .then(data => {
                setItems(data.tasks);
                setTotalPages(data.totalPages);
            });
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="mb-48">
            <div className="flex flex-col sm:flex-row gap-8 justify-end mr-8">

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

            
            <h1 className='text-center mt-12 text-4xl font-semibold'>
                Featured Task
            </h1>
            <h1 className='text-center mt-2'>
                Highlighting Outstanding Tasks for Your Inspiration
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12 mx-[2%] sm:mx-[4%]">
                {items.map(item => (
                    <Card key={item._id} item={item}></Card>
                ))}
            </div>

            <div className="flex justify-center mt-8">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn"
                >
                    Previous
                </button>
                <span className="mx-4">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="btn"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TaskList;
