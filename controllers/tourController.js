const Tour = require('./../models/toursModel')
const apiFeatures = require('./../utils/apiFeatures')

exports.getAllTours = async (req, res) => {
  try {
    const features = new apiFeatures(Tour.find(), req.query).filter().sort().limitFields().paginate()
    const tours = await features.query
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(400).json({
      status : 'fail',
      message : err
    })
  }
  
  };
  
  exports.getTour = async (req, res) => {
    try {
      const tour = await Tour.findById(req.params.id)
      res.status(200).json({
        response: 'success',
        data: {
          tour,
        },
      });
    } catch (err) {
      res.status(400).json({
        status : 'fail',
        message : 'error'
      })
    }
 
  };
  
  exports.createTour = async (req, res) => {
    try {
      const newTour = await Tour.create(req.body)
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        }
      })
    } catch(err) {
      req.status(400).json({
        status : 'fail',
        message : 'error'
      })
    }

  }
  
  exports.updateTour = async (req, res) => {
    try {
      const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
        runValidators : true
      } )
      res.status(200).json({
        status : 'success', 
        data : updatedTour
      })
    } catch (err) {
    res.status(400).json({
      status : 'Error', 
      message : err
    })
  }
  };
  
  exports.deleteTour = async (req, res) => {
    try {
      await Tour.findByIdAndDelete(req.params.id)
      res.status(200).json({
        status : 'sucess', 
        message : 'deleted'
      })
    } catch (err) {
      res.status(400).json({
        status : 'Error', 
        message : err
    })
  }
  };

  exports.getTourStats = async (req, res) => {
    try {
      const stats = await Tour.aggregate([
        {
        $match : { ratingsAverage : { $gte : 4.5} }
        },
        {
          $group: {
            _id : {$toUpper : '$difficulty'},
            num : {$sum : 1},
            numRating : {$sum : '$ratingsQuantity'},
            avgRating : {$avg : '$ratingsAverage'},
            avgPrice : {$avg : '$price'},
            minPrice : {$min : '$price'},
            maxPrice : {$max : '$price'}
          }
        },
        {
          $sort : {avgPrice : 1}
        },
        {
          $match : {_id : {$ne : 'EASY'}}
        }
      ])

      res.status(200).json({
        status : 'sucess', 
        data : {
          stats
        }
      })
    } catch(err) {
      res.status(400).json({
        status : 'Error', 
        message : err
    })
    }
  }