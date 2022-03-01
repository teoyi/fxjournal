const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.role) return res.sendStatus(401); // unauthorized 
        const rolesArray = [...allowedRoles]; 
        const result = req.role.map(role => rolesArray.includes(role)).find(val => val === true); // check if there is a truthy val
        console.log(`Role Verification: ${result}`);
        if (!result) return res.sendStatus(401); // unauthorized
        next(); 
    };
};

module.exports = verifyRoles 