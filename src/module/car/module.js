/**
 * @typedef {import('express').Application} ExpressApp
 * @typedef {import('rsdi').IDIContainer} IDIContainer
 */

const CarController = require('./controller/carController');
const CarService = require('./service/carService');
const CarRepository = require('./repository/sqlite/carRepository');
const CarModel = require('./model/carModel');

/**
 * @param {ExpressApp} app
 * @param {IDIContainer} container
 */
function carModuleInit(app, container) {
  /**
   * @type {CarController} carController
   */
  const carController = container.get('CarController');
  carController.configureRoutes(app);
}

module.exports = {
  carModuleInit,
  CarController,
  CarService,
  CarRepository,
  CarModel,
};
