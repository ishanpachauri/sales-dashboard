const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require("morgan");
const cors = require('cors');
const routes = require('./app/routes');
const dotenv = require('dotenv');
dotenv.config();

const port = 8135;
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

const unexpectedErrorHandler = (error) => {
  console.log(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);