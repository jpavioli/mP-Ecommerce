const express = require('express');
const router = express.Router();

const Orders = require('../models/Orders')

router.post('/', (req, res) => {
  Orders.create({...req.body})
    .then(order => res.status(200).json(order))
    .catch(err => res.status(404).json({ success: false }));
});

router.get('/',(req,res)=>{
  Orders.findAll()
    .then(allOrders=>res.status(200).json(allOrders))
    .catch(err => res.status(404).json({ success: false }))
})

module.exports = router;
