import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("/backend/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (res.ok) {
        navigate("/signin");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 my-28 py-4 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-3xl text-pink-500 font-semibold mt-2">Sign Up</h1>
      <form
        className="flex flex-col gap-4 w-full pt-4 px-10"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Username"
          className="rounded-sm py-2 px-3 border-2 border-gray-200 outline-none text-gray-500"
          id="username"
          name="username"
          required
          onChange={handleChange}
          disabled={loading}
        />
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
        <button
          className="bg-pink-500 py-2 text-white rounded-sm hover:bg-pink-600"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign up"}
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
