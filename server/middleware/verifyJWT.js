const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization; 
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401); // unauthorized 
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (error, decoded) => {
            if (error) return res.sendStatus(403); // invalid token 
            req.user = decoded.UserInfo.username;
            req.role = decoded.UserInfo.roles; 
            next(); 
        }
    );
};

module.exports = verifyJWT