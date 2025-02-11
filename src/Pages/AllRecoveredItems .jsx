import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable, faThLarge } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import LoadingSpinner from "../Components/LoadingSpinner";
import Swal from "sweetalert2";

const AllRecoveredItems = () => {
  const { user } = useContext(AuthContext);
  const [recoveredItems, setRecoveredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [RecoverItemData, setRecoverItemData] = useState({});

  useEffect(() => {
    const fetchRecoveredItems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_LINK}/AllRecoveryItems/${user.email}`
        );
        setRecoveredItems(response.data);

        const ItemsIds = response.data.map((item) => item.itemId);
        
        const detailsData = {};
        for (const itemId of ItemsIds) {
          try {
            const res = await axios.get(
              `${import.meta.env.VITE_API_LINK}/getAllitems/${itemId}`
            );
            detailsData[res.data._id] = res.data; // Store by _id
          } catch (error) {
            console.error("Error fetching data for item:", itemId, error);
          }
        }
        setRecoverItemData(detailsData); 
      } catch (err) {
        setError("Failed to fetch recovered items.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecoveredItems();
  }, [user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  if (recoveredItems.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-8 text-4xl">
        You haven't recovered any items yet.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 my-10">
      <h2 className="text-4xl font-bold text-blue-900 text-center mb-4">
        All Recovered Items
      </h2>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-[#1d3557d7]">
            <tr className="text-left text-white">
              <th className="px-6 py-4 font-semibold uppercase tracking-wider border border-gray-200">
                Title
              </th>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider border border-gray-200">
                Date Recovered
              </th>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider border border-gray-200">
                Location
              </th>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider border border-gray-200">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {recoveredItems.map((item, index) => (
              <tr
                key={item._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50 transition duration-200`}
              >
                <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
                  {RecoverItemData[item.itemId]?.title || "Loading..."}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
                  {new Date(item.recoveredDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
                  {item.recoveredLocation}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        RecoverItemData[item.itemId]?.status === "recovered"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    Recovered
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRecoveredItems;