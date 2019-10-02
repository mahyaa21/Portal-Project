const express = require('express');
const router = express.Router();
const Course = require('../model/course')
const User = require('../model/user');
const CourseUser = require('../model/course-user');

router.get('/',(req,res)=>{

    CourseUser.find({}).then(response=>{
        res.json(response);
    }).catch(err=>{
        console.log('can not show course-user bcz ..'+ err)
    })
    
})

router.get('/get-students',(req,res)=>{

  User.find({role:'student'}).then(userFind=>{
    res.send(userFind)
  })

})

router.get('/get-courses',(req,res)=>{

  Course.find({}).then(courseFind=>{
    res.send(courseFind)
  })

})

 router.post('/create',(req,res,next)=>{

   
  const newCU = new CourseUser;
   Promise.all([ User.findOne({name: req.body.student}),Course.findOne({name: req.body.course})]).then(values=>{
     
     newCU.Course = values[1].id;
     newCU.Student = values[0].id;

     newCU.save().then(courseSaved => {
      res.send(newCU);
    }).catch(err => {
      res.send('CU does not saved because ...' + err);
    }) 

   })
      

})

module.exports = router;