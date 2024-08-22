const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({message: 'User is not authorized'});
            }
            req.user = decoded.user;
            next();
        });
    } else {
        return res.status(401).json({message: 'User is not authorized or token is missing'});
    }
};

module.exports = validateToken;
