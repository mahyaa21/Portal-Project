const mongoose = require('mongoose');
const Course = require('../model/course');
const User = require('../model/user');
const Schema = mongoose.Schema;

const CUSchema = new Schema({
 
    Course:{
        type: Schema.Types.ObjectId,
        ref: 'Course',
      },
      
    Student:{
        type: Schema.Types.ObjectId,
        ref: 'User',
      }

 
});

module.exports = mongoose.model('CourseUser', CUSchema);