const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

module.exports = (app, express) => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers',
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
  });

  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.join(`${__dirname}./../../dist`)));
  app.use('/videos', express.static(path.join(`${__dirname}./../../dist`)));
};
