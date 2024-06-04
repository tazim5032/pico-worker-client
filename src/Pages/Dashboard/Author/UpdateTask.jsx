import { useForm } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";
import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateTask = () => {

    const { title, description, info,_id } = useLoaderData();
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate();

    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        console.log('taskinfo');

        const taskinfo = {
            title: data.title,
            description: data.description,
            info: data.info,
        }

        const taskRes = await axiosSecure.patch(`/updateProduct/${_id}`, taskinfo);
        console.log(taskRes);

        if (taskRes.data.modifiedCount > 0) {

            Swal.fire({

                icon: "success",
                title: `${data.title} is updated.`,

            });
            console.log('updated');
            navigate('/dashboard/my-task-list')



        }

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
                         defaultValue={title}
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
                            defaultValue={description}
                            {...register('description', { required: true })}
                            required
                            className="textarea textarea-bordered h-24" />
                    </div>

                    {/* <div className="form-control w-full my-6">
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
                    </div> */}


                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Submission Info</span>
                        </label>
                        <textarea {...register('info')}
                            className="textarea textarea-bordered h-24"
                            defaultValue={info}
                            placeholder="Submission Info"></textarea>
                    </div>

                    <button className="btn">
                        Update Task <IoMdAdd className="ml-2" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateTask;