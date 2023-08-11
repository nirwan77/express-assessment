import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const secretKey = process.env.JWT_SECRET || "my-secret";

// Define a middleware function to check if the user is authenticated
export const isAuthenticated = (req, res, next) => {
  // TODO: check auth, return 401 if not authenticated
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  console.log(token);

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

// Define a middleware function to check if the user is authorized
export const isAuthorized = (req, res, next) => {
  // TODO: check if user.role is "admin", if not send 403
  if (req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Unauthorized" });
  }
};
