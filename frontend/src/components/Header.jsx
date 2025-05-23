import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = () => {
  const [activeTab, setActiveTab] = useState("home");
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md flex items-center justify-between px-24 py-3">
      {/* Website Logo/Name */}
      <Link
        to="/"
        className="text-[28px] font-bold text-pink-500 hover:text-pink-600"
        onClick={() => setActiveTab("home")}
      >
        PakWood
      </Link>

      {/* ul items */}
      <ul className="flex items-center gap-7 text-sm text-gray-600">
        <li
          className={`hover:text-pink-600 ${
            activeTab === "home" ? "text-pink-500" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("home")}
        >
          <Link to="/">Home</Link>
        </li>
        <li
          className={`hover:text-pink-600 ${
            activeTab === "about" ? "text-pink-500" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("about")}
        >
          <Link to="/about">About</Link>
        </li>
        <li
          className={`hover:text-pink-600 ${
            activeTab === "products" ? "text-pink-500" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("products")}
        >
          <Link to="/products">Products</Link>
        </li>
        <li
          className={`hover:text-pink-600 ${
            activeTab === "shop" ? "text-pink-500" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("shop")}
        >
          <Link to="/shop">Shop</Link>
        </li>
        <li
          className={`hover:text-pink-600 ${
            activeTab === "contact" ? "text-pink-500" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("contact")}
        >
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      {/* signin, cart icon */}
      <div className="flex items-center gap-12">
        {currentUser && (
          <FaShoppingCart className="text-[26px] text-pink-500 cursor-pointer hover:text-pink-600" />
        )}
        <div>
          {currentUser ? (
            <FaUser
              className="text-2xl cursor-pointer text-gray-500 hover:text-gray-600"
              onClick={() => setActiveTab("")}
            />
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
