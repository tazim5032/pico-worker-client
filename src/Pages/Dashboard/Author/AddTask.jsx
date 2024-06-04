import { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoMdAdd } from "react-icons/io";
import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddTask = () => {

    const [startDate, setStartDate] = useState(new Date())
    const { register, handleSubmit, reset } = useForm()
    const {user} = useAuth();
    const navigate = useNavigate();

    console.log(user.displayName,user.email);

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        //  console.log(data)

        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }

        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        if (res.data.success) {
            // now send the menu item data to the server with the image url
            const taskinfo = {
                title: data.title,
                description: data.description,
                author_name: user.displayName,
                author_email: user.email,
                quantity: data.quantity,
                price: parseFloat(data.price),
                total:parseFloat(data.price) * parseFloat(data.quantity),
                info: data.info,
                deadline : startDate,
                image: res.data.data.display_url
                
            }

            const taskRes = await axiosSecure.post('/task', taskinfo);

            console.log(taskRes.data)

            if (taskRes.data.insertedId) {

                reset();
                Swal.fire({

                    icon: "success",
                    title: `${data.title} is added to the menu.`,


                });

                navigate('/dashboard/my-task-list')


            }
        }
       // console.log('with image url', res.data);
    }
    return (
        <div>
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
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
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