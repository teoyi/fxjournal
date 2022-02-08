const User = require('../model/Users'); // for the schema 
const bcrypt = require('bcrypt'); // for encryption 

const handleNewUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ 'message' : 'Username and password is required'});

    // check for duplicates in database 
    const duplicate = await User.findOne({ username: username }).exec(); 
    if (duplicate) return res.sendStatus(409); // conflict 

    try { 
        // password encryption 
        const hashedPwd = await bcrypt.hash(password,10);

        // create and store new User 
        const result = await User.create({ 
            "username": username,
            "password": hashedPwd
        });

        console.log(result); 

        // on success 
        res.status(201).json({ 'success' : `New user ${username} created`});
    } catch (error) { 
        res.status(500).json({ 'message' : error.message});
    };
};

module.exports = { handleNewUser };

