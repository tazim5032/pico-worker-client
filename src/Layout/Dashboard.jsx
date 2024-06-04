import { FaAddressBook, FaBook, FaCoins, FaEnvelope, FaHistory, FaHome, FaList, FaSearch } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
const Dashboard = () => {
    return (
        <div className="flex">

            {/* sidebar */}
            <div className="w-64 min-h-screen bg-cyan-400">
                <ul className="menu p-4">
                    {/* Authormin */}
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
                            My Task's ist</NavLink>
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
                        <NavLink to='dashboard/taskList'>
                            <FaBook></FaBook>
                            Task List</NavLink>
                    </li>
                    <li>
                        <NavLink to='dashboard/userSubmissions'>
                            <FaAddressBook />
                            My Submissions</NavLink>
                    </li>






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
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;