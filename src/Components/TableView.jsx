import React from "react";

const TableView = ({ recoveredItems, RecoverItemData }) => {
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
};

export default TableView;
