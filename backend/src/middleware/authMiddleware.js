const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleWare = (req, res, next) => {
    // Ensure the Authorization header is present
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; 
    if (!token) {
        return res.status(401).json({
            status: 'ERR',
            message: 'Authentication token is missing',
        });
    }

    // Verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(403).json({
                status: 'ERR',
                message: 'Authentication failed',
            });
        }
        if (user?.isAdmin) {
            return next(); // Continue to the next middleware if user is an admin
        } else {
            return res.status(403).json({
                status: 'ERR',
                message: 'User is not an admin',
            });
        }
    });
};

const authUserMiddleWare = (req, res, next) => {

    const authHeader = req.headers.token; // Replace with 'authorization' if needed
    const token = authHeader?.split(' ')[1];
    const userId = req.params.id;

    if (!token) {
        return res.status(401).json({
            status: 'ERR',
            message: 'Authentication token is missing',
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(403).json({
                status: 'ERR',
                message: 'Authentication failed',
            });
        }

        if (user?.isAdmin || user?.id === userId) {
            return next();
        } else {
            return res.status(403).json({
                status: 'ERR',
                message: 'User is not authorized',
            });
        }
    });
};


module.exports = {
    authMiddleWare,
    authUserMiddleWare
};
