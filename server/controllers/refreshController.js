const User = require('../model/Users');
const jwt = require('jsonwebtoken');
const { model } = require('mongoose');

const handleRefreshToken = async (req, res) => { 
    const cookies = req.cookies; 
    if (!cookies?.jwt) return res.sendStatus(401); 
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); 
    
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, decoded) => { 
            if (error || foundUser.username !== decoded.username) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            res.json({ accessToken });
        }
    );
};

module.exports = { handleRefreshToken }