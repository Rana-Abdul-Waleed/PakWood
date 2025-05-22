import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCartArrowDown, FaUser } from "react-icons/fa";

const Header = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md flex items-center justify-between px-24 py-4">
      {/* Website Logo/Name */}
      <Link to="/" className="text-2xl font-semibold">
        PakWood
      </Link>

      {/* ul items */}
      <ul className="flex items-center gap-7 text-sm">
        <li className="hover:text-pink-600">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-pink-600">
          <Link to="/about">About</Link>
        </li>
        <li className="hover:text-pink-600">
          <Link to="/products">Products</Link>
        </li>
        <li className="hover:text-pink-600">
          <Link to="/shop">Shop</Link>
        </li>
        <li className="hover:text-pink-600">
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      {/* theme, register/login, cart icon */}
      <div className="flex items-center gap-6">
        {userLoggedIn && (
          <FaCartArrowDown className="text-4xl p-2 hover:bg-gray-300 rounded-full cursor-pointer" />
        )}
        <div>
          <Link to="/signin">
            {userLoggedIn ? (
              <FaUser className="text-4xl p-2 hover:bg-gray-300 rounded-full cursor-pointer" />
            ) : (
              "Register | Login"
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
