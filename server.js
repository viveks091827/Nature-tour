const app = require('./app')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config({path : './config.env'})

const DB = process.env.DATABASE_LOCAL

mongoose.connect(DB, {
    useNewUrlParser : true
}).then(con => {
  console.log('connect to mongoDB')
})

const port = 8000;
app.listen(port, () => {
  console.log(`server listening at port ${port}`);
});
