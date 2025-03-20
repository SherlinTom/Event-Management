const express = require('express');
const { UserAuthenticate } = require('../Middlewares/authenticate');
const { getAllUsers, removeUsers, projectStatistics } = require('../Controllers/adminController');
const router = express.Router();

router.route('/all-users').get(UserAuthenticate,getAllUsers);
router.route('/delete-user/:id').delete(UserAuthenticate,removeUsers);
router.route('/statistics').get(UserAuthenticate,projectStatistics);
module.exports = router;