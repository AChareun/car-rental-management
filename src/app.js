require('dotenv').config();
const express = require('express');
const nunjucks = require('nunjucks');

const configureDI = require('./config/di');
const { carModuleInit } = require('./module/car/module');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

nunjucks.configure('src/module', {
  autoescape: true,
  express: app,
});

const diContainer = configureDI();

carModuleInit(app, diContainer);

/**
 * @type {import('./module/car/controller/carController')} carController
 */
const carController = diContainer.get('CarController');

app.get('/', carController.list.bind(carController));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://localhost:${PORT}`);
});
