import { motion } from 'framer-motion';

// Dummy data
const topEarnersData = [
  {
    id: 1,
    name: "John Doe",
    picture: "https://i.ibb.co/9sdTRJW/Fakhrul-Islam-removebg-preview.png",
    coins: 500,
    tasksCompleted: 15
  },
  {
    id: 2,
    name: "Jane Smith",
    picture: "https://i.ibb.co/Jqx0xM4/agent2.png",
    coins: 480,
    tasksCompleted: 14
  },
  {
    id: 3,
    name: "Alice Johnson",
    picture: "https://i.ibb.co/N2GL7ys/Capture.png",
    coins: 460,
    tasksCompleted: 9
  },
  {
    id: 4,
    name: "Bob Brown",
    picture: "https://i.ibb.co/Twk7pxJ/agent3.png",
    coins: 440,
    tasksCompleted: 9
  },
  {
    id: 5,
    name: "Emma Wilson",
    picture: "https://i.ibb.co/93RbmGJ/agent1.png",
    coins: 420,
    tasksCompleted: 10
  },
  {
    id: 6,
    name: "Michael Lee",
    picture: "https://i.ibb.co/tQpSCdk/Capture.png",
    coins: 400,
    tasksCompleted: 8
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
