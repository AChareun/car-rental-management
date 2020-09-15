const {
  default: DIContainer, object, get, factory,
} = require('rsdi');
const session = require('express-session');
const { Sequelize } = require('sequelize');

const {
  CarController, CarService, CarRepository, CarModel,
} = require('../module/car/module');

function configureSequelizeDatabase() {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH,
  });

  return sequelize;
}

function configureSession() {
  const A_DAY_IN_SECONDS = 86400;

  const configuredSession = session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: A_DAY_IN_SECONDS },
  });

  return configuredSession;
}

/**
 * @param {DIContainer} container
 */
function addCommonDefinitions(container) {
  container.addDefinitions({
    Sequelize: factory(configureSequelizeDatabase),
    Session: factory(configureSession),
  });
}

/**
 * @param {DIContainer} container
 */
function configureCarModel(container) {
  CarModel.setup(container.get('Sequelize'));

  return CarModel;
}

/**
 * @param {DIContainer} container
 */
function addCarModuleDefinitions(container) {
  container.addDefinitions({
    CarModel: factory(configureCarModel),
    CarRepository: object(CarRepository).construct(get('CarModel')),
    CarService: object(CarService).construct(get('CarRepository')),
    CarController: object(CarController).construct(get('CarService')),
  });
}

module.exports = function configureDI() {
  const container = new DIContainer();

  addCommonDefinitions(container);
  addCarModuleDefinitions(container);

  return container;
};
