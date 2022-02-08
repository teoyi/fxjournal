const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');
// USER CHECK 
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
    .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

router.route('/getSingle') // do not want to put unique id in the url 
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser);

module.exports = router