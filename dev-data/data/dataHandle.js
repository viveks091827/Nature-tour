const dotenv = require('dotenv')
const mongoose = require('mongoose')
const fs = require('fs')
const Tour = require('../../models/toursModel')

dotenv.config({path : './../../config.env'})

const DB = process.env.DATABASE_LOCAL

mongoose.connect(DB, {
    useNewUrlParser : true
}).then(con => {
  console.log('connect to mongoDB')
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'))

const importData = async () => {
    try {
      await Tour.create(tours)
      console.log('Data sucessfully imported')
    } catch(err) {
      console.log(err)
    }
}

const deleteData = async () => {
  try {
    await Tour.deleteMany()
    console.log('Data sucessfully deleted')
  } catch(err) {
    console.log(err)
  }
}

if (process.argv[2] === 'import') {
  importData()
}
else if (process.argv[2] === 'delete') {
  deleteData()
}