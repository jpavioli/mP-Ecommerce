const Sequelize = require('sequelize')

const STRING = Sequelize.STRING
const INTEGER = Sequelize.INTEGER

//Open Database Connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
})

//Create the Schema
const Orders = sequelize.define('orders',{
    id:{
      type: STRING,
      primaryKey: true,
      unique: true
    },
    user_id: {type: STRING},
    value: {type: INTEGER},
    currency: {type: STRING},
    pspReference: {type:STRING}
})

module.exports = Orders

sequelize.sync()
