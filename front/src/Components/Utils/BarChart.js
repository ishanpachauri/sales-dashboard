import React from 'react';
import ReactECharts from 'echarts-for-react';

export const BarChart = ({ data }) => {
  const option = {
    title : {
      text : 'Sales By City',

    },
    grid: {
      left: '5%',
      right: '10%',
      bottom: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      splitLine: { show: true },
    },
    yAxis: {
      type: 'category',
      data: Object.keys(data),
      axisLabel: {
        interval: 0,
        rotate: 0,
      },
    },
    series: [
      {
        type: 'bar',
        data: Object.values(data),
        itemStyle: {
          color: '#8BD0E0',
        },
      }
    ],
  };
  return <ReactECharts option={option} style={{ height: '332px' }} />;
};
