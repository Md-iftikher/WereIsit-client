import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";

const AllItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_LINK}/getAllitems`
        );
        setItems(response.data);
      } catch (err) {
        setError("Failed to fetch items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">{error}</div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Lost & Found Items
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-blue-50 border-1 border-blue-200 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
          >
            <div className="flex justify-center items-center p-4 w-48 h-48">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {item.description.substring(0, 100)}...
              </p>
              <p className="text-gray-500 text-sm mb-2">
                <span className="font-medium">Location:</span> {item.location}
              </p>
              <p className="text-gray-500 text-sm mb-4">
                <span className="font-medium">Date:</span>{" "}
                {new Date(item.date).toLocaleDateString()}
              </p>
              <Link
                to={`/itemDetails/${item._id}`}
                className="block w-full text-center bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllItems;
