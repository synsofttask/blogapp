const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    console.log("Cookies received:", req.cookies); 

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, "your_secret_key");
        req.user = { id: decoded.id };
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = authenticateUser;


