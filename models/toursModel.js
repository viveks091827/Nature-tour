const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
    name : {
      type : String,
      required : [true, 'A tour must have a name'],
      trim : true
    },
    duration : {
      type : Number,
      required : [true, 'A tour must have a duration']
    },
    maxGroupSize : {
      type : Number,
      required : [true, 'A tour must have a group size']
    },
    difficulty : {
      type : String,
      required : [true, 'A tour must have a difficulty'],
      enum : {
        values : ['easy', 'medium', 'difficult'],
        message : 'difficulty is either: easy, medium or difficult'
      } 
    },
    ratingsAverage : {
      type : Number,
      default : 1,
      min : [1, 'A rating must be greater than or equal to 1.0'],
      max : [5, 'A rating must be less than or equal to 5.0']
    },
    ratingsQuantity : {
      type : Number, 
      default : 0
    },
    price : Number,
    summary : {
      type : String,
      trim : true,
      required : [true, 'A tour must have a description']
    },
    description : {
      type : String,
      trim : true
    }, 
    imageCover : {
      type : String,
      required : [true, 'A tour must have a cover image']
    },
    images : [String],
    createdAt : {
      type : Date,
      default : Date.now()
    }, 
    startDates : [String], 
  })

  
  
  const Tour = mongoose.model('Tour', tourSchema)
  
  module.exports = Tour