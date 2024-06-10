import { FaAddressBook, FaBook, FaCoins, FaEnvelope, FaHistory, FaHome, FaList, FaUsers }
    from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import {  IoMdAdd } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
//import useAxiosSecure from "../Hooks/useAxiosSecure";
//import { useEffect, useState } from "react";
//import useAuth from "../Hooks/useAuth";
import Footer from "../Pages/Shared/Footer";
import useAdmin from "../Hooks/useAdmin";
import useTaskCreator from "../Hooks/useTaskCreator";
//import Notifications from "../Components/Notifications";
//import useAuth from "../Hooks/useAuth";
const Dashboard = () => {
    //const { user } = useAuth();
    const [isAdmin] = useAdmin();
    const [isTaskCreator] = useTaskCreator();
    //const axiosSecure = useAxiosSecure();
    // const [users, setUsers] = useState([]);
    // console.log(users);

    // useEffect(() => {
    //     getData()
    // }, [user])

    // const getData = async () => {
    //     const { data } = await axiosSecure(
    //         `/user/${user?.email}`)
    //     setUsers(data)
    // }

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

                                {
                                    isTaskCreator ? <>
                                        {/* Author */}
                                        <li>
                                            <NavLink to='/dashboard/authorHome'>
                                                <FaHome />
                                                Home</NavLink>
                                        </li>

                                        <li>
                                            <NavLink to='/dashboard/add-new-task'>
                                                <IoMdAdd />
                                                Add New Task</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to='/dashboard/my-task-list'>
                                                <FaList></FaList>
                                                My Task's</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to='/dashboard/payment'>
                                                <FaCoins></FaCoins>
                                                Purchase Coin</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to='/dashboard/history'>
                                                <FaHistory></FaHistory>
                                                Payment History</NavLink>
                                        </li>
                                    </> :

                                        <>
                                            {/* user */}
                                            <li>
                                                <NavLink to='/dashboard/userHome'>
                                                    <FaHome />
                                                    Worker Home</NavLink>
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
                                            <li>
                                                <NavLink to='/dashboard/withdraw'>
                                                    <FaAddressBook />
                                                    Withdraw</NavLink>
                                            </li>
                                        </>

                                }

                            </>
                    }

                    <div className="divider"></div>


                    {/* shared navlinks */}

                    <li>
                        <NavLink to='/'>
                            <FaHome />
                            Home Page</NavLink>
                    </li>


                    <li>
                        <NavLink to='/profile'>
                            <CgProfile />

                            Profile</NavLink>
                    </li>


                    <li>
                        <NavLink to='/contact'>
                            <FaEnvelope />
                            Contact</NavLink>
                    </li>


                </ul>
            </div>

            {/* dashboard content */}
            <div className="flex-1 mt-12">
                
                {/* <Notifications userEmail={user.email} /> */}
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Dashboard;