import axios from "axios";
import {url} from "../url";

const getDashboardData = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${url}/dashboard/get-dashboard-data`)
    .then((result) => {
      resolve(result.data);
    })
    .catch((error) => {
      reject(error);
    });
  })
};

const getStateInfo = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(`${url}/dashboard/get-state-data`, data)
    .then((result) => {
      resolve(result.data);
    })
    .catch((error) => {
      reject(error);
    });
  })
};

export { getDashboardData, getStateInfo };