import Helmet from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IoEyeOffSharp } from "react-icons/io5";
import { FiEye } from "react-icons/fi";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import SocialLogIn from "../Login/SocialLogin";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { createUser, updateUserProfile, logOut } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const from = '/login';

    const onSubmit = async (data) => {
        const { accountType } = data;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(data.password)) {
            // Password doesn't meet requirements
            Swal.fire({
                icon: 'error',
                title: 'Password Format is not matched',
                text: 'Password must contain at least one upper and one lower case letter, and be at least 6 characters long!',
            });
            return;
        }

        const imageFile = data.photo[0];
        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const res = await axiosPublic.post(image_hosting_api, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });

            if (res.data.success) {
                const imageUrl = res.data.data.url;
                // Password meets requirements, proceed with user creation and profile update
                 await createUser(data.email, data.password);
                await updateUserProfile(data.fullName, imageUrl);

                let coin = 50;
                let total_income = 0;
                if (accountType === 'worker') {
                    coin = 10;
                }
                // User entry in db
                const userInfo = {
                    name: data.fullName,
                    email: data.email,
                    accountType: accountType,
                    coin: coin,
                    total_income: total_income,
                };

                const dbResponse = await axiosPublic.post('/users', userInfo);
                if (dbResponse.data.insertedId) {
                    logOut();
                    navigate(from);
                    Swal.fire({
                        icon: 'success',
                        title: 'Congrats',
                        text: 'Registration Successful!',
                    });
                }
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: 'User Already Exists or Image Upload Failed!',
            });
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <Helmet>
                <title>Bistro Boss | Signup</title>
            </Helmet>
            <h1 className="text-2xl text-center my-10 pt-6">Please Register</h1>

            <div className="hero-content w-full sm:w-1/3 rounded-xl">
                <div className="card w-full shadow-2xl bg-red-100 p-2 sm:p-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                className="input input-bordered"
                                {...register("fullName", { required: true })}
                            />
                            {errors.fullName && <span className="text-red-600">Full Name is Required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="input input-bordered"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-red-600">Email is Required</span>}
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo</span>
                            </label>
                            <input
                                {...register('photo', { required: true })}
                                type="file"
                                name='photo'
                                className="file-input w-full max-w-xs"
                            />
                            {errors.photo && <span className="text-red-600">Photo is Required</span>}
                        </div>

                        <div className="form-control mt-4">
                            <label className="label">Account Type</label>
                            <select className="select select-bordered" {...register("accountType", { required: true })}>
                                <option value="">Select Account Type</option>
                                <option value="worker">Worker</option>
                                <option value="taskCreator">Task Creator</option>
                            </select>
                            {errors.accountType && <span className="text-red-600">Please select an Account Type</span>}
                        </div>
                        
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                className="input input-bordered"
                                {...register("password", { required: true })}
                            />
                            <span className="absolute top-12 right-1" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <IoEyeOffSharp /> : <FiEye />}
                            </span>
                            {errors.password && <span className="text-red-600">Password is Required</span>}
                        </div>
                        
                        <div className="form-control mt-6">
                            <button className="btn bg-black text-white font-bold text-xl">Register</button>
                        </div>
                    </form>
                    
                    <div className="md:w-3/4 lg:w-1/2 mx-auto pb-6">
                        <SocialLogIn />
                    </div>

                    <p className="text-center mt-4 pb-6" data-aos="zoom-in" data-aos-duration="500">
                        Already have an account? <Link className="text-blue-600 font-bold" to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
