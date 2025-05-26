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

  if (username) {
    if (username.length < 7 || username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 and 20 characters.")
      );
    }
    if (username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces."));
    }
    if (username !== username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase."));
    }
    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers.")
      );
    }
  }

  if (password) {
    if (password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters."));
    }
    var hashedPassword = bcryptjs.hashSync(password, 10);
  }

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

// signin api
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required!"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password!"));
    }
    const token = jwt.sign(
      {
        id: validUser._id,
        isAdmin: validUser.isAdmin,
      },
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = validUser._doc;
    const safeUser = {
      _id: validUser._id,
      ...rest,
    };
    console.log(safeUser);
    res.status(200).cookie("access_token", token, { httpOnly: true }).json({
      message: "Signin is successful.",
      user: safeUser,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return next(errorHandler(400, "Invalid data format!"));
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors)
        .map((val) => val.message)
        .join(", ");
      return next(errorHandler(400, messages));
    }

    next(error);
  }
};
