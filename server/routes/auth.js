const express = require('express');
const router = express.Router(); 
const fooController = require('../controllers/foo');

router.post('/', fooController.foo);

module.exports = router;