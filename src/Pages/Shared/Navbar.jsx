import { Link } from "react-router-dom";

import useAuth from "../../Hooks/useAuth";


const Navbar = () => {

    const { user, logOut } = useAuth();
    //const [isAdmin] = useAdmin();
    //const [cart] = useCart();

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
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <Link to='/'>Home</Link>
                            </li>
                            <li>
                                <Link to='/menu'>Our Menu</Link>
                            </li>
                            <li>
                                <Link to='/order/salad'>Order Food</Link>
                            </li>
                            {
                                user && <li><Link to="/dashboard/adminHome">Dashboard</Link></li>
                            }
                            {
                                user && <li><Link to="/dashboard/userHome">Dashboard</Link></li>
                            }
                            {/* <li>
                                <Link to='/dashboard/cart'>
                                    <button className="btn border-0">
                                        <FaShoppingCart />
                                        <div className="badge badge-secondary">+{cart.length}</div>
                                    </button>
                                </Link>
                            </li> */}


                            {
                                user ? <>
                                    {/* <span>{user.displayName}</span> */}
                                   
                                        <li><Link to='/signup'>Profile</Link></li>
                                         <button onClick={handleLogOut}
                                            className="btn btn-ghost">Logout</button>
                                        

                                   

                                </> : <>
                                    <li><Link to='/signup'>Watch Demo</Link></li>
                                    <li><Link to='/login'>Login</Link></li>
                                    <li><Link to='/signup'>Register</Link></li>
                                </>
                            }


                        </ul>
                    </div>
                    
                    <Link className="btn btn-ghost text-xl" to='/'>MicroTask</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/menu'>Our Menu</Link>
                        </li>
                        <li>
                            <Link to='/order/salad'>Order Food</Link>
                        </li>
                        {
                            user && <li><Link to="/dashboard/adminHome">Dashboard</Link></li>
                        }
                        {
                            user && <li><Link to="/dashboard/userHome">Dashboard</Link></li>
                        }
                        {/* <li>
                            <Link to='/dashboard/cart'>
                                <button className="btn border-0">
                                    <FaShoppingCart />
                                    <div className="badge badge-secondary">+{cart.length}</div>
                                </button>
                            </Link>
                        </li> */}
                        {
                            user ? <>
                                {/* <span>{user.displayName}</span> */}
                               
                                    <li><Link to='/signup'>Profile</Link></li>
                                    
                                    <button onClick={handleLogOut}
                                            className="btn btn-ghost">Logout</button>
                                        
                                    

                                
                            </> : <>
                                <li><Link to='/signup'>Watch Demo</Link></li>
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