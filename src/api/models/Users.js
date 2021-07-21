const Sequelize = require('sequelize')

const STRING = Sequelize.STRING
const INTEGER = Sequelize.INTEGER

//Open Database Connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
})

//Create the Schema
const Users = sequelize.define('users',{
    id:{
      type: STRING,
      primaryKey: true,
      unique: true
    },
    first_name: {type: STRING},
    last_name: {type: STRING},
    address1: {type: STRING},
    address2: {type: STRING},
    city: {type: STRING},
    state: {type: STRING},
    zip: {type: STRING},
    country: {type: STRING}
})

module.exports = Users

sequelize.sync()
