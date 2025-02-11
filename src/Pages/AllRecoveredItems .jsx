import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable, faThLarge } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import LoadingSpinner from "../Components/LoadingSpinner";
import Swal from "sweetalert2";
import TableView from "../Components/TableView";
import CardView from "../Components/CardView";

const AllRecoveredItems = () => {
  const { user } = useContext(AuthContext);
  const [isTableView, setIsTableView] = useState(true);
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

        const itemIds = response.data.map((item) => item.itemId);

        const detailsResponses = await Promise.all(
          itemIds.map((id) =>
            axios.get(`${import.meta.env.VITE_API_LINK}/getAllitems/${id}`)
          )
        );

        const detailsData = detailsResponses.reduce((acc, res) => {
          acc[res.data._id] = res.data;
          return acc;
        }, {});

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
       <h2 className="text-xl md:text-4xl font-bold text-blue-900 text-center">
          All Recovered Items
        </h2>
      <div className="flex justify-end items-center mb-4">
       

        <div className="flex gap-4">
          {/* Table View Button */}
          <button
            onClick={() => setIsTableView(true)}
            className={`p-2 rounded-md shadow-md transition ${
              isTableView
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <FontAwesomeIcon icon={faTable} size="lg" />
          </button>

          {/* Card View Button */}
          <button
            onClick={() => setIsTableView(false)}
            className={`p-2 rounded-md shadow-md transition ${
              !isTableView
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <FontAwesomeIcon icon={faThLarge} size="lg" />
          </button>
        </div>
      </div>

      {isTableView ? (
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
      ) : (
        <CardView
          recoveredItems={recoveredItems}
          RecoverItemData={RecoverItemData}
        />
      )}
    </div>
  );
};

export default AllRecoveredItems;
