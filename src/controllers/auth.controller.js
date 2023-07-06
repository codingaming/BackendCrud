import { AuthUser } from "../models/auth.model.js";
import { CONFIG } from "../config.js";
import jwt from "jsonwebtoken";
import { hashSync, compare } from "bcrypt";

export const signUp = async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;
  const newUser = new AuthUser({
    username,
    email,
    password: hashSync(password, CONFIG.bcrypt.saltRounds),
    firstName,
    lastName,
  });

  if (await usernameExists(username)) {
    return res.status(409).json({ message: "Username already exists" });
  }

  try {
    const savedUser = await newUser.save();
    res.status(201).json({
      message: "User created",
      token: generateToken(savedUser),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "email already exists" });
    }
  }
};

export const signIn = async (req, res) => {
  const { username, password } = req.body;
  const user = await AuthUser.findOne({
    $or: [{ username: username }, { email: username }],
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const validPassword = await compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({ message: "Invalid password" });
  }

  res.status(200).json({
    firstName: user.firstName,
    lastName: user.lastName,
    token: generateToken(user),
  });
};

const usernameExists = async (username) => {
  const exists = AuthUser.findOne({ username: username });
  return exists;
};

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, CONFIG.jwt.key, {
    expiresIn: CONFIG.jwt.expiresIn,
  });
};
