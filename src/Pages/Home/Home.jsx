import Helmet from "react-helmet";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import Slider from "./Slider";
import Testimonials from "./Testimonials";
import TopEarners from "./TopEarners";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Slider></Slider>
            <Features></Features>
            <HowItWorks></HowItWorks>
            <TopEarners></TopEarners>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;