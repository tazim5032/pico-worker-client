import Features from "./Features";
import HowItWorks from "./HowItWorks";
import Slider from "./Slider";
import Testimonials from "./Testimonials";
import TopEarners from "./TopEarners";
import TopTasks from "./TopTasks";

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <Features></Features>
             {/* <TopTasks></TopTasks>  */}
            <HowItWorks></HowItWorks>
            <TopEarners></TopEarners>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;