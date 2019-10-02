const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
 

  name:{
    type: String,
    required: true
  },
  email: {
      type: String,
      unique: true,
      required: true
  }
  , password: {
    type: String,
    unique: true,
    required: true,
  },
  avatar:{
    type: String
  },
  
  role:{
    type: String,
    required: true
  },
  course:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }
});

module.exports = mongoose.model('User', userSchema);