// Load environment variables
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './env/development.env' });
} else {
  require('dotenv').config({ path: './env/production.env' });
}

const express = require('express');
const middleware = require('../config/middleware.js');
const routes = require('../config/routes.js');
const app = express();

middleware(app, express);
routes(app);

module.exports.start = () => {
  app.listen(process.env.PORT, () => {
    console.log(`${process.env.APP_NAME} is listening at ${process.env.HOST} on port ${process.env.PORT}.`);
  });
};
