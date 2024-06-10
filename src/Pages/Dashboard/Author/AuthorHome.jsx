import { useEffect, useState } from 'react';
import { FaBook, FaCoins, FaDollarSign } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import PendingTask from './PendingTask';

const AuthorHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [authorStats, setAuthorStats] = useState([]);
    const [tasks, setTasks] = useState([]);

    const [currentUser, setCurrentUser] = useState([]);
    // console.log(isTaskCreator);

    useEffect(() => {
        getDataa()
    }, [user])

    const getDataa = async () => {
        const { data } = await axiosSecure(
            `/user/${user?.email}`)
        setCurrentUser(data)
    }




    useEffect(() => {
        if (user) {
            fetchAuthorStats();
        }
    }, [user]);

    const fetchAuthorStats = async () => {
        try {
            const { data } = await axiosSecure.get(`/user/${user.email}`);
            setAuthorStats(data);
        } catch (error) {
            console.error('Error fetching author stats:', error);
        }
    };


    useEffect(() => {
        getData()
    }, [user])

    const getData = async () => {
        const { data } = await axiosSecure(
            `/my-task-list/${user?.email}`)
        setTasks(data)
    }

    let totalSum = tasks.reduce((sum, task) => sum + parseInt(task.total), 0);
    const pending = tasks.reduce((sum, task) => sum + parseInt(task.quantity), 0);

    totalSum = totalSum / 20;

    //console.log(totalSum);

    return (
        <div className="container mx-auto mt-8 mb-96">
            <div className="flex gap-8 justify-end mr-8">

                <div>
                    <div className="flex pt-4">
                        <FaCoins className="text-yellow-500 text-xl" />
                        <div className="badge badge-primary font-bold ml-1">{currentUser?.coin}</div>
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
                        Role: {currentUser?.accountType}</div>
                </div>
                <div>
                    <IoIosNotifications className="text-4xl mt-4" />
                </div>


            </div>
            <h1 className="text-2xl font-bold mb-4">Author Home</h1>
            <div className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-2">
                <div className='bg-yellow-500 p-4 rounded-xl flex gap-2'>
                    <FaCoins className='text-4xl'></FaCoins>
                    <p className="text-xl mb-2">Available Coins: {authorStats.coin}</p>
                </div>
                <div className='bg-yellow-500 p-4 rounded-xl flex gap-2'>
                    <FaBook className='text-4xl'></FaBook>
                    <p className="text-xl mb-2">Pending Task: {pending}</p>
                </div>
                <div className='bg-yellow-500 p-4 rounded-xl flex gap-2'>
                    <FaDollarSign className='text-4xl'></FaDollarSign>
                    <p className="text-xl">Total Payment Paid: ${totalSum}</p>
                </div>
            </div>

            <PendingTask></PendingTask>
        </div>
    );
};

export default AuthorHome;
