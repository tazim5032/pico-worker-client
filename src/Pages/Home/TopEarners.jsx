import React from 'react';
import { motion } from 'framer-motion';

// Dummy data
const topEarnersData = [
  {
    id: 1,
    name: "John Doe",
    picture: "https://via.placeholder.com/150",
    coins: 500,
    tasksCompleted: 35
  },
  {
    id: 2,
    name: "Jane Smith",
    picture: "https://via.placeholder.com/150",
    coins: 480,
    tasksCompleted: 30
  },
  {
    id: 3,
    name: "Alice Johnson",
    picture: "https://via.placeholder.com/150",
    coins: 460,
    tasksCompleted: 28
  },
  {
    id: 4,
    name: "Bob Brown",
    picture: "https://via.placeholder.com/150",
    coins: 440,
    tasksCompleted: 25
  },
  {
    id: 5,
    name: "Emma Wilson",
    picture: "https://via.placeholder.com/150",
    coins: 420,
    tasksCompleted: 23
  },
  {
    id: 6,
    name: "Michael Lee",
    picture: "https://via.placeholder.com/150",
    coins: 400,
    tasksCompleted: 20
  }
];

const TopEarners = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">Top Earners</h2>
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {topEarnersData.map((earner) => (
          <motion.div key={earner.id} variants={itemVariants} className="bg-white shadow-md rounded-lg p-6">
            <img src={earner.picture} alt={earner.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">{earner.name}</h3>
            <p className="text-gray-600 mb-2">Available Coins: {earner.coins}</p>
            <p className="text-gray-600">Tasks Completed: {earner.tasksCompleted}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TopEarners;
