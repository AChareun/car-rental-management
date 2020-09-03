const {
  default: DIContainer, object, get, factory,
} = require('rsdi');
const Sqlite3Database = require('better-sqlite3');
const fs = require('fs');

const { CarController, CarService, CarRepository } = require('../module/car/module');

function configureDatabaseAdapter() {
  const sqlite3Database = new Sqlite3Database(process.env.DB_PATH, {
    // eslint-disable-next-line no-console
    verbose: console.log,
  });

  const migration = fs.readFileSync('./src/config/setup.sql', 'utf8');
  sqlite3Database.exec(migration);

  return sqlite3Database;
}

/**
 * @param {DIContainer} container
 */
function addCommonDefinitions(container) {
  container.addDefinitions({
    DatabaseAdapter: factory(configureDatabaseAdapter),
  });
}

/**
 * @param {DIContainer} container
 */
function addCarModuleDefinitions(container) {
  container.addDefinitions({
    CarRepository: object(CarRepository).construct(get('DatabaseAdapter')),
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
