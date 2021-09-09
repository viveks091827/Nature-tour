const express = require('express')
const controller = require('../controllers/tourController')
  
  
  const routes = express.Router()
  
  
  routes.route('/')
  .get(controller.getAllTours).post(controller.createTour);
  
  routes.route('/tour-stats')
  .get(controller.getTourStats)


  routes
    .route('/:id')
    .get(controller.getTour)
    .patch(controller.updateTour)
    .delete(controller.deleteTour);

    module.exports = routes