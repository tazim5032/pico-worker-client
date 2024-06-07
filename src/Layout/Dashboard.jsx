import { FaAddressBook, FaBook, FaCoins, FaEnvelope, FaHistory, FaHome, FaList, FaSearch, FaUsers }
    from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { Link, NavLink, Outlet } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import Footer from "../Pages/Shared/Footer";
import useAdmin from "../Hooks/useAdmin";
const Dashboard = () => {
    const { user } = useAuth();
    const [isAdmin] = useAdmin();
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);
    console.log(isAdmin);

    useEffect(() => {
        getData()
    }, [user])

    const getData = async () => {
        const { data } = await axiosSecure(
            `/user/${user?.email}`)
        setUsers(data)
    }

    return (
        <div className="flex">

            {/* sidebar */}
            <div className="w-64 min-h-screen bg-cyan-400">
                <Link className="btn btn-ghost text-xl text-black font-bold" to='/'>
                    Micro<span className="text-white">Task</span></Link>
                <ul className="menu p-4">
                    {
                        isAdmin ? <>
                            {/* admin */}

                            <li>
                                <NavLink to='/dashboard/adminHome'>
                                    <FaHome />
                                    Admin Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/manage-user'>
                                    <FaUsers />
                                    Manage Users</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/manage-task'>
                                    <FaAddressBook />
                                    Manage Task</NavLink>
                            </li>

                        </>
                            : <>

                                {/* Author */}
                                <li>
                                    <NavLink to='/dashboard/authorHome'>
                                        <FaHome />
                                        Author Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/add-new-task'>
                                        <IoMdAdd />
                                        Add New Task</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/my-task-list'>
                                        <FaList></FaList>
                                        My Task's List</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/pending'>
                                        <FaList></FaList>
                                        Pending Task List</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/purchase-coins'>
                                        <FaCoins></FaCoins>
                                        Purchase Coin</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/payment-history'>
                                        <FaHistory></FaHistory>
                                        Payment History</NavLink>
                                </li>

                                <br />
                                <br />

                                {/* user */}
                                <li>
                                    <NavLink to='/dashboard/userHome'>
                                        <FaHome />
                                        User Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/taskList'>
                                        <FaBook></FaBook>
                                        Task List</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/userSubmissions'>
                                        <FaAddressBook />
                                        My Submissions</NavLink>
                                </li>




                            </>
                    }





                    <div className="divider"></div>


                    {/* shared navlinks */}

                    <li>
                        <NavLink to='/'>
                            <FaHome />
                            Home</NavLink>
                    </li>


                    <li>
                        <NavLink to='/order/salad'>
                            <FaSearch />
                            Menu</NavLink>
                    </li>


                    <li>
                        <NavLink to='/order/contact'>
                            <FaEnvelope />
                            Contact</NavLink>
                    </li>


                </ul>
            </div>

            {/* dashboard content */}
            <div className="flex-1 mt-12">
                <div className="flex gap-8 justify-end mr-8">

                    <div>
                        <div className="flex pt-4">
                            <FaCoins className="text-yellow-500 text-xl" />
                            <div className="badge badge-primary font-bold ml-1">{users?.coin}</div>
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
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Dashboard;