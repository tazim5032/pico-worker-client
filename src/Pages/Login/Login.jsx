import { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    loadCaptchaEnginge, LoadCanvasTemplate,
    validateCaptcha
} from 'react-simple-captcha';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import SocialLogIn from './SocialLogin';


const Login = () => {

    // const captchaRef = useRef(null);
    const [disabled, setDisabled] = useState(true)

    const { signIn } = useAuth()


    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const navigate = useNavigate();
    const location = useLocation();

    const from = location?.state?.from?.pathname || '/';


    const handleLogin = e => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {

                if (result.user) {
                    navigate(from);
                    Swal.fire({
                        icon: 'success',
                        title: 'Congrats',
                        text: 'Login Successful!',
                    });

                    navigate(from, {replace: true})


                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Invalid email or password!',
                    });
                }
            })

    }

    const handleValidateCaptcha = e => {
        e.preventDefault()
        const user_captcha_value = e.target.value;

        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false)
        }

        else {
            setDisabled(true)
        }
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>
            <div className="hero-content  w-full sm:w-1/3 rounded-xl">

                <div className="card w-full shadow-2xl bg-red-100  p-2 sm:p-4">
                    <form onSubmit={handleLogin}
                        className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="Password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                            <input type="text" onBlur={handleValidateCaptcha} name="captcha" placeholder="Type The Captcha Above"
                                className="input input-bordered" required />

                        </div>
                        <div className="form-control mt-6">

                            <input disabled={disabled} className="btn bg-black text-white font-bold text-xl" type="submit" value="Login" />
                        </div>
                    </form>


                    <div className="md:w-3/4 lg:w-1/2 mx-auto pb-6"
                        data-aos="zoom-in"
                        data-aos-duration="1000">
                        <SocialLogIn ></SocialLogIn>
                    </div>


                    <p className="text-center mt-4 pb-6"
                        // eslint-disable-next-line react/no-unescaped-entities
                        >Don't have an account?
                        <Link className="text-blue-600 font-bold" to="/signup"> Signup</Link> </p>
                </div>

            </div>
        </div>
    );
};

export default Login;