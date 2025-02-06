import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../Provider/AuthProvider";
import LoadingSpinner from "../Components/LoadingSpinner";

const ItemsDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [recoveredLocation, setRecoveredLocation] = useState("");
  const [recoveredDate, setRecoveredDate] = useState(new Date());

  //for updation of recovery in status
  const updateItem = async (itemId, updatedFields) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_LINK}/updateitem/${itemId}`,
        updatedFields
      );

      if (response.status === 200) {
      } else {
        console.error("Failed to update item:", response.data);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_LINK}/getAllitems/${id}`
        );
        setItem(response.data);
      } catch (err) {
        setError("Failed to fetch item details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  const handleRecoverySubmit = async () => {
    if (!recoveredLocation || !recoveredDate) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields.",
      });
      return;
    }

    const recoveryData = {
      itemId: id,
      recoveredLocation,
      recoveredDate: recoveredDate.toISOString(),
      recoveredBy: {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_LINK}/Recoveryitems`,
        recoveryData
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Item recovery information submitted successfully!",
        });
        setModalOpen(false);

        // for updating staus
        updateItem(id, { status: "recovered" });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to submit recovery information. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting recovery information:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred. Please try again.",
      });
    }
  };

  if (loading) return <LoadingSpinner></LoadingSpinner>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8 relative">
          <div className="absolute top-4 right-4">
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
          <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-4 border-b-2 border-gray-100">
            {item.title}
          </h2>

          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-96 rounded-lg shadow-lg mb-8 mx-auto"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-500 uppercase">
                  Description
                </label>
                <p className="mt-1 text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-500 uppercase">
                  Category
                </label>
                <p className="mt-1 text-gray-700">{item.category}</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-500 uppercase">
                  Location
                </label>
                <p className="mt-1 text-gray-700">{item.location}</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-500 uppercase">
                  Date
                </label>
                <p className="mt-1 text-gray-700">
                  {new Date(item.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
          {item.status == "recovered" && (
            <div className="text-center bg-green-200 rounded-2xl p-1.5 text-green-500 font-bold mb-8">
              <p className="font-bold text-4xl">Recovered</p>
            </div>
          )}

          {(item.status !== "recovered" && item.email !== user.email) && (
            <button
              onClick={() => setModalOpen(true)}
              className="w-full md:w-auto bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              {item.postType === "Lost" ? "Found This!" : "This is Mine!"}
            </button>
          )}
        </div>
      </div>

      {/* Modal  for recovery*/}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Recovery Details
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recovery Location
                </label>
                <input
                  type="text"
                  value={recoveredLocation}
                  onChange={(e) => setRecoveredLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter recovery location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recovery Date
                </label>
                <DatePicker
                  selected={recoveredDate}
                  onChange={(date) => setRecoveredDate(date)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  dateFormat="dd/MM/yyyy"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Recovered By
                </label>
                <div className="flex items-center space-x-4">
                  {user.photoURL && (
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100"
                    />
                  )}
                  <div>
                    <input
                      value={user.displayName}
                      readOnly
                      className="bg-gray-100 px-3 py-1 rounded-md text-gray-700 w-full"
                    />
                    <input
                      value={user.email}
                      readOnly
                      className="bg-gray-100 px-3 py-1 rounded-md text-gray-600 text-sm mt-1 w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRecoverySubmit}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
              >
                Confirm Recovery
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemsDetails;
