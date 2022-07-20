const express = require('express');
const router = express.Router();
const {createUser, getUsers} = require('../controllers/userController');
const {createExercise, getExercises} = require('../controllers/exerciseController');

router.route('/').post(createUser).get(getUsers);
router.get('/:_id/logs', getExercises);
router.post('/:_id/exercises', createExercise);

module.exports = router;