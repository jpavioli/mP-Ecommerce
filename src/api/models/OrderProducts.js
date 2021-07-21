const Sequelize = require('sequelize')

const STRING = Sequelize.STRING
const INTEGER = Sequelize.INTEGER

//Open Database Connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
})

//Create the Schema
const OrderProducts = sequelize.define('orderProducts',{
    id:{
      type: STRING,
      primaryKey: true,
      unique: true
    },
    cost: {type: INTEGER},
    name: {type: STRING},
    product_id: {type: STRING},
    order_id: {type: STRING}
})

module.exports = OrderProducts

sequelize.sync()
