const express = require('express');
const router = express.Router();
const Course = require('../model/course')
const User = require('../model/user');
const CourseUser = require('../model/course-user');
router.get('/', (req, res) => {
  //  res.send('there is course router!')
    Course.find({}).then(courses => {
        res.json(courses)
    }).catch(err => {
        res.send('Course does not show because ...' + err);
      })
})

 router.post('/create',(req,res)=>{

    //const newCU = new CourseUser;
    const newCourse = new Course;
    newCourse.name = req.body.name;
    newCourse.status = req.body.status;
     User.findOne({name: req.body.teacher}).then(teacherUser=>{
        newCourse.teacher = teacherUser.id;
        //newCU.user = teacherUser.id;
    }); 
    //newCU.course = 
    newCourse.save().then(courseSaved => {
        res.send(newCourse);
      }).catch(err => {
        res.send('Course does not saved because ...' + err);
      })

      

})

router.get('/edit/:id',(req,res)=>{

    Course.findOne({_id: req.params.id}).then(course=>{

        //res.render('admin/corses/edit',{course: course});
        User.findOne({_id: req.params.id}).then(user=>{

            //res.render('admin/corses/edit',{course: course});
           // res.send(user);
    
        });
        res.send(course)
    });

})

router.put('/edit/:id',(req,res)=>{

    Course.findOne({_id: req.params.id}).then(course=>{

        course.name = req.body.name;
        course.status = req.body.status;
         User.findOne({name: req.body.teacher}).then(teacherUser=>{
            course.teacher = teacherUser.id;
        }); 
        course.save().then(savedcourse=>{

            res.redirect('/courses');

        });


    })
});

router.delete('/:name',(req, res)=>{

    Course.findOne({name: req.params.name},'_id').then(res=>{

        // Course.deleteOne({_id: res.id}).then(result=>{

        //     console.log(result)
        //     res.send(result)
        //     //  alert('delete successfully!')
        //      // req.flash('success_message','category was successfully updated');
      
        //      // res.redirect('/courses');
      
        //   }).catch(err => {
        //     res.send('Course does not delete because ...' + err);
        //   });
    }).catch(err => {
        res.send('Course does not find because ...' + err);
      })
   


});
 

module.exports = router;