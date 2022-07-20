const Exercise = require('../models/exerciseModel');
const asyncHandler = require('express-async-handler');
const { getUser } = require('./userController');

const createExercise = asyncHandler(async (req, res) => {
  console.log(`Adding an exercise for user: ${req.body._id}`);
  let { _id, username } = await getUser(req.body._id);
  let { description, duration, date } = await Exercise.create({
    userId: req.body._id,
    description: req.body.description,
    duration: req.body.duration,
    date: req.body.date
  });
  let addedExercise = {
    _id,
    username,
    description,
    duration,
    date
  };
  console.log(`Added an exercise: ${JSON.stringify(addedExercise)}`);
  res.json(addedExercise);
});

const getExercises = asyncHandler(async (req, res) => {
  console.log(`Fetching exercise log for user: ${req.params._id} + 
  ${req.query.from ? `\nfrom: ${req.query.from}` : ''} + 
  ${req.query.to ? `\nto: ${req.query.to}` : ''} + 
  ${req.query.limit ? `\nlimit: ${req.query.limit}` : ''}`);
  
  let exercises = await Exercise
    .find({ userId: req.params._id, })
    .where('date').gte(req.query.from || 0).lte(req.query.to || new Date())
    .limit(req.query.limit || Infinity)
    .select({ _id: 0, description: 1, duration: 1, date: 1 });
  let { _id, username } = await getUser(req.params._id);
  let userLog = {
    _id,
    username,
    count: exercises.length,
    log: exercises
  }
  console.log(`Retrieved exercise log: `);
  console.log(userLog);
  res.json(userLog);
});

const deleteAllExercises = asyncHandler(async (req, res) => {
  console.log('Deleting all exercise records...');
  let response = await Exercise.deleteMany();
  console.log(`Deleted: ${JSON.stringify(response)}`);
  res.json(response);
})

module.exports = {
  createExercise,
  getExercises,
  deleteAllExercises
}