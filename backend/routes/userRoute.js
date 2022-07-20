const express = require('express');
const router = express.Router();
const {createUser, getUsers, deleteAllUsers} = require('../controllers/userController');
const {createExercise, getExercises, deleteAllExercises} = require('../controllers/exerciseController');

router.route('/').post(createUser).get(getUsers);
router.get('/:_id/logs', getExercises);
router.post('/:_id/exercises', createExercise);
router.delete('/exercises/purge', deleteAllExercises);
router.delete('/purge', deleteAllUsers);

module.exports = router;