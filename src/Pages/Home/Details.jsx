import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { data } from 'autoprefixer';
import { FaCoins } from 'react-icons/fa';
const Details = () => {
    const { id } = useParams();

    const [task, setTask] = useState({});

    useEffect(() => {
        getData()
    }, [id])

    const getData = async () => {
        const { data } = await axios(
            `http://localhost:5000/details/${id}`
        )
        setTask(data)
    }
    // h-[calc(100vh-100px)]
    return (
        <div>
            <Swiper navigation={true} loop={true} modules={[Navigation, Autoplay]} className="mySwiper" autoplay={{
                delay: 2500,
                disableOnInteraction: false
            }}>
                <SwiperSlide>
                    <div className=" bg-gradient-to-tr from-[#000000CC] to-[#00000059]">

                        <div className='space-y-4 ml-[30%] absolute mt-96 flex flex-col items-center justify-center'>
                            <h1 className='text-5xl font-bold  text-white'>Task Details</h1>

                        </div>

                        <img src={'https://i.ibb.co/jfrfxR4/banner3.png'} className=' h-full w-full object-cover mix-blend-overlay' alt="" />

                    </div>
                </SwiperSlide>

            </Swiper>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
                {/* Left Column: Image */}
                <div>
                    <img src={task.image} alt={task.title} className="w-full h-auto rounded-lg shadow-md" />
                </div>

                {/* Right Column: Details */}
                <div>
                    <h2 className="text-2xl font-bold mb-4"> <span className="text-blue-600">Title:</span> {task.title}</h2>

                    <p className="text-lg mb-4"><span className="text-blue-600 font-bold ">Author:</span> {task.author_name}</p>
                    <p className="text-lg mb-4"><span className="text-blue-600 font-bold">Author Email:</span> {task.author_email}</p>
                    <p className="text-lg mb-4"><span className="text-blue-600 font-bold ">
                        Task Quantity:</span> <span className="uppercase">{task.quantity}</span></p>
                    <p className="text-lg mb-4 text-justify">
                        <span className="text-blue-600 font-bold">Description:</span> {task.description}
                    </p>

                    <p className="text-lg mb-4"><span className="text-blue-600 font-bold">
                        Payment(Per Task):</span> {task.price}</p>

                    <p className="text-lg mb-4"><span className="text-blue-600 font-bold">
                        Deadline:</span> {new Date(task.deadline).toLocaleDateString()}</p>

                    <Link to={`/submit-form/${task._id}`} >
                        <button className="btn x-8 py-2.5 leading-5 
                        text-white transition-colors duration-300 transform bg-gray-700 rounded-md 
                        hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Take task</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Details;