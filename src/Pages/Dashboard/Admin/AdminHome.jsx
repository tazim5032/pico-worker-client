import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUsers, FaCoins, FaDollarSign } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import AdminWithdrawRequests from "./AdminWithdrawRequests";
import Helmet from "react-helmet";
import useAuth from "../../../Hooks/useAuth";
import { IoIosNotifications } from "react-icons/io";

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalCoins, setTotalCoins] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
   // const [completedPayments, setCompletedPayments] = useState(0);
    const [totalPaymentsCount, setTotalPaymentsCount] = useState(0);

    const { user } = useAuth();

   // const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);
  //  const [tasks, setTasks] = useState([]);

    //total available coin find
    useEffect(() => {
        getData()
    }, [user])

    const getData = async () => {
        const { data } = await axiosSecure(
            `/user/${user?.email}`)
        setUsers(data)
    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const usersResponse = await axiosSecure.get('/admin/total-users');
            setTotalUsers(usersResponse.data.totalUsers);

            const coinsResponse = await axiosSecure.get('/admin/total-coins');
            setTotalCoins(coinsResponse.data.totalCoins);

            const paymentsResponse = await axiosSecure.get('/admin/total-payments');
            setTotalAmount(paymentsResponse.data.totalAmount);
           // setCompletedPayments(paymentsResponse.data.completedPayments);

            const paymentsCountResponse = await axiosSecure.get('/admin/total-payments-count');
            setTotalPaymentsCount(paymentsCountResponse.data.totalPaymentsCount);
        } catch (error) {
            console.error("Failed to fetch admin data:", error);
        }
    };

    return (
        <div className="mt-12 sm:ml-4 mb-96">
            <Helmet>
                <title>Home</title>
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
            
            <h2 className="text-3xl mb-8">Admin Dashboard</h2>

            <div className="stats shadow">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUsers className="text-3xl"></FaUsers>
                    </div>
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value">{totalUsers}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaCoins className="text-3xl text-yellow-500"></FaCoins>
                    </div>
                    <div className="stat-title">Total Coins</div>
                    <div className="stat-value">{totalCoins}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <GrTransaction className="text-3xl" />
                    </div>
                    <div className="stat-title">Total Payments Completed</div>
                    <div className="stat-value">{totalPaymentsCount}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaDollarSign className="text-3xl"></FaDollarSign>
                    </div>
                    <div className="stat-title">Total Payment Amount</div>
                    <div className="stat-value">${totalAmount}</div>
                </div>

                
            </div>

            <AdminWithdrawRequests></AdminWithdrawRequests>
        </div>
    );
};

export default AdminHome;
