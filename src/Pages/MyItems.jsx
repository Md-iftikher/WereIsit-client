import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import LoadingSpinner from "../Components/LoadingSpinner";
import Modal from "./Modal";

const MyItems = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchMyItems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_LINK}/getAllitems/email/${user.email}`
        );
        setItems(response.data);
      } catch (err) {
        setError("Failed to fetch items.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyItems();
  }, [user]);

  const openUpdateModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleDelete = async (itemId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `${import.meta.env.VITE_API_LINK}/deleteitem/${itemId}`
          );
          if (response.data.deletedCount > 0) {
            setItems(items.filter((item) => item._id !== itemId));
            Swal.fire("Deleted!", "Your item has been deleted.", "success");
          }
        } catch (error) {
          console.error("Error deleting item:", error);
          Swal.fire("Error!", "Failed to delete the item.", "error");
        }
      }
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await axios.put(
            `${import.meta.env.VITE_API_LINK}/replaceitem/${selectedItem._id}`,
            selectedItem
        );
        console.log("Update Response:", response.data);

        if (response.data.result.modifiedCount > 0) {
            Swal.fire("Updated!", "Your item has been updated.", "success");
            closeUpdateModal();
            
            const updatedItems = items.map((item) =>
                item._id === selectedItem._id ? { ...item, ...selectedItem } : item
            );
            setItems(updatedItems);
        } else {
            Swal.fire("No changes made!", "Your item was not updated.", "info");
        }
    } catch (error) {
        console.error("Error updating item:", error);
        Swal.fire("Error!", "Failed to update the item.", "error");
    }
};
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  if (items.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-8 text-3xl p-28">
        You haven't added any items yet.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 my-10">
      <div className="flex flex-col justify-center items-center gap-1.5 my-2.5">
        <h2 className="text-4xl font-bold text-blue-900 text-center">
          My Items
        </h2>
        <p className="text-xl font-semibold text-centre text-gray-400">
          Here are the items you've added:
        </p>
      </div>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-[#1d3557d7]">
            <tr className="text-left text-white">
              <th className="px-6 py-4 font-semibold uppercase tracking-wider border border-gray-200">
                Title
              </th>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider border border-gray-200">
                Date
              </th>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider border border-gray-200">
                Location
              </th>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider border border-gray-200">
                Category
              </th>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider border border-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={item._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50 transition duration-200`}
              >
                <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
                  {item.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
                  {item.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      item.postType === "Lost"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.postType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
                  <div className="flex space-x-2 justify-center gap-2">
                    <button
                      onClick={() => openUpdateModal(item)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition duration-300 shadow-md flex items-center"
                      title="Update"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition duration-300 shadow-md flex items-center"
                      title="Delete"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* update items modal  */}
      <Modal isOpen={isModalOpen} onClose={closeUpdateModal}>
        <h2 className="text-xl font-bold mb-4">Update Item</h2>
        <form onSubmit={handleUpdateSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={selectedItem?.title || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, title: e.target.value })
                }
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={selectedItem?.status || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, status: e.target.value })
                }
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="Lost">Lost</option>
                <option value="Found">Found</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={selectedItem?.location || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, location: e.target.value })
                }
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Found Date
              </label>
              <input
                type="date"
                value={
                  selectedItem?.date
                    ? new Date(selectedItem.date).toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, date: e.target.value })
                }
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                User Email
              </label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                User Name
              </label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={closeUpdateModal}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MyItems;
