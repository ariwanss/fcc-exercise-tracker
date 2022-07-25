const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
  userId: { type: Number, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, get: date => date.toDateString(), default: new Date() }
}, {
  toJSON: { getters: true },
  toObject: { getters: true }
});

module.exports = mongoose.model('Exercise', exerciseSchema);