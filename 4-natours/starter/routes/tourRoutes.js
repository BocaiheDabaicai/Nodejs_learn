const express = require('express');
// const tourController = require('./../controllers/tourController')
const {
  checkID,
  getAllTours,
  postTour,
  getIdTour,
  updateTour,
  deleteTour,
} = require('./../controllers/tourController.js');
const router = express.Router();

// router.param('id', checkID);

router.route('/').get(getAllTours).post(postTour);

router.route('/:id').get(getIdTour).patch(updateTour).delete(deleteTour);

module.exports = router;
