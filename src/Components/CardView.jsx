import React from 'react';

const CardView = ({ recoveredItems, RecoverItemData }) => {  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {recoveredItems.map((item) => (
        <div 
          key={item._id} 
          className="bg-white shadow-md rounded-lg p-4 border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            {RecoverItemData[item.itemId]?.title || "Loading..."}
          </h3>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">Recovered on:</span> {new Date(item.recoveredDate).toLocaleDateString()}
          </p>
          <p className="text-gray-600 mb-3">
            <span className="font-medium">Location:</span> {item.recoveredLocation}
          </p>
          <span 
            className={`px-3 py-1 rounded-full text-sm font-semibold inline-block ${
              RecoverItemData[item.itemId]?.status === "recovered" 
                ? "bg-green-100 text-green-700" 
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            Recovered
          </span>
          {/* <div className="mt-4">
            <Link to=""
              className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              onClick={() => {
               
              }}
            >
              View Details →
            </Link>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default CardView;