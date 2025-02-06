import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoadingSpinner from '../Components/LoadingSpinner';


const MyItems = () => {
    const { user } = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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


    const handleDelete = async (itemId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`${import.meta.env.VITE_API_LINK}/deleteitem/${itemId}`);
                    if (response.data.deletedCount > 0) {
                        setItems(items.filter(item => item._id !== itemId)); // Update state after successful deletion
                        Swal.fire(
                            'Deleted!',
                            'Your item has been deleted.',
                            'success'
                        )
                    }
                } catch (error) {
                    console.error("Error deleting item:", error);
                    Swal.fire(
                        'Error!',
                        'Failed to delete the item.',
                        'error'
                    )
                }
            }
        })
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (items.length === 0) {
        return <div className="text-center text-gray-500">You haven't added any items yet.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">My Items</h2>
            <table className="min-w-full border border-collapse table-auto">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">Thumbnail</th>
                        <th className="border px-4 py-2">Title</th>
                        <th className="border px-4 py-2">Location</th>
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item._id} className="border-b">
                            <td className="border px-4 py-2 text-center">
                                <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover rounded" />
                            </td>
                            <td className="border px-4 py-2">{item.title}</td>
                            <td className="border px-4 py-2">{item.location}</td>
                            <td className="border px-4 py-2">
                                {new Date(item.date).toLocaleDateString()}
                            </td>
                            <td className="border px-4 py-2 flex justify-center space-x-2">
                                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyItems;