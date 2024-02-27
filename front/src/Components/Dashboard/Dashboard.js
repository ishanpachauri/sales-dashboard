import React, { useEffect, useState } from 'react';
import DiscountIcon from '../../assets/images/discountIcon.png'
import ProfitIcon from "../../assets/images/profit.png";
import QuantityIcon from "../../assets/images/quantity.png";
import SalesIcon from "../../assets/images/sales.png";
import { PieChart } from '../Utils/PieChart';
import { CardDiv } from "../Utils/Card";
import { Container, Grid, Typography, TextField, MenuItem, Card, CardContent, ListItem, Box  } from '@mui/material';
import {CustomList} from "../Utils/CustomList";
import { getDashboardData, getStateInfo } from "../../services";
import { BarChart } from "../Utils/BarChart";

export const Dashboard = () => {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [data, setData] = useState({});
  const [filteredData, setFilteredData] = useState();
  useEffect(() => {
    getDashboardData()
      .then(result => {
        if(result.success) {
          setStates(result.states)
          setSelectedState(result.states[0]);
          setFromDate(result.fromDate);
          setToDate(result.toDate);
          setMinDate(result.fromDate);
          setMaxDate(result.toDate);
          setFilteredData(result.filteredData);
          getStateData({
            state : result.states[0],
            fromDate : result.fromDate,
            toDate : result.toDate,
            filteredData : result.filteredData
          });
        } else alert('Something went wrong!');
      })
      .catch(err => {
        alert('Something went wrong!');
      });
  }, []);

  const getStateData = (paramData) => {
    let totalSales = 0;
    let quatitySold = 0;
    let discount = 0;
    let profit = 0;
    let saleByCity = {};
    let saleByProduct = {};
    let saleByCategory = {};
    let saleBySubCategory = {};
    let saleBySegment = {};
    paramData.filteredData.filter(data => {
      if(new Date(data["Order Date"]) >= new Date(paramData.fromDate) && new Date(data["Order Date"]) <= new Date(paramData.toDate)) {
        
        totalSales += data.Sales;
        quatitySold += data.Quantity;
        discount += data.Discount;
        profit += data.Profit;

        if(saleByCity[data.City]) {
          saleByCity[data.City] += data.Sales;
        } else {
          saleByCity[data.City] = data.Sales;
        }
        if(saleByProduct[data['Product Name']]) {
          saleByProduct[data['Product Name']] += data.Sales;
        } else {
          saleByProduct[data['Product Name']] = data.Sales;
        }
        if(saleByCategory[data.Category]) {
          saleByCategory[data.Category] += data.Sales;
        } else {
          saleByCategory[data.Category] = data.Sales;
        }
        if(saleBySubCategory[data["Sub-Category"]]) {
          saleBySubCategory[data["Sub-Category"]] += data.Sales;
        } else {
          saleBySubCategory[data["Sub-Category"]] = data.Sales;
        }
        if(saleBySegment[data.Segment]) {
          saleBySegment[data.Segment] += data.Sales;
        } else {
          saleBySegment[data.Segment] = data.Sales;
        }
      }
    });
    totalSales = totalSales.toFixed(2);
    profit = profit.toFixed(2);
    discount = discount.toFixed(2);
    setData({totalSales, quatitySold, discount, profit, saleByCity, saleByProduct,saleByCategory, saleBySubCategory, saleBySegment});
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    let dataToSend = {
      fromDate : fromDate,
      toDate : toDate,
      state : selectedState,
      filteredData : filteredData
    }
    if(name == 'fromDate') {
      setFromDate(value);
      dataToSend.fromDate = value;
    } else {
      setToDate(value);
      dataToSend.toDate = value;
    }
    getStateData(dataToSend);
  }

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    const dataToSend = {
      state : e.target.value
    }
    getStateInfo(dataToSend)
      .then(result => {
        if(result.success) {
          setFromDate(result.fromDate);
          setToDate(result.toDate);
          setMinDate(result.fromDate);
          setMaxDate(result.toDate);
          setFilteredData(result.filteredData);
          getStateData({
            state : e.target.value,
            fromDate : result.fromDate,
            toDate : result.toDate,
            filteredData : result.filteredData
          });
        } else {
          alert('Something went wrong!');
        }
      })
      .catch(err => {
        alert('Something went wrong!');
      })
  }

  return (
    <Container>
      <Grid
        container
        spacing={2}
        justifyContent="flex-end"
        alignItems="center"
        style={{ marginBottom: "20px" }}
      >
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Sales Overview
          </Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            select
            label="Select a state"
            fullWidth
            variant="outlined"
            margin="normal"
            value={selectedState}
            onChange={(e) => handleStateChange(e)}
          >
            {
              states.length > 0 && states.map((state, key) => {
                return <MenuItem value={state} key={key}>{state}</MenuItem>                
              }) 
            }
          </TextField>
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            label="Select From Date"
            type="date"
            fullWidth
            variant="outlined"
            margin="normal"
            name='fromDate'
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: minDate,
              max: maxDate
            }}
            value={fromDate}
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            label="Select To Date"
            type="date"
            fullWidth
            variant="outlined"
            margin="normal"
            name='toDate'
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: minDate,
              max: maxDate
            }}
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        alignItems="center"
        style={{ marginBottom: "20px" }}
      >
        <Grid item xs={12} md={3}>
          <CardDiv
            icon={SalesIcon}
            title={"Total Sales"}
            number={data.totalSales ? data.totalSales : 0}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <CardDiv
            icon={QuantityIcon}
            title={"Quantity Sold"}
            number={data.quatitySold ? data.quatitySold : 0}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <CardDiv 
            icon={DiscountIcon} 
            title={"Discount%"} 
            number={data.discount ? data.discount : 0} />
        </Grid>
        <Grid item xs={12} md={3}>
          <CardDiv 
            icon={ProfitIcon} 
            title={"Profit"} 
            number={data.profit ? data.profit : 0} />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        alignItems="center"
        style={{ marginBottom: "20px" }}
        className='grid_box'
      >
        <Grid item xs={12} md={6}>
          <Card style={{ height: "100%" }}>
            <CardContent>
              {/* <Typography variant="subtitle1">Card Title</Typography> */}
              {/* <Charts data={[200, 300]} type="pie" /> */}
              <BarChart data={data.saleByCity ? data.saleByCity : {}}/>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} className='Gridbox'>
            <CustomList title={"Sales By Products"} header={"Product Name"} listData={data.saleByProduct ? data.saleByProduct : {}} />
        </Grid>
        
      </Grid>
      <Grid 
        container 
        spacing={2} 
        alignItems="center" 
        style={{ marginBottom: "20px" }}
        className='grid_box'>
        <Grid item xs={12} md={4}>
          <Card style={{ height: "100%" }}>
            <CardContent>
              {/* <Charts data={[200, 300]} type="pie" /> */}
              <PieChart value={data.saleByCategory ? data.saleByCategory : []} title={'Sales By Category'} type="pie" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomList title={"Sales By Sub Category"} header={"Sub Category"} listData={data.saleBySubCategory ? data.saleBySubCategory : {}} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card style={{ height: "100%" }}>
            <CardContent>
              <PieChart value={data.saleBySegment ? data.saleBySegment : []} title={'Sales By Segment'} type="pie" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
