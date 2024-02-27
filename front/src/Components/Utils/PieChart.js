import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

export const PieChart = ({ value, title }) => {
  const options = {
    title : {
      text : title
    },
    legend: {
      orient: 'horizontal',
      x: 'center',
      y: 'bottom',
      data: Object.keys(value)
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        labelLine: {
          show: false
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold'
          }
        },
        data : value ? Object.keys(value).map((val) => {
          return {value : value[val], name : val}
        }) : []
      }
    ]
  };

  return <ReactECharts option={options} style={{ height: '350px' }} />;
};

export default PieChart;
