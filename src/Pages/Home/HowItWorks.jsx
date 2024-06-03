import React from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus, FaTasks, FaTrophy } from 'react-icons/fa';

const HowItWorks = () => {
  const stepVariants = {
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
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-8"
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={stepVariants} className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 text-center">
            <div className="mb-4">
              <FaUserPlus className="text-4xl text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Register</h3>
            <p className="text-gray-600">Sign up for an account to access our platform and start earning rewards.</p>
          </motion.div>
          <motion.div variants={stepVariants} className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 text-center">
            <div className="mb-4">
              <FaTasks className="text-4xl text-green-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Complete Tasks</h3>
            <p className="text-gray-600">Browse available tasks, complete them with high quality, and submit for review.</p>
          </motion.div>
          <motion.div variants={stepVariants} className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 text-center">
            <div className="mb-4">
              <FaTrophy className="text-4xl text-yellow-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
            <p className="text-gray-600">Get rewarded for your completed tasks and redeem your earnings for exciting rewards.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
