const express = require('express');
const dashboardController = require('../controllers/dashboard.controller');

const router = express.Router();

router.get('/get-dashboard-data', dashboardController.getDashboardData);
router.post('/get-state-data', dashboardController.getStateData)

module.exports = router;