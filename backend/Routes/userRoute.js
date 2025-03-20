const express = require('express');
const { userRegister, userLogin, getUserProfile, updateProfile, userLogout } = require('../Controllers/userController');
const { UserAuthenticate, userAuthorize, verifyUserAccess, verifyOwnership } = require('../Middlewares/authenticate');
const { addEvent, allEventsofUser, updateEvent, allEvents, deleteEvent, eventDetails } = require('../Controllers/eventController');
const router = express.Router();

router.route('/register').post(userRegister);
router.route('/login').post(userLogin);
router.route('/user-profile').get(UserAuthenticate,getUserProfile);
router.route('/update-profile').put(UserAuthenticate,updateProfile);
router.route('/add-event').post(UserAuthenticate,userAuthorize('user'),addEvent);
router.route('/my-events').get(UserAuthenticate,userAuthorize('user'),allEventsofUser);
router.route('/update-event/:id').put(UserAuthenticate,userAuthorize('user'),updateEvent);
router.route('/all-events').get(allEvents);
router.route('/delete-event/:id').delete(UserAuthenticate,userAuthorize('user'),deleteEvent);
router.route('/event-details/:id').get(UserAuthenticate,userAuthorize('user'),eventDetails);
router.route('/logout').post(UserAuthenticate,userLogout);
module.exports = router;