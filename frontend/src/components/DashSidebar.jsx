import React, { useEffect, useState } from "react";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-w-56 min-h-screen border-r border-gray-300 bg-[#f2f2f2] shadow-[inset_0_4px_4px_-2px_rgba(0,0,0,0.1),4px_0_6px_-2px_rgba(0,0,0,0.1)] text-gray-700 py-4 px-3 flex flex-col gap-4">
      {/* Profile */}
      <Link
        to={"/dashboard?tab=profile"}
        className={`flex items-center justify-between ${
          tab === "profile" ? "bg-gray-200" : ""
        } px-2 py-2 cursor-pointer rounded-md hover:bg-gray-200`}
      >
        <div className="flex items-center gap-3">
          <FaUser />
          <span className="text-lg">Profile</span>
        </div>
        <span className="text-[11px] bg-gray-600 px-3 py-1 text-white rounded-md">
          {currentUser.user.isAdmin ? "Admin" : "User"}
        </span>
      </Link>

      {/* Posts */}
      {currentUser.user.isAdmin && (
        <Link
          to={"/dashboard?tab=posts"}
          className={`flex items-center justify-between ${
            tab === "posts" ? "bg-gray-200" : ""
          } px-2 py-2 cursor-pointer rounded-md hover:bg-gray-200`}
        >
          <div className="flex items-center gap-3">
            <FaUser />
            <span className="text-lg">Posts</span>
          </div>
        </Link>
      )}

      {/* Users */}
      {currentUser.user.isAdmin && (
        <Link
          to={"/dashboard?tab=users"}
          className={`flex items-center justify-between ${
            tab === "users" ? "bg-gray-200" : ""
          } px-2 py-2 cursor-pointer rounded-md hover:bg-gray-200`}
        >
          <div className="flex items-center gap-3">
            <FaUser />
            <span className="text-lg">Users</span>
          </div>
        </Link>
      )}

      {/* Sign out */}
      <div className="flex items-center gap-3 px-2 py-2 cursor-pointer hover:bg-gray-200 hover:rounded-md">
        <FaSignOutAlt />
        <span>Sign Out</span>
      </div>
    </div>
  );
};

export default DashSidebar;
