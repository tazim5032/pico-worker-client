import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosNotifications, IoMdAdd } from "react-icons/io";
import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FaCoins } from "react-icons/fa";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddTask = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [userCoin, setUserCoin] = useState(0);
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth();
    const navigate = useNavigate();

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

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
        // Fetch user's coin balance when the component mounts
        const fetchUserCoin = async () => {
            try {
                const res = await axiosSecure.get(`/user/${user.email}`);
                setUserCoin(res.data.coin || 0); // Set user's coin balance or default to 0
            } catch (error) {
                console.error('Failed to fetch user coin balance', error);
            }
        };
        fetchUserCoin();
    }, [axiosSecure, user.email]);

    const onSubmit = async (data) => {
        const total = parseFloat(data.price) * parseFloat(data.quantity);
        const newCoinBalance = userCoin - total;

        if (newCoinBalance < 0) {
            // Display SweetAlert if user doesn't have enough coins
            Swal.fire({
                icon: "error",
                title: "Insufficient Coins",
                text: `You need ${-newCoinBalance} more coins to add this task.`,
            });
            return;
        }

        const imageFile = { image: data.image[0] };
       

        try {
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });

            if (res.data.success) {
                const taskinfo = {
                    title: data.title,
                    description: data.description,
                    author_name: user.displayName,
                    author_email: user.email,
                    quantity: data.quantity,
                    price: parseFloat(data.price),
                    total: total,
                    info: data.info,
                    deadline: startDate,
                    image: res.data.data.display_url
                }

                const taskRes = await axiosSecure.post('/task', taskinfo);

                if (taskRes.data.insertedId) {
                    // Update user's coin balance
                    await axiosSecure.patch(`/user/${user.email}`, { coin: newCoinBalance });
                    setUserCoin(newCoinBalance); // Update local state
                    reset();
                    Swal.fire({
                        icon: "success",
                        title: `${data.title} is added to the TaskList.`,
                    });

                    navigate('/dashboard/my-task-list');
                }
            }
        } catch (error) {
            console.error('Failed to add task', error);
        }
    };

    return (
        <div>
            <div className="flex gap-8 justify-end mr-8 mb-24">

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

            <SectionTitle heading="Add a Task" subHeading="What's new?" ></SectionTitle>
            <div className="sm:px-12">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Task Title*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Task Title"
                            {...register('title', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>

                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Task Description*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Task Description"
                            {...register('description', { required: true })}
                            required
                            className="textarea textarea-bordered h-24" />
                    </div>

                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Task Quantity*</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Task Quantity"
                            {...register('quantity', { required: true })}
                            className="input input-bordered w-full" />
                    </div>


                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Payable Amount (Per Task)*</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Payable Amount"
                            {...register('price', { required: true })}
                            className="input input-bordered w-full" />
                    </div>


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Submission Info</span>
                        </label>
                        <textarea {...register('info')}
                            className="textarea textarea-bordered h-24"
                            placeholder="Submission Info"></textarea>
                    </div>


                    <div className="md:flex mb-4">
                        <div className="form_control md:w-1/2">

                            <label className="label">
                                <span className="text-gray-700">Deadline</span>
                            </label>

                            <DatePicker
                                className='border p-3 rounded-md'
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                            />
                        </div>
                    </div>



                    <div className="form-control w-full my-6">
                        <input {...register('image', { required: true })} 
                        type="file" className="file-input w-full max-w-xs" />
                    </div>


                    <button className="btn">
                        Add Task <IoMdAdd className="ml-2" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTask;