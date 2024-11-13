import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import Bus from "../models/Bus.js";

export const register = async (req, res) => {
  const { name, email, password, role, busCode, ...additionalData } = req.body;

  try {
    console.log("Received registration data:", req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already in use");
      return res.status(400).json({ error: "Email already in use" });
    }

    let assignedBus = null;
    if (role === "driver" && busCode) {
      const bus = await Bus.findOne({ busCode });
      if (bus) {
        assignedBus = bus._id;
      } else {
        return res.status(400).json({ error: "Bus not found" });
      }
    }

    const user = new User({
      name,
      email,
      password,
      role,
      busCode,
      assignedBus,
      ...additionalData,
    });

    console.log("New user instance created:", user);

    await user.save();
    console.log("User successfully saved to database");

    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error("Error in registration process:", error.message);
    res
      .status(500)
      .json({ error: "Registration failed", details: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.jwtSecret,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ error: "Login failed", details: error.message });
  }
};
