import { useEffect, useState } from "react";
import { FaCoins, FaEdit, FaTrashAlt } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyTaskList = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [tasks, setTasks] = useState([]);

    const [currentUser, setCurrentUser] = useState([]);
    // console.log(isTaskCreator);

    useEffect(() => {
        getDataa()
    }, [user])

    const getDataa = async () => {
        const { data } = await axiosSecure(
            `/user/${user?.email}`)
        setCurrentUser(data)
    }
    // console.log(currentUser);

    useEffect(() => {
        getData();
    }, [user]);

    const getData = async () => {
        const { data } = await axiosSecure(`/my-task-list/${user?.email}`);
        setTasks(data);
    };

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/task/${item._id}`);

                if (res.data.deletedCount > 0) {
                    getDataa()
                    // Remove the deleted task from the state
                    const remaining = tasks.filter(cof => cof._id !== item._id);
                    setTasks(remaining);


                    Swal.fire({
                        icon: "success",
                        title: `${item.title} has been deleted`,
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
                        <div className="badge badge-primary font-bold ml-1">{currentUser?.coin}</div>
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
            <SectionTitle heading="Manage All Task" subHeading="Hurry up"></SectionTitle>

            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Task Count</th>
                                <th>Payable Amount</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.total}</td>
                                    <td>
                                        <Link to={`/dashboard/updateTask/${item._id}`}>
                                            <button className="btn btn-ghost btn-lg bg-orange-500">
                                                <FaEdit className="text-white"></FaEdit>
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteItem(item)}
                                            className="btn btn-ghost btn-lg"
                                        >
                                            <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyTaskList;
