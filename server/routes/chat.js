var express = require('express');
var router = express.Router();
const Chatkit = require('@pusher/chatkit-server')

const chatkit = new Chatkit.default({
    instanceLocator: 'v1:us1:d8e95432-dbb2-4e8f-8b0b-f0b97789a88c',
    key: '55adbf55-a5ca-40f9-91fc-97c3fd39ee49:i9w4GFHJUq4R9380iQwvuP0RkEgckFAb+YxV8Sz+sMo=',
  })

router.post('/', (req, res) => {
    const  currentuser  = req.body.user
     console.log(currentuser)
     chatkit
     .createUser({
        id: user.id, 
        name: user.name 
      })
      .then(() => res.sendStatus(201))
      .catch(error => {
        if (error.error === 'services/chatkit/user_already_exists') {
          res.sendStatus(200)
        } else {
          res.status(error.status).json(error)
        }
      }) 
  })
  
  router.post('/authenticate', (req, res) => {
    const authData = chatkit.authenticate({ userId: req.query.user_id })
    res.status(authData.status).send(authData.body)
  })

  module.exports = router;