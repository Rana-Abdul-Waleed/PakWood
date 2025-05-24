import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
import { useSelector, useDispatch } from "react-redux";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [submitForm, setSubmitForm] = useState(false);
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all the fields!"));
    }

    try {
      dispatch(signInStart());
      const res = await fetch("/backend/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
      setSubmitForm(true);
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-6 mt-24 py-4 max-w-lg mx-auto bg-[#f2f2f2] rounded-lg shadow-md">
        <h1 className="text-3xl text-pink-500 font-semibold mt-2">Sign In</h1>
        <form
          className="flex flex-col gap-4 w-full pt-4 px-10"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Email"
            className="rounded-sm py-2 px-3 border-2 border-gray-200 outline-none text-gray-500"
            id="email"
            name="email"
            required
            onChange={handleChange}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            className="rounded-sm py-2 px-3 border-2 border-gray-200 outline-none text-gray-500"
            id="password"
            name="password"
            required
            onChange={handleChange}
            disabled={loading}
          />
          <div className="flex flex-col">
            <button
              className="bg-pink-500 py-2 text-white rounded-sm hover:bg-pink-600"
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign in"}
            </button>
          </div>
        </form>
        <div className="text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-pink-500 hover:text-pink-600 cursor-pointer hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
      <div className="max-w-lg mx-auto mt-2 mb-14 py-2 px-2 text-red-500">
        {submitForm && errorMessage}
      </div>
    </div>
  );
};

export default SignIn;
