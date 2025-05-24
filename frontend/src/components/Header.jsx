import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = () => {
  const [activeTab, setActiveTab] = useState("home");
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);

  return (
    <nav className="bg-[#f2f2f2] flex items-center justify-between px-24 py-3 z-50 border-b border-gray-300 shadow-md">
      {/* Website Logo/Name */}
      <Link
        to="/"
        className="text-[28px] font-bold text-pink-500 hover:text-pink-600"
        onClick={() => setActiveTab("home")}
      >
        PakWood
      </Link>

      {/* ul items */}
      <ul className="flex items-center gap-7 text-sm text-gray-700">
        <li
          className={`hover:text-pink-600 ${
            activeTab === "home" ? "text-pink-500" : "text-gray-700"
          }`}
          onClick={() => setActiveTab("home")}
        >
          <Link to="/">Home</Link>
        </li>
        <li
          className={`hover:text-pink-600 ${
            activeTab === "about" ? "text-pink-500" : "text-gray-700"
          }`}
          onClick={() => setActiveTab("about")}
        >
          <Link to="/about">About</Link>
        </li>
        <li
          className={`hover:text-pink-600 ${
            activeTab === "products" ? "text-pink-500" : "text-gray-700"
          }`}
          onClick={() => setActiveTab("products")}
        >
          <Link to="/products">Products</Link>
        </li>
        <li
          className={`hover:text-pink-600 ${
            activeTab === "shop" ? "text-pink-500" : "text-gray-700"
          }`}
          onClick={() => setActiveTab("shop")}
        >
          <Link to="/shop">Shop</Link>
        </li>
        <li
          className={`hover:text-pink-600 ${
            activeTab === "contact" ? "text-pink-500" : "text-gray-700"
          }`}
          onClick={() => setActiveTab("contact")}
        >
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      {/* signin, cart icon */}
      <div className="flex items-center gap-10">
        {currentUser && (
          <Link to="/cart">
            <FaShoppingCart className="text-[26px] text-pink-500 cursor-pointer hover:text-pink-600" />
          </Link>
        )}
        <div>
          {currentUser ? (
            <Link to="/dashboard?tab=profile">
              <img
                src={currentUser.profilePicture}
                alt="User"
                className="size-9 rounded-full border-2 border-gray-400 shadow-lg"
              />
            </Link>
          ) : (
            <Link
              to="/signin"
              className="bg-pink-500 py-2 px-4 rounded-md hover:bg-pink-600 text-white"
              onClick={() => setActiveTab("")}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
