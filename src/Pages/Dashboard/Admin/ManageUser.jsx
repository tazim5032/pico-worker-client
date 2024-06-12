import { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { FaCoins } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageUser = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [workers, setWorkers] = useState([]);

  //  const { user } = useAuth();

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
        const { data } = await axiosSecure(
            `/users/worker`)
        setWorkers(data)
    }

    const handleRoleChange = async (id, newRole) => {
        try {
            await axiosSecure.patch(`/users/role/${id}`, { accountType: newRole });
            Swal.fire({
                icon: "success",
                title: "User role updated successfully",
            });
            getData();
        } catch (error) {
            console.error('Failed to update user role:', error);
            Swal.fire({
                icon: "error",
                title: "Failed to update user role",
            });
        }
    };
    const handleReject = async (item) => {
        try {
            await axiosSecure.delete(`/delete-user/${item._id}`);
            // Refresh the task list
            getData();
        } catch (error) {
            console.error('Failed to reject task', error);
        }
    };

    // console.log(workers.length);
    return (
        <div className="mb-96">
            <Helmet>
                <title>Manage User</title>
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
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Photo URL</th>
                            <th>Role</th>
                            <th>Coin</th>
                            <th>Action</th>
                            <th>Update Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            workers.map((item, index) => <tr key={item._id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    {
                                        item.name
                                    }
                                </td>
                                <td>
                                    {item.email}
                                </td>
                                <td>
                                    {/* {user.photoURL} */}
                                    photo

                                </td>
                                <td>
                                    {item.accountType}
                                </td>
                                <td>
                                    {item.coin}
                                </td>
                                <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                    
                                    <button className='btn p-2 bg-red-500 text-white'
                                     onClick={() => handleReject(item)}>Remove</button>
                                </td>
                                <td>
                                    <select
                                        value={item.accountType}
                                        onChange={(e) => handleRoleChange(item._id, e.target.value)}
                                        className="select select-bordered">
                                        <option value="admin">Admin</option>
                                        <option value="taskCreator">Task-Creator</option>
                                        <option value="worker">Worker</option>
                                    </select>
                                </td>
                            </tr>)
                        }
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default ManageUser;