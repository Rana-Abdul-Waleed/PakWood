import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

// test api
export const test = (req, res) => {
  res.json({ message: "API is working properly." });
};

// update user api
export const updateUser = async (req, res, next) => {
  // const token = req.cookies.access_token;
  // if (!token) {
  //   return next(errorHandler(401, "Unauthorized: No token provided."));
  // }

  // const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // const userId = decoded.id;

  // const user = await User.findById(userId);

  // if (!user) {
  //   return next(errorHandler(404, "User not found"));
  // }

  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user!"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters."));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 and 20 characters.")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces."));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase."));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers.")
      );
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json({
      message: "User is updated successfully.",
      user: rest,
    });
  } catch (error) {
    next(error);
  }
};
