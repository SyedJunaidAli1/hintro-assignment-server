import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
  });

  generateToken(res, user._id);

  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "Invalid credentials" });

  generateToken(res, user._id);

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
  });
};

export const logout = (req, res) => {
  res.cookie("token", "", { maxAge: 0 });
  res.json({ message: "Logged out" });
};
