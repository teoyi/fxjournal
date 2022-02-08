const { find } = require("../model/Users");

const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401); // unauthorized 
        console.log(req.roles);
        const rolesArray = [...allowedRoles]; 
        const result = req.roles.map(role => rolesArray.includes(role)); // for each item check if included
        console.log(result);
        find(val => val === true); // if there is a single true
        if (!result) return res.sendStatus(401); // unauthorized
        next(); 
    };
};

module.exports = verifyRoles 