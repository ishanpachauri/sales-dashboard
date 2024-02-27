const fs = require('fs');

const getData = (async (reqBody) => {
  return new Promise((resolve, reject) => {
  try {
      const filePath = './public/json/sales.json';
    
      const readableStream = fs.createReadStream(filePath, { encoding: 'utf8' });
      
      let jsonData = '';
      readableStream.on('data', (chunk) => {
        jsonData += chunk;
      });
      readableStream.on('end', async () => {
        const parsedData = JSON.parse(jsonData);
        const uniqueStates = [...new Set(parsedData.map(item => item.State))].sort();
        const dataToSend = {
          state : uniqueStates[0],
          parsedData
        }
        if(reqBody && reqBody.state) {
          dataToSend.state = reqBody.state;
        }
        const data = await getStateData(dataToSend);
        readableStream.close();
        resolve({...data, states : uniqueStates});
      });
      
      readableStream.on('error', (err) => {
        throw new Error(err);
      });
    } catch (err) {
      reject({message : err.message});
    } 
  })
});

const getStateData = (paramData) => {
  return new Promise((resolve, reject) => {
    try {
      let fromDate = null;
      let toDate = null;
      let filteredData = [];
      paramData.parsedData.filter(data => {
        if(data.State === paramData.state) {
          if (fromDate) {
            if (new Date(fromDate) > new Date(data["Order Date"])) {
              fromDate = data["Order Date"];
            }
          } else {
            fromDate = data["Order Date"];
          }
      
          if (toDate) {
            if (new Date(toDate) < new Date(data["Order Date"])) {
              toDate = data["Order Date"];
            }
          } else {
            toDate = data["Order Date"];
          }
          filteredData.push(data);
        }
      });
      resolve({fromDate, toDate, filteredData});
    } catch(err) {
      reject({message : err.message});
    }
    })
}


// const getStateData = (paramData) => {
//   return new Promise((resolve, reject) => {
//     try {
//       let fromDate = null;
//       let toDate = null;
//       let filteredData = [];
//       let totalSales = 0;
//       let quatitySold = 0;
//       let discount = 0;
//       let profit = 0;
//       let saleByCity = {};
//       let saleByProduct = {};
//       let saleByCategory = {};
//       let saleBySubCategory = {};
//       let saleBySegment = {};
//       paramData.parsedData.filter(data => {
//         if(data.State === paramData.uniqueStates[0]) {
//           if (fromDate) {
//             if (new Date(fromDate) > new Date(data["Order Date"])) {
//               fromDate = data["Order Date"];
//             }
//           } else {
//             fromDate = data["Order Date"];
//           }
      
//           if (toDate) {
//             if (new Date(toDate) < new Date(data["Order Date"])) {
//               toDate = data["Order Date"];
//             }
//           } else {
//             toDate = data["Order Date"];
//           }
//           filteredData.push(data);
//           totalSales += data.Sales;
//           quatitySold += data.Quantity;
//           discount += data.Discount;
//           profit += data.Profit;

//           if(saleByCity[data.City]) {
//             saleByCity[data.City] += data.Sales;
//           } else {
//             saleByCity[data.City] = data.Sales;
//           }
//           if(saleByProduct[data['Product Name']]) {
//             saleByProduct[data['Product Name']] += data.Sales;
//           } else {
//             saleByProduct[data['Product Name']] = data.Sales;
//           }
//           if(saleByCategory[data.Category]) {
//             saleByCategory[data.Category] += data.Sales;
//           } else {
//             saleByCategory[data.Category] = data.Sales;
//           }
//           if(saleBySubCategory[data["Sub-Category"]]) {
//             saleBySubCategory[data["Sub-Category"]] += data.Sales;
//           } else {
//             saleBySubCategory[data["Sub-Category"]] = data.Sales;
//           }
//           if(saleBySegment[data.Segment]) {
//             saleBySegment[data.Segment] += data.Sales;
//           } else {
//             saleBySegment[data.Segment] = data.Sales;
//           }
//         }
//       });
//       totalSales = totalSales.toFixed(2);
//       profit = profit.toFixed(2);
//       resolve({filteredData, fromDate, toDate, totalSales, quatitySold, discount, profit, saleByCity, saleByProduct,saleByCategory, saleBySubCategory, saleBySegment});
//     } catch(err) {
//       reject({message : err.message});
//     }
//     })
// }

module.exports = {
  getData
};