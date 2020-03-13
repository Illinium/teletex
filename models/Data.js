const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  data: {
    type: Object,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Data = mongoose.model('data', DataSchema);