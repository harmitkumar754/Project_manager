const jwt = require('jsonwebtoken');

const authmiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.phone = decoded.phone;
    next();

  } catch (error) {
    console.error("Error in authmiddleware:", error);
    return res.status(500).json({ message: "Invalid token" });
  }
};

module.exports = authmiddleware;
