const express = require('express');
var router = express.Router();
var authController = require('../../controllers/mongodbcontroller/auth_controller.js');
var addbooks = require('../../controllers/mongodbcontroller/add_books');
const student = require('../../controllers/studentController');


router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.userLogout);
router.post('/addbooks', addbooks.booksadded);
router.get('/getbooks', addbooks.getbboks);
router.post('/updatebook', addbooks.updatebook);

router.post('/filepath', authController.filepath);
router.get('/getuserdata', authController.getuserData);
router.post('/studentRegistation',student.insertStudent)


module.exports = router;