import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import { FaQuoteLeft } from "react-icons/fa";
import Helmet from 'react-helmet';

const testimonialsData = [
    {
        id: 1,
        name: "John Doe",
        title: "CEO, Company ABC",
        image: "https://i.ibb.co/mDVdJbx/agent2.png",
        testimonial: "This service is fantastic! It has helped us tremendously in managing our tasks more efficiently."
    },
    {
        id: 2,
        name: "Jane Smith",
        title: "CTO, Company XYZ",
        image: "https://i.ibb.co/Twk7pxJ/agent3.png",
        testimonial: "An amazing experience! The customer support is top-notch and the platform is very user-friendly."
    },
    {
        id: 3,
        name: "Mark Johnson",
        title: "Manager, Company 123",
        image: "https://i.ibb.co/cbywGjh/Fakhrul-Islam-removebg-preview.png",
        testimonial: "Highly recommend this service to anyone looking to streamline their workflow and improve productivity."
    }
];

const Testimonials = () => {
    return (
        <section className="py-12">
            
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-8">Testimonials</h1>
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg relative">
                    <FaQuoteLeft className="text-5xl text-gray-200 absolute top-4 left-4" />
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                    >
                        {testimonialsData.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-24 h-24 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="text-gray-700 italic mb-4">
                                            "{item.testimonial}"
                                        </p>
                                        <h3 className="text-xl font-semibold">{item.name}</h3>
                                        <p className="text-gray-500">{item.title}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
