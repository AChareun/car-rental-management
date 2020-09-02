/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

/**
 * @typedef {import('../entity/car')} Car
 */

const AbstractCarRepositoryError = require('./error/abstractCarRepositoryError');
const MethodNotImplementedError = require('./error/methodNotImplementedError');

module.exports = class AbstractCarRepository {
  constructor() {
    if (new.target === AbstractCarRepository) {
      throw new AbstractCarRepositoryError();
    }
  }

  /**
   * @returns {Array<Car>}
   */
  async getAll() {
    throw new MethodNotImplementedError();
  }

  /**
   * @param {number} id
   * @returns {Car}
   */
  async getById(id) {
    throw new MethodNotImplementedError();
  }

  /**
   * @param {Car} car
   * @returns {Car}
   */
  async save(car) {
    throw new MethodNotImplementedError();
  }

  /**
   * @param {Car} car
   * @returns {boolean} result of the delete operation
   */
  async delete(car) {
    throw new MethodNotImplementedError();
  }
};
