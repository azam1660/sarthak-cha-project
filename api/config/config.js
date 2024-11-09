// config/config.js
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const config = {
  port: process.env.PORT || 3000,
  mongodbUri:
    process.env.MONGODB_URI || "mongodb://localhost:27017/busTracking",
  jwtSecret: process.env.JWT_SECRET || "your_jwt_secret_key",
  nodeEnv: process.env.NODE_ENV || "development",
  socketIoNamespace: process.env.SOCKET_IO_NAMESPACE || "/buses",
};

export default config;
