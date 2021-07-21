const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const Users = require('../models/Users')

router.post('/', (req, res) => {
  let {firstName,lastName,city,state,zip,country,address1,address2} = req.body
  let id = uuidv4()
  Users.create({id,firstName,lastName,city,state,zip,country,address1,address2})
    .then(user => res.status(200).json(user))
    .catch(err => res.status(404).json({ success: false }))
});

router.get('/',(req,res)=>{
  Users.findAll()
    .then(allUsers=>res.status(200).json(allUsers))
    .catch(err => res.status(404).json({ success: false }))
})

module.exports = router;
