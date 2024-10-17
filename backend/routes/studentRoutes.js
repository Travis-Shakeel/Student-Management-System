const express = require('express');
const { loginStudent, registerStudent, singlePost, allStudentData, individualStudentData, getEnrolledSections, getFees, getCourses, updateFees, getGrades, searchCourse, addCourse, removeCourse, replyPost, allPosts, createPost, editStudent, addGrades, editStudentPassword, addFees} = require('../controllers/studentController');

const router = express.Router();

router.route('/login').post(loginStudent);
router.route('/register').post(registerStudent);
router.route('/posts').get(allPosts)
router.route('/posts/:id').get(singlePost);
router.route('/posts').post(createPost);
router.route('/:id').get(individualStudentData);
router.route('/sections/:id').get(getEnrolledSections);
router.route('/fees/:id').get(getFees);
router.route('/courses/:id').get(getCourses);
router.route('/fees/:id').put(updateFees);
router.route('/grades/:id').get(getGrades);
router.route('/grades/:email').put(addGrades);
router.route('/searchCourses/:name').get(searchCourse);
router.route('/sections/:id').put(addCourse);
router.route('/sections/:id').delete(removeCourse);
router.route('/replyPosts/:id').put(replyPost);
router.route('/edit/:id').patch(editStudent);
router.route('/editPassword/:id').patch(editStudentPassword);
router.route('/').get(allStudentData);
router.route('/addReceipt/:id').put(addFees);



module.exports = router;