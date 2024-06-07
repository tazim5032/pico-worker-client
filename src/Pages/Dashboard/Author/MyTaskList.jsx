import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyTaskList = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [tasks, setTasks] = useState([]);
    

    useEffect(() => {
        getData()
    }, [user])

    const getData = async () => {
        const { data } = await axiosSecure(
            `/my-task-list/${user?.email}`)
        setTasks(data)
    }

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
        <SectionTitle heading="Manage All Task" subHeading="Hurry up"></SectionTitle>

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
                            <th>Task Count</th>
                            <th>Payable Amount</th>
                            <th>Update</th>
                            <th>Delete</th>
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
                                    {item.quantity}
                                </td>
                                <td>
                                    {item.total}
                                  
                                </td>
                                <td>
                                    <Link to={`/dashboard/updateTask/${item._id}`}>
                                        <button
                                            className="btn btn-ghost btn-lg bg-orange-500">
                                            <FaEdit className="text-white 
                                    "></FaEdit>
                                        </button>
                                    </Link>
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
    </div>
    );
};

export default MyTaskList;