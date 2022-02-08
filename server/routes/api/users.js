const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');

router.route('/')
    .get(usersController.getAllUsers)
    .delete(usersController.deleteUser);

router.route('/getSingle') // do not want to put unique id in the url 
    .get(usersController.getUser);

module.exports = router