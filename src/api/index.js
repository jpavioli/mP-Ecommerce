const express = require('express')
const cors = require ('cors')
const path = require ('path')
const Users = require('./models/Users')
const Orders = require('./models/Orders')
const OrderProducts = require('./models/OrderProducts')

const app = express()

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

app.use(express.json())
app.use(cors())

// Use Routes
app.use('/users', require('./routes/users'));
app.use('/orders', require('./routes/orders'));
app.use('/orderproducts', require('./routes/orderProducts'))

app.use(express.static(path.join(__dirname,"../../", 'build')));

app.get("/*", (req, res) => {
 res.sendFile(path.join(__dirname,"../../", "build", "index.html"));
});

// Use Routes
app.use('/adyen', require('./routes/adyen'));

//Listener Port 6969
<<<<<<< HEAD
const port = app.get('port') || 5000
=======
const port = process.env.PORT || 6969
>>>>>>> d43d5a92367ad1e026ab31fa95ebd10d156b72d1
app.listen(port,() => {console.log(`I am listening at ${port}`)})
