import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";
import { AuthContext } from "../Provider/AuthProvider";

const AllItems = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_LINK}/getAllitems`,
          // {
          //   withCredentials: true, // Include cookies in the request
          // }
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
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">{error}</div>
    );
  }

  // Filter items based on search key word
  const filteredItems = items.filter((item) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(lowerCaseQuery) ||
      item.location.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Lost & Found Items
      </h2>

      {/*  search Input section */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item._id}
              className="card bg-blue-50 w-96 h-[500px] shadow-sm overflow-hidden transform transition-transform duration-300 hover:scale-105 relative"
            >
              <figure className="px-10 pt-10">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="rounded w-[250px] h-[250px]"
                />
              </figure>
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

                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-500 text-sm mb-4">
                      <span className="font-medium">Date:</span>{" "}
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.postType === "Lost"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {item.postType}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/itemDetails/${item._id}`}
                  className="block w-full text-center bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 text-xl">
           
          </div>
        )}
      </div>
      { (filteredItems.length < 1) && <div className="text-center text-gray-500 text-2xl p-16">
        <p>No items found matching your search criteria.</p>
      </div> }
    </div>
  );
};

export default AllItems;
