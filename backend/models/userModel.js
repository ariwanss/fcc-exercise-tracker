const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: Number,
  username: { type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);