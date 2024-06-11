import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { IoIosNotifications } from 'react-icons/io';
import { FaCoins } from 'react-icons/fa';

const Profile = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);

    //  //total available coin find
    useEffect(() => {
        getData()
    }, [user])

    const getData = async () => {
        const { data } = await axiosSecure(
            `/user/${user?.email}`)
        setUsers(data)
    }
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden pt-48 mb-96 pb-24">
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
                


            </div>
            
        </div>
    );
};

export default Profile;
