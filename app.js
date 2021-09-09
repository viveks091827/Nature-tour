const express = require('express');
const userRoute = require('./routes/userRoutes')
const tourRoute = require('./routes/tourRoutes')

const app = express();

const { fileURLToPath } = require('url');
const res = require('express/lib/response');


app.use(express.json());
app.use(express.static(`${__dirname}/public`))



app.use('/api/v1/users', userRoute)
app.use('/api/v1/tours', tourRoute)

module.exports = app