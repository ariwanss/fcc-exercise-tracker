const mongoose = require('mongoose');

const counterSchema = mongoose.Schema({
  name: String,
  lastValue: Number
});

const Counter = mongoose.model('Counter', counterSchema);

const initCounter = async (counterName) => {
  try {
    let counter = await Counter.findOneAndUpdate({ name: counterName }, { $setOnInsert: { name: counterName, lastValue: 0 } }, { upsert: true, new: true });
    console.log(`Counter initiated { name: ${counter.name}, lastValue: ${counter.lastValue} }`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const updateCounter = (counterName) => {
  return Counter.findOneAndUpdate({ name: counterName }, { $inc: { lastValue: 1 } }, { new: true });
}

const resetCounter = (counterName) => {
  return Counter.findOneAndUpdate({ name: counterName }, { $set: { lastValue: 0 } }, { new: true });
}

module.exports = {
  initCounter,
  updateCounter,
  resetCounter
}
