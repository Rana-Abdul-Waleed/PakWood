import React from "react";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

const DashSidebar = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="min-w-56 min-h-screen border-r border-gray-300 bg-[#f2f2f2] shadow-[inset_0_4px_4px_-2px_rgba(0,0,0,0.1),4px_0_6px_-2px_rgba(0,0,0,0.1)] text-gray-700 py-4 px-3 flex flex-col gap-4">
      <div className="flex items-center justify-between bg-gray-200 rounded-md px-2 py-2 cursor-pointer">
        <div className="flex items-center gap-3">
          <FaUser />
          <span className="text-lg">Profile</span>
        </div>
        <span className="text-[11px] bg-gray-600 px-3 py-1 text-white rounded-md">
          {!currentUser.isAdmin && "User"}
        </span>
      </div>
      <div className="flex items-center gap-3 px-2 py-2 cursor-pointer hover:bg-gray-200 hover:rounded-md">
        <FaSignOutAlt />
        <span>Sign Out</span>
      </div>
    </div>
  );
};

export default DashSidebar;
