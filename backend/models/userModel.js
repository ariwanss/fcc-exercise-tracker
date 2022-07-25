const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: { type: Number, get: id => String(id)},
  username: { type: String, required: true}
}, {
  toJSON: {getters: true},
  toObject: {getters: true}
});

module.exports = mongoose.model('User', userSchema);