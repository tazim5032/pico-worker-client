import { Link } from "react-router-dom";
import { FaCoins } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAdmin from "../../Hooks/useAdmin";
import useTaskCreator from "../../Hooks/useTaskCreator";
//import useCoin from "../../Hooks/useCoin";

const Navbar = () => {

    const { user, logOut } = useAuth();
    const [isAdmin] = useAdmin();
    const [isTaskCreator] = useTaskCreator();
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getData()
    }, [user])

    const getData = async () => {
        const { data } = await axiosSecure(
            `/user/${user?.email}`)
        setUsers(data)
    }

    // console.log(users?.coin);

    const handleLogOut = () => {
        logOut()
            .then(() => {

            })
            .catch(error => {
                console.log(error);
            })

    }

    return (
        <>
            <div className="navbar fixed z-10 bg-opacity-70 bg-black text-white
            mx-auto">
                <div className="navbar-start">
                    <div className="dropdown ">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className=" bg-cyan-500 menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <Link to='/'>Home</Link>
                            </li>


                            {
                                isAdmin && <li><Link to="/dashboard/adminHome">
                                    Dashboard</Link></li>
                            }
                            {
                                isTaskCreator && <li><Link to="/dashboard/authorHome">
                                    Dashboard</Link></li>
                            }
                            {
                                !isTaskCreator && !isAdmin && user &&
                                <li><Link to="/dashboard/userHome">
                                    Dashboard</Link></li>
                            }
                            {
                                !isAdmin && user &&

                                <li>
                                    <div className="btn pb-2">
                                        <FaCoins className="text-yellow-500 text-xl" />
                                        <div className="">{users?.coin}</div>
                                    </div>
                                </li>
                            }


                            {
                                user ? <>
                                    {/* <span>{user.displayName}</span> */}

                                    <li><Link to='/profile'>Profile</Link></li>
                                    <button onClick={handleLogOut}
                                        className="btn btn-ghost bg-red-700">Logout</button>




                                </> : <>
                                    <li>
                                        <a href="https://www.youtube.com/watch?v=CgkZ7MvWUAA" target="_blank" rel="noopener noreferrer">
                                            Watch Demo
                                        </a>
                                    </li>
                                    <li><Link to='/login'>Login</Link></li>
                                    <li><Link to='/signup'>Register</Link></li>
                                </>
                            }


                        </ul>
                    </div>

                    <Link className="btn btn-ghost text-xl" to='/'>
                        <img src="https://i.ibb.co/t4yQbSp/logo.png" className="h-12 w-12 rounded-xl" alt="" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link to='/'>Home</Link>
                        </li>


                        {
                            isAdmin && <li><Link to="/dashboard/adminHome">
                                Dashboard</Link></li>
                        }
                        {
                            isTaskCreator && <li><Link to="/dashboard/authorHome">
                                Dashboard</Link></li>
                        }
                        {
                            !isTaskCreator && !isAdmin && user &&
                            <li><Link to="/dashboard/userHome">
                                Dashboard</Link></li>
                        }
                        {
                            !isAdmin && user &&

                            <li>
                                <div className="btn pb-2">
                                    <FaCoins className="text-yellow-500 text-xl" />
                                    <div className="">{users?.coin}</div>
                                </div>
                            </li>
                        }
                        {
                            user ? <>
                                {/* <span>{user.displayName}</span> */}

                                <li><Link to='/profile'>Profile</Link></li>

                                <button onClick={handleLogOut}
                                    className="btn btn-ghost bg-red-700 pb-2">Logout</button>




                            </> : <>
                                <li>
                                    <a href="https://www.youtube.com/watch?v=CgkZ7MvWUAA" target="_blank" rel="noopener noreferrer">
                                        Watch Demo
                                    </a>
                                </li>
                                <li><Link to='/login'>Login</Link></li>
                                <li><Link to='/signup'>Register</Link></li>

                            </>

                        }


                    </ul>
                </div>
                <div className="navbar-end">
                    <a></a>
                </div>
            </div>
        </>
    );
};

export default Navbar;