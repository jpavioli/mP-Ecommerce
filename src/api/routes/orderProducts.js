const express = require('express');
const router = express.Router();

const OrderProducts = require('../models/OrderProducts.js')

router.post('/', (req, res) => {
  OrderProducts.create({...req.body})
    .then(orderProduct => res.status(200).json(orderProduct))
    .catch(err => res.status(404).json({ success: false }));
});

router.get('/',(req,res)=>{
  OrderProducts.findAll()
    .then(all=>res.status(200).json(all))
    .catch(err => res.status(404).json({ success: false }))
})

module.exports = router;
