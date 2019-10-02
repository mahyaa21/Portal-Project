var express = require('express');
var router = express.Router();
const User = require('../model/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  // res.send('respond with a resource');
   /* res.json([{
    id: 1,
    name: "Hiccup",
    password: 'hiccup'
  }, {
    id: 2,
    name: "King Arthur",
    password: 'king-arthur'
  }]); */ C

  User.find({}).then(userfind=>{
    res.send(userfind);
    res.json(userfind);
  }).catch(err=>{
    res.send('user does not show because ...' + err);
  })
  
});

router.post('/login', (req, res) => {

  const newUser = new User;
  newUser.password = req.body.password;
  newUser.email = req.body.email;

  newUser.save().then(userSaved => {
    res.send(newUser);
  }).catch(err => {
    res.send('user does not saved because ...' + err);
  })

})

router.get('/login', (req, res) => {

  User.findOne({ email: 'mahyaka12@gmail.com' }, function (error, users) {

    if(users)
    {
      res.send(users); //Display the comments returned by MongoDB, if any were found. Executes after the query is complete.
    }else{
      res.send('user not found!');
    }
    

  });

})
module.exports = router;
