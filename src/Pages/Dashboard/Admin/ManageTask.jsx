import { useEffect, useState } from "react";
import Helmet from "react-helmet";
import {  FaCoins, FaTrashAlt } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";

import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageTask = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

   // const { user } = useAuth();

   // const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);
   // const [tasks, setTasks] = useState([]);

    //total available coin find
    useEffect(() => {
        getDataa()
    }, [user])

    const getDataa = async () => {
        const { data } = await axiosSecure(
            `/user/${user?.email}`)
        setUsers(data)
    }

    useEffect(() => {
        getData()
    }, [user])

    const getData = async () => {
        const { data } = await axiosPublic(
            `/tasklist`)
        setTasks(data)
    }

    const openModal = (task) => {
        setSelectedTask(task);
    };

    const closeModal = () => {
        setSelectedTask(null);
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

                    // refetch to update the ui
                    //refetch();

                    Swal.fire({
                        icon: "success",
                        title: `${item.title} has been deleted`,
                    });

                    const remaining = tasks.filter(cof => cof._id != item._id);
                    setTasks(remaining);
                }
            }
        });
    }

    return (
        <div>
            <Helmet>
                <title>Manage Task</title>
            </Helmet>
            <div className="flex flex-col sm:flex-row gap-8 justify-end mr-8">

                <div className="">
                    <div className="flex pt-4">
                       
                        <div className="badge badge-primary font-bold ml-1">Admin</div>
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
                        Role: {users?.accountType}</div>
                </div>
                <div>
                    <IoIosNotifications className="text-4xl mt-4" />
                </div>


            </div>
            <SectionTitle heading="Manage All Task" subHeading="Lets Manage"></SectionTitle>

            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Title</th>
                                <th>TaskCreator Name</th>
                                <th>Task Count</th>
                                <th>Coin Needed</th>
                                <th>Availability</th>
                                <th>View Task</th>
                                <th>Delete Task</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tasks.map((item, index) => <tr key={item._id}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        {
                                            item.title
                                        }
                                    </td>
                                    <td>
                                        {item.author_name}
                                    </td>
                                    <td>
                                        {item.quantity}

                                    </td>
                                    <td>
                                        {item.total}
                                    </td>
                                    <td>
                                        {item.quantity > 0 ? "available" : "unavailable"}
                                    </td>

                                    <td>
                                        <button className='btn'
                                            onClick={() => openModal(item)}>View Task</button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteItem(item)}
                                            className="btn btn-ghost btn-lg">
                                            <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                        </button>
                                    </td>
                                </tr>)
                            }
                        </tbody>


                    </table>
                </div>
            </div>
            {selectedTask && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md w-4/5 h-4/5 max-w-5xl max-h-[80%] flex flex-col justify-between">
                        <div className="overflow-y-auto ">
                           <div className="flex flex-col justify-center items-center">
                           <h3 className="text-lg font-bold mb-4">Task Details</h3>
                            <img src={selectedTask.image} alt={selectedTask.title} className="w-[40%] h-auto rounded-lg shadow-md" />
                           </div>
                            <div className="mt-4">

                                <p className="text-lg mb-4"><span className="text-blue-600 font-bold ">Author:</span> {selectedTask.author_name}</p>
                                <p className="text-lg mb-4"><span className="text-blue-600 font-bold">Author Email:</span> {selectedTask.author_email}</p>
                                <p className="text-lg mb-4"><span className="text-blue-600 font-bold ">
                                    selectedTask Quantity:</span> <span className="uppercase">{selectedTask.quantity}</span></p>
                                <p className="text-lg mb-4 text-justify">
                                    <span className="text-blue-600 font-bold">Description:</span> {selectedTask.description}
                                </p>
                                <p className="text-lg mb-4"><span className="text-blue-600 font-bold">
                                    Payment(Per Task):</span> {selectedTask.price}</p>

                                <p className="text-lg mb-4"><span className="text-blue-600 font-bold">
                                    Deadline:</span> {new Date(selectedTask.deadline).toLocaleDateString()}</p>
                                <p className="text-lg mb-4"><span className="text-blue-600 font-bold">
                                    Submission Info:</span> {selectedTask.info}</p>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button className="btn bg-gray-200 text-gray-800 px-4 py-2 rounded-md" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageTask;