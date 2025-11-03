import React from "react";

const DashboardInfo = ({ title, value, icon, onView }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between space-x-4">
      <div className="flex items-center gap-4">
        <div className="text-blue-600">{icon}</div>
        <div>
          <p className="text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>

      <button
        onClick={onView}
        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center gap-1"
      >
        View
      </button>
    </div>
  );
};

export default DashboardInfo;
