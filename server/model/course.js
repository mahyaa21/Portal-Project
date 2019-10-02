const mongoose = require('mongoose');
const User = require('../model/user');
const Schema = mongoose.Schema;

const courseSchema = new Schema({


  name: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now()
  },
  status: {   //I:Inprogress and D:Done

    type: String,
    required: true

  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});

module.exports = mongoose.model('Course', courseSchema);