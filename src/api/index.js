const express = require('express')
const cors = require ('cors')
const path = require ('path')
const Users = require('./models/Users')
const Orders = require('./models/Orders')
const OrderProducts = require('./models/OrderProducts')

const app = express()

app.use(express.json())
app.use(cors())

// Use Routes
app.use('/users', require('./routes/users'));
app.use('/orders', require('./routes/orders'));
app.use('/orderproducts', require('./routes/orderProducts'))

app.use(express.static(path.join(__dirname, 'build')));

app.get("/", (req, res) => {
 res.sendFile(path.join(__dirname,"../../", "build", "index.html"));
});

// Use Routes
app.use('/adyen', require('./routes/adyen'));

//Listener Port 6969
const port = process.env.PORT || 6969
app.listen(port,() => {console.log(`I am listening at ${port}`)})
