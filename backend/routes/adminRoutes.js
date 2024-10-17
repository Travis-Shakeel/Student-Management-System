const express = require('express');
const { loginAdmin, addSection, individualAdminData, removeSection,removeStudent, allSections } = require('../controllers/adminController');

const router = express.Router();

router.route('/login').post(loginAdmin);
router.route('/section').post(addSection);
router.route('/:id').get(individualAdminData);
router.route('/section/:course_id').delete(removeSection);
router.route('/removeStudent/:email').delete(removeStudent);
router.route('/').get(allSections);

module.exports = router;