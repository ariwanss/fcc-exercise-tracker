const User = require('../models/userModel');
const { updateCounter } = require('../config/counter');
const asyncHandler = require('express-async-handler');

const createUser = asyncHandler(async (req, res) => {
  console.log('Creating a user...');
  let { _id, username } = await User.create({
    _id: (await updateCounter('exerciseTrackerUserCounter')).lastValue,
    username: req.body.username
  });
  console.log(`Created a user: ${JSON.stringify({ _id, username })}`);
  res.json({ _id, username });
});

const getUser = (_id) => {
  // console.log(`Searching for a user with _id: ${_id}...`);
  return User.findOne({ _id: _id }).select({_id: 1, username: 1});
};

const getUsers = asyncHandler(async (req, res) => {
  console.log('Fetching all users...');
  let users = await User.find().select({_id: 1, username: 1});
  console.log(`Retrieved users: ${JSON.stringify(users)}`);
  res.json(users);
}); 

module.exports = {
  createUser,
  getUser,
  getUsers
}