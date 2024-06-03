import React from 'react';
import { motion } from 'framer-motion';
import { FaCoins, FaTasks, FaLock, FaClock, FaStar, FaHeadset } from 'react-icons/fa';

const features = [
  {
    icon: <FaCoins className="text-4xl text-blue-500" />,
    title: "Earn Coins by Completing Tasks",
    description: "Complete a variety of tasks and earn coins that you can convert into real money. Our platform offers diverse opportunities for you to maximize your earnings."
  },
  {
    icon: <FaTasks className="text-4xl text-green-500" />,
    title: "Create and Manage Tasks",
    description: "Easily post and manage tasks with our user-friendly interface. Describe your project, set deadlines, and monitor progress effortlessly."
  },
  {
    icon: <FaLock className="text-4xl text-red-500" />,
    title: "Secure Payments",
    description: "Enjoy peace of mind with our secure payment system. Transactions are protected, ensuring you receive your earnings promptly and safely."
  },
  {
    icon: <FaClock className="text-4xl text-purple-500" />,
    title: "Flexible Work Opportunities",
    description: "Choose tasks that fit your schedule. Our platform offers flexibility, allowing you to work whenever and wherever you want."
  },
  {
    icon: <FaStar className="text-4xl text-yellow-500" />,
    title: "Quality Assurance",
    description: "Our rating and review system ensures that you work with reliable clients and high-quality freelancers, promoting a trustworthy community."
  },
  {
    icon: <FaHeadset className="text-4xl text-pink-500" />,
    title: "24/7 Support",
    description: "Access round-the-clock support to help you with any issues or questions. Our dedicated team is always here to assist you."
  }
];

const Features = () => {
  const featureVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        delay: 0.2
      }
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">Platform Key Features</h2>
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature, index) => (
          <motion.div key={index} variants={featureVariants} className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 text-center">
            <div className="mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Features;
