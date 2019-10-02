const express = require('express');
const router = express.Router();
const Course = require('../model/course')
const User = require('../model/user');
const CourseUser = require('../model/course-user');
router.get('/', (req, res) => {
    res.send('there is course router!')
    Course.find({}).then(courses => {
        res.json({
            id: req.courses.id,
            name: req.courses.name,
            teacher: req.course.teacher

        })
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

router.delete('/:id',(req, res)=>{

    Course.remove({_id: req.params.id}).then(result=>{

       // req.flash('success_message','category was successfully updated');

        res.redirect('/courses');

    });


});
 

module.exports = router;