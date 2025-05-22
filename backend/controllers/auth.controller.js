import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// signup api
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required!"));
  }

  const existingEmail = await User.findOne({ email });
  console.log(existingEmail);
  if (existingEmail) {
    return next(errorHandler(400, "Email already exists!"));
  }

  const existingUsername = await User.findOne({ username });
  console.log(existingUsername);
  if (existingUsername) {
    return next(errorHandler(400, "Username already exists!"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully.",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
        isAdmin: newUser.isAdmin,
      },
    });
  } catch (error) {
    // if (error.code === 11000 && error.keyPattern?.[email]) {
    //   return next(errorHandler(400, "Email is already registered!"));
    // }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors)
        .map((val) => val.message)
        .join(", ");
      return next(errorHandler(400, messages));
    }

    next(error);
  }
};
