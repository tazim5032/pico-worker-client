import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/swiper-bundle.css';

import { Autoplay, Navigation } from 'swiper/modules';

const Slider = () => {

    return (
        <div className="">
            <Swiper navigation={true} loop={true} modules={[Navigation, Autoplay]} className="mySwiper" autoplay={{
                delay: 2500,
                disableOnInteraction: false
            }}>
                <SwiperSlide>
                    <div className="h-[calc(100vh-100px)] bg-gradient-to-tr from-[#000000CC] to-[#00000059]">

                        <div className='space-y-4  absolute top-1/3 md:left-1/4 lg:left-1/4 left-10'>
                            <h1 className='text-5xl font-bold  text-white'>Time is Money</h1>
                            <p className='text-white w-[90%] md:w-4/5 lg:w-3/4'>
                                Timeliness is key to earning more on our platform. By submitting tasks on time, you not only build a reputation for reliability but also unlock opportunities for higher pay. Clients value punctuality and are willing to reward those who meet deadlines consistently.</p>
                        </div>
                        <img src={'https://i.ibb.co/jfrfxR4/banner3.png'} className=' h-full w-full object-cover mix-blend-overlay' alt="" />

                    </div>
                </SwiperSlide>
                <SwiperSlide>

                    <div className="h-[calc(100vh-100px)] bg-gradient-to-tr from-[#000000CC] to-[#00000059]" >

                        <div className=' absolute top-1/3 md:left-1/4 lg:left-1/4 left-10 space-y-4'>
                            <h1 className='text-5xl font-bold  text-white'

                            >Submit Task & Earn Money</h1>
                            <p className='text-white w-[90%] md:w-4/5 lg:w-3/4'>
                                Looking for a flexible way to earn extra income? Join our platform where you can complete a variety of tasks from the comfort of your home and get paid for your efforts.</p>
                        </div>
                        <img src={'https://i.ibb.co/Y2sxcBH/banner1.png'} className=' h-full w-full object-cover mix-blend-overlay' alt="" />

                    </div>

                </SwiperSlide>
                <SwiperSlide>
                    <div className="h-[calc(100vh-100px)] bg-gradient-to-tr from-[#000000CC] to-[#00000059]">

                        <div className='space-y-4 absolute top-1/3 md:left-1/4 lg:left-1/4 left-10'>
                            <h1 className='text-5xl font-bold  text-white'>Post a Task and Tt's Simple</h1>
                            <p className='text-white w-[90%] md:w-4/5 lg:w-3/4'>
                                Need help with a project or looking to outsource some work? Our platform makes it effortless to post tasks and find skilled freelancers ready to assist you.</p>
                        </div>
                        <img src={'https://i.ibb.co/kcNg2jj/banner2.png'} className=' h-full w-full object-cover mix-blend-overlay' alt="" />

                    </div>
                </SwiperSlide>



            </Swiper>


        </div>
    );
};

export default Slider;