const User = require('../model/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username|| !password) return res.status(400).json({ 'message': 'Username and password are required'});

    const foundUser = await User.findOne({ username: username }).exec(); // look for user with same username
    if (!foundUser) return res.sendStatus(401); // unauthorized 

    // password evaluation 
    const match = await bcrypt.compare(password, foundUser.password); 
    if (match) {
        const roles = Object.values(foundUser.roles); 
        
        // create JWTs 
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d'} // NOTE: CHANGE THIS TO A FEW MINUTES ON PROD
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // save refreshToken with current user 
        foundUser.refreshToken = refreshToken; 
        const result = await foundUser.save();
        console.log(result);

        // set cookie for refresh token 
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000}); // secure: true is needed for prod
        res.json({ accessToken, roles });
    } else {
        res.sendStatus(401); //unauthorized
    };
};

module.exports = { handleLogin };