import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const LatestItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_LINK}/getAllitems`);
      
        const latestItems = response.data
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 6); 

        setItems(latestItems);
      } catch (err) {
        setError("Failed to load items. Please try again.");
        console.error("Error fetching items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);
  if (loading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-lg p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="w-full h-48 bg-gray-200 rounded-t-lg mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-lg mt-3 animate-pulse"></div>
          </motion.div>
        ))}
      </div>
    );

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="container mx-auto px-4 py-10 bg-gradient-to-r from-sky-50 to-blue-50">
      <motion.h2
        className="text-3xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Latest Find & Lost Items
      </motion.h2>

      <AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-lg shadow-lg p-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
               <figure className="px-10 pt-10 mb-1.5">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="rounded w-[250px] h-[250px]"
                />
              </figure>

              {/* Status Badge */}
              <span
                className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-2 ${
                  item.postType === "Found"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {item.postType}
              </span>

              <h3 className="text-xl font-semibold mt-1">{item.title}</h3>
              <p className="text-gray-600">Category: {item.category}</p>
              <p className="text-gray-500">
                Date: {new Date(item.date).toLocaleDateString()}
              </p>

              <Link to={`/itemDetails/${item._id}`}>
                <button className="mt-3 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white px-4 py-2 rounded-md transition-all transform hover:scale-105">
                  View Details
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      <div className="text-center mt-8">
        <Link to="/lost-and-found-items">
          <motion.button
            className="inline-block cursor-pointer rounded-lg bg-gradient-to-r from-sky-800 to-blue-800 px-6 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:from-sky-900 hover:to-blue-900 hover:shadow-lg transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            See All Items
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default LatestItems;
