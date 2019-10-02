const mongoose = require('mongoose');
const User = require('../model/user');
const Schema = mongoose.Schema;

const HomeWorkSchema = new Schema({


  name: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now()
  },

});

module.exports = mongoose.model('HomeWork', HomeWorkSchema);