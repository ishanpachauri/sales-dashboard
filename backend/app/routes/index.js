const express = require('express');
const router = express.Router();
const dashboardRoute = require('./dashboard.route');

const defaultRoutes = [
  {
    path: '/dashboard',
    route: dashboardRoute,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;