import { useEffect, useState } from "react";
import { FaBook, FaCoins } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const UserHome = () => {
    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);

    //total available coin find
    useEffect(  () => {
        getData()
    }, [user])

    const getData = async () => {
        const { data } = await axiosSecure(
            `/user/${user?.email}`)
        setUsers(data)
    }

    //total submission find
    useEffect(() => {
        getDataa()
    }, [user])

    const getDataa = async () => {
        const { data } = await axiosSecure(
            `/submission/${user?.email}`)
        setTasks(data)
    }

    return (
        <div className="mt-12 sm:ml-4">
            <h2 className="text-3xl">
                <span>Hi, Welcome </span>
                {
                    user?.displayName ? user.displayName : 'Back'
                }
            </h2>

            <div className="stats shadow">

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaCoins className="text-3xl text-yellow-500"></FaCoins>
                    </div>
                    <div className="stat-title">Available Coin</div>
                    <div className="stat-value">{users?.coin}</div>
                    
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaBook className="text-3xl"></FaBook>
                    </div>
                    <div className="stat-title">Total Submissions</div>
                    <div className="stat-value">{tasks?.length}</div>
                   
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaBook className="text-3xl"></FaBook>
                    </div>
                    <div className="stat-title">Menu Items</div>
                    {/* <div className="stat-value">{stats.menuItems}</div> */}
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                    </div>
                    <div className="stat-title">Orders</div>
                    {/* <div className="stat-value">${stats.orders}</div> */}
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>

            </div>
        </div>
    );
};

export default UserHome;