import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../redux/user/userSlice.js";

const DashProfile = () => {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = () => {
    setFormData({ ...formData, profilePicture: imageFileUrl });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made.");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(
        `/backend/user/updateUser/${currentUser.user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile has been updated successfully!");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleSignout = () => {};

  return (
    <div className="flex flex-col items-center gap-6 mt-6 mb-10 py-4 px-8 w-[500px] mx-auto">
      <h1 className="text-gray-700 font-semibold text-3xl">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full pt-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageFileUrl || currentUser.user.profilePicture}
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border-[lightGray]"
          />
        </div>
        <input
          type="text"
          id="username"
          className="rounded-sm py-2 px-3 border-2 border-gray-200 outline-none text-gray-700"
          placeholder="Username"
          defaultValue={currentUser.user.username}
          onChange={handleChange}
          disabled={loading}
        />
        <input
          type="email"
          id="email"
          className="rounded-sm py-2 px-3 border-2 border-gray-200 outline-none text-gray-700 bg-gray-200 cursor-not-allowed"
          placeholder="Email"
          defaultValue={currentUser.user.email}
          disabled
        />
        <input
          type="password"
          id="password"
          className="rounded-sm py-2 px-3 border-2 border-gray-200 outline-none text-gray-700"
          placeholder="******"
          onChange={handleChange}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-gray-500 py-2 text-white rounded-sm hover:bg-gray-600"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        {currentUser.user.isAdmin && (
          <Link to={"/create-post"}>
            <button
              type="button"
              className="bg-pink-500 py-2 text-white rounded-sm hover:bg-pink-600 w-full"
            >
              Create a post
            </button>
          </Link>
        )}
      </form>
      <div className="flex items-center justify-between w-full">
        <span
          // onClick={}
          className="cursor-pointer text-red-500 hover:text-red-600 hover:underline"
        >
          Delete Account
        </span>
        <span
          // onClick={handleSignout}
          className="cursor-pointer text-red-500 hover:text-red-600 hover:underline"
        >
          Sign Out
        </span>
      </div>
      {updateUserSuccess && (
        <div className="bg-green-100 text-gray-700 text-left w-full p-3 rounded-sm">
          {updateUserSuccess}
        </div>
      )}
      {updateUserError && (
        <div className="bg-red-100 text-gray-700 text-left w-full p-3 rounded-sm">
          {updateUserError}
        </div>
      )}
    </div>
  );
};

export default DashProfile;
