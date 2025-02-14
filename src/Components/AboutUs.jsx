import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <section className="container mx-auto px-4 py-12 bg-gradient-to-r from-sky-50 to-blue-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side: Image */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://i.ibb.co/4f1L6FX/lost-and-found-concept.jpg"
            alt="Lost and Found"
            className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 border-2 border-white shadow-xl"
          />
        </motion.div>

        {/* Right Side: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.h2
            className="text-3xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About <span className="text-blue-600">Our Platform</span>
          </motion.h2>
          <motion.p
            className="text-gray-600 mb-4"
            whileHover={{ scale: 1.02 }}
          >
            Our mission is to **help people reunite with their lost belongings** by connecting
            finders and owners in a **secure and efficient way**. We provide a user-friendly
            platform where you can report lost or found items, verify claims, and safely return
            them to their rightful owners.
          </motion.p>
          <motion.p
            className="text-gray-600 mb-6"
            whileHover={{ scale: 1.02 }}
          >
            Join our **growing community** and make a difference by helping others find what
            matters most to them.
          </motion.p>

          <Link to="/register">
            <motion.button
              className="bg-sky-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 hover:from-blue-700 hover:to-sky-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Us
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;