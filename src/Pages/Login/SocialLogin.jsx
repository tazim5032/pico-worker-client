import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

// import { FaGithub } from "react-icons/fa";
const SocialLogIn = () => {
    const { googleLogIn } = useAuth();

    const axiosPublic = useAxiosPublic();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || '/';
    //const from = location?.state?.from?.pathname || '/';

    const handleSocialLogin = (socialProvider) =>{
        socialProvider()
        .then(result =>{
           if(result.user){
                let coin = 10;
                let total_income = 0;
                const userInfo ={
                    email: result.user.email,
                    name: result.user.displayName,
                    accountType: 'worker',
                    coin: coin,
                    total_income,
                    
                }

                axiosPublic.post('/users', userInfo)
                .then(res =>{
                    console.log(res.data);
                    navigate('/dashboard/common');
                })
              
           }
        })
    }

    return (
        <div>
            <div className="divider">Continue With</div>
            <div className="flex justify-around">

                <button onClick={() => handleSocialLogin(googleLogIn)}
                className="w-[30px] h-[30px]"><FcGoogle  className="w-[30px] h-[30px]"/></button>
               
               
               
                {/* <button onClick={() => handleSocialLogin(githubLogIn)}
                className="w-[30px] h-[30px]"><FaGithub className="w-[30px] h-[30px]" /></button> */}
            </div>
        </div>
    );
};

export default SocialLogIn;