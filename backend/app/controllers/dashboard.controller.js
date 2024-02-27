const { dashboardServices } = require('../services');

const getDashboardData = (async (req, res) => {
  try {
    const dashboardData = await dashboardServices.getData();
    res.send({success:true, ...dashboardData});
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
});

const getStateData = (async (req, res) => {
  try {
    const dashboardData = await dashboardServices.getData(req.body);
    res.send({success:true, ...dashboardData});
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
});

module.exports = {
  getDashboardData,
  getStateData
};