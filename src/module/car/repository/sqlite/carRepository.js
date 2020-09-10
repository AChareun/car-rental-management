/**
 * @typedef {import('better-sqlite3').Database} SQLiteDb
 * @typedef {import('../../entity/car')} Car
 */

const AbstractCarRepository = require('../abstractCarRepository');
const CarNotFoundError = require('../error/carNotFoundError');
const CarNotDefinedError = require('../error/carNotDefinedError');
const { fromDbToEntity } = require('../../mapper/carMapper');

module.exports = class CarRepository extends AbstractCarRepository {
  /**
   * @param {SQLiteDb} dbAdapter
   */
  constructor(dbAdapter) {
    super();
    this.dbAdapter = dbAdapter;
  }

  /**
   * @returns {Array<Car>} all Cars stored in the DB
   */
  async getAll() {
    const db = this.dbAdapter;

    const cars = db.prepare(`
    SELECT
    id,
    brand,
    model,
    year,
    kms,
    color,
    has_air_conditioning,
    passengers,
    is_automatic
    FROM cars`).all();

    return cars.map((car) => fromDbToEntity(car));
  }

  /**
   * @param {number} id
   * @returns {Car}
   */
  async getById(id) {
    const db = this.dbAdapter;

    const car = db.prepare(
      `SELECT
        id,
        brand,
        model,
        year,
        kms,
        color,
        has_air_conditioning,
        passengers,
        is_automatic
        FROM cars WHERE id = ?`,
    ).get(id);

    if (car === undefined) {
      throw new CarNotFoundError(`Car with ID ${id} was not found`);
    }

    return fromDbToEntity(car);
  }

  /**
   * @param {Car} car
   * @returns {Car}
   */
  async save(car) {
    const db = this.dbAdapter;
    let carId;

    if (car.id) {
      carId = car.id;
      const updateStatement = db.prepare(`
      UPDATE cars SET
        brand = ?,
        model = ?,
        year = ?,
        kms = ?,
        color = ?,
        has_air_conditioning = ?,
        passengers = ?,
        is_automatic = ?
      WHERE id = ${car.id}
      `);

      updateStatement.run([
        car.brand,
        car.model,
        car.year,
        car.kms,
        car.color,
        car.hasAirConditioning,
        car.passengers,
        car.isAutomatic,
      ]);
    } else {
      const insertStatement = db.prepare(`
      INSERT INTO cars(
        brand,
        model,
        year,
        kms,
        color,
        has_air_conditioning,
        passengers,
        is_automatic
      ) VALUES(?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const insertResult = insertStatement.run([
        car.brand,
        car.model,
        car.year,
        car.kms,
        car.color,
        car.hasAirConditioning,
        car.passengers,
        car.isAutomatic,
      ]);

      carId = insertResult.lastInsertRowid;
    }

    return this.getById(carId);
  }

  /**
   * @param {Car} car
   */
  async delete(car) {
    const db = this.dbAdapter;

    if (!car || !car.id) {
      throw new CarNotDefinedError('Car to delete is not defined');
    }

    db.prepare(`DELETE FROM cars WHERE id = ${car.id}`).run();

    return true;
  }
};
