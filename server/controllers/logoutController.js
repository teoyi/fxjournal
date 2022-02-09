const User = require('../model/Users');

const handleLogout = async (req, res) => {
    // make sure to delete access token on client side as well 

    const cookies = req.cookies; 
    if(!cookies?.jwt) return res.sendStatus(204); // no content 
    const refreshToken = cookies.jwt; 
    // Check if refreshToken is in the db 
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) { 
        res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204); // no content 
    }

    // delete exisitng refreshToken in db 
    foundUser.refreshToken = ''; 
    const result = await foundUser.save(); 
    console.log(result); 

    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true }); 
    res.sendStatus(204); 
}

module.exports = { handleLogout }