const { verifyAuthToken } = require("./general/helper");

// Auth middleware
const authMiddleware = async (req, res, next) => {
    // Check if user is authenticated
    await verifyAuthToken(req,res,next)
};

module.exports = authMiddleware;
