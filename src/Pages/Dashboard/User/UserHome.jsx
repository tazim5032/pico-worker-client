import { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { FaBook, FaCoins } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const UserHome = () => {
    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);

    //total available coin find
    useEffect(() => {
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
            `/user-submission/${user?.email}`)
        setTasks(data)
    }

    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        fetchApprovedSubmissions();
    }, [user]);

    const fetchApprovedSubmissions = async () => {
        if (user?.email) {
            try {
                const { data } = await axiosSecure.get(`/approved-submissions/${user.email}`);
                setSubmissions(data);
            } catch (error) {
                console.error("Failed to fetch approved submissions:", error);
            }
        }
    };

    let total = parseFloat(users.coin) - 10.0;
    total = total / 20 + parseFloat(users.total_income);

// console.log(submissions);

    return (
        <div className="sm:ml-4 mb-96">
            <Helmet>
                <title>Home</title>
            </Helmet>
            <div className="flex flex-col sm:flex-row gap-8 justify-end mr-8">

                <div className="">
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


            <h2 className="text-3xl">
                <span>Hi, Welcome </span>
                {
                    user?.displayName ? user.displayName : 'Back'
                }
            </h2>

            <div className="stats shadow flex flex-col sm:flex-row">

                <div className="stat flex flex-col sm:flex-row">
                    <div className="stat-figure text-secondary">
                        <FaCoins className="text-3xl text-yellow-500"></FaCoins>
                    </div>
                    <div className="stat-title">Available Coin</div>
                    <div className="stat-value">{users?.coin}</div>

                </div>

                <div className="stat flex flex-col sm:flex-row">
                    <div className="stat-figure text-secondary">
                        <FaBook className="text-3xl"></FaBook>
                    </div>
                    <div className="stat-title">Total Submissions</div>
                    <div className="stat-value">{tasks.length}</div>

                </div>



                <div className="stat flex flex-col sm:flex-row">
                    <div className="stat-figure text-secondary">
                        <FaBook className="text-3xl"></FaBook>
                    </div>
                    <div className="stat-title">Total Income</div>
                    <div className="stat-value">${total}</div>

                </div>

                <div className="stat flex flex-col sm:flex-row">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                    </div>
                    <div className="stat-title">Withdrawn</div>
                    <div className="stat-value">${users.total_income}</div>

                </div>

            </div>

            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-semibold text-center mb-8">Approved Submissions</h1>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Task Title</th>
                                
                                <th className="px-4 py-2">Payable Amount</th>
                                <th className="px-4 py-2">Creator Name</th>
                                <th className="px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map((submission) => (
                                <tr key={submission._id}>
                                    <td className="border px-4 py-2">{submission.title}</td>
                                    <td className="border px-4 py-2">{submission.total} coins</td>
                                    <td className="border px-4 py-2">{submission.author_name}</td>
                                    <td className="border px-4 py-2">{submission.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserHome;