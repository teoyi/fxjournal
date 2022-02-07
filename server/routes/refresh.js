const express = require('express');
const router = express.Router(); 
const fooController = require('../controllers/foo');

router.get('/', fooController.foo);

module.exports = router;