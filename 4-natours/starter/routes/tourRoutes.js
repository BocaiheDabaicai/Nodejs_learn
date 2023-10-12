const express = require('express');
// const tourController = require('./../controllers/tourController')
const {
  checkID,
  aliasTopTours,
  getTourStates,
  getMonthlyPlan,
  getAllTours,
  postTour,
  getIdTour,
  updateTour,
  deleteTour,
} = require('./../controllers/tourController.js');
const router = express.Router();

// router.param('id', checkID);
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/tour-stats').get(getTourStates);
router.route('/monthly-plan/:year').get(getMonthlyPlan);

router.route('/').get(getAllTours).post(postTour);

router.route('/:id').get(getIdTour).patch(updateTour).delete(deleteTour);

module.exports = router;
