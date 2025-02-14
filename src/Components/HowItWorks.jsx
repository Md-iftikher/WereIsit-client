import { motion } from "framer-motion";
import { FaSearch, FaCheckCircle, FaHandsHelping } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch className="text-4xl text-blue-600" />,
      title: "Report Lost or Found Item",
      description: "Submit details about a lost or found item so our community can help.",
    },
    {
      icon: <FaCheckCircle className="text-4xl text-green-600" />,
      title: "Verification Process",
      description: "We review the details to ensure accuracy and avoid any misclaims.",
    },
    {
      icon: <FaHandsHelping className="text-4xl text-yellow-600" />,
      title: "Reunite with the Owner",
      description: "Once verified, the rightful owner can claim their item safely.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <motion.h2
        className="text-3xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        How It Works
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 border border-gray-100 hover:shadow-xl transition-transform transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
            <p className="text-gray-600 text-center">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
