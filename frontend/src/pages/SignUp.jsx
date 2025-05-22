import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 my-28 py-4 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-3xl text-pink-500 font-semibold mt-2">Sign Up</h1>
      <form className="flex flex-col gap-4 w-full pt-4 px-10">
        <input
          type="text"
          placeholder="Username"
          className="rounded-sm py-2 px-3 border-2 border-gray-200 outline-none text-gray-500"
          id="username"
          name="username"
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="rounded-sm py-2 px-3 border-2 border-gray-200 outline-none text-gray-500"
          id="email"
          name="email"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="rounded-sm py-2 px-3 border-2 border-gray-200 outline-none text-gray-500"
          id="password"
          name="password"
          required
        />
        <button className="bg-pink-500 py-2 text-white rounded-sm hover:bg-pink-600">
          Sign up
        </button>
      </form>
      <div className="text-gray-500">
        Already have an account?{" "}
        <Link
          to="/signin"
          className="text-pink-500 hover:text-pink-600 cursor-pointer hover:underline"
        >
          SignIn
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
