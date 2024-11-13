// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};
