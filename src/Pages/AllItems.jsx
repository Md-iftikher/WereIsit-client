import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_LINK}/getAllitems`);
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Lost & Found Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded-lg p-4">
            <img src={item.thumbnail} alt={item.title} className="w-full h-32 object-cover rounded-md mb-4" />
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-600">{item.description.substring(0, 100)}...</p>
            <p className="text-gray-500">Location: {item.location}</p>
            <p className="text-gray-500">Date: {new Date(item.date).toLocaleDateString()}</p>
            <Link to={`/item/${item.id}`} className="mt-4 inline-block bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllItems;