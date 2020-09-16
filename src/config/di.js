const {
  default: DIContainer, object, get, factory,
} = require('rsdi');
const session = require('express-session');
const { Sequelize } = require('sequelize');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

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

function configureSequelizeStore() {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.SESSION_DB_PATH,
  });

  return new SequelizeStore({ db: sequelize });
}

/**
 * @param {DIContainer} container
 */
function configureSession(container) {
  const A_DAY_IN_SECONDS = 86400;
  const sequelizeStore = container.get('SequelizeStore');

  const sessionOptions = {
    store: sequelizeStore,
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: A_DAY_IN_SECONDS },
  };

  return session(sessionOptions);
}

/**
 * @param {DIContainer} container
 */
function addCommonDefinitions(container) {
  container.addDefinitions({
    Sequelize: factory(configureSequelizeDatabase),
    SequelizeStore: factory(configureSequelizeStore),
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
