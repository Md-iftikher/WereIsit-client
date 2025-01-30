import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import Swal from "sweetalert2"; 
import axios from "axios"; 
import { AuthContext } from "../Provider/AuthProvider";

const AddLostItem = () => {
  const { user } = useContext(AuthContext);

  const [postType, setPostType] = useState("Lost");
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [contactInfo, setContactInfo] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const date1 = date.toISOString(); 

    const itemData = {
      postType: postType,
      title: title,
      thumbnail:thumbnail,
      description: description,
      category: category,
      location: location,
      date: date1,
      name: contactInfo.name,
      email: contactInfo.email,
    };

    // Log the itemData for debugging
    console.log(itemData);

    try {
      // Send data to the server using Axios
      const response = await axios.post(`${import.meta.env.VITE_API_LINK}/Additems`, itemData, {
        headers: {
          "Content-Type": "application/json", 
        },
      });

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Item added successfully!",
        });

        // Reseting  form fields
        setPostType("Lost");
        setThumbnail(null);
        setTitle("");
        setDescription("");
        setCategory("");
        setLocation("");
        setDate(new Date());
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add item. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error adding item:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Lost & Found Item</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
         
          <div>
            <label className="block text-sm font-medium text-gray-700">Post Type</label>
            <select
              value={postType}
              onChange={(e) => setPostType(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
            <input
              type="text"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

        
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter title"
              required
            />
          </div>

        
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter description"
              rows="4"
              required
            />
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter category (e.g., pets, documents, gadgets)"
              required
            />
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter location"
              required
            />
          </div>

      
          <div>
            <label className="block text-sm font-medium text-gray-700">Date Lost or Found</label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              dateFormat="dd/MM/yyyy"
              required
            />
          </div>

        
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Information</label>
            <input
              type="text"
              value={contactInfo.name}
              readOnly
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
            />
            <input
              type="email"
              value={contactInfo.email}
              readOnly
              className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
            />
          </div>

        
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLostItem;