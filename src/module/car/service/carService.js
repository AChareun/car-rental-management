/**
 * @typedef {import('../repository/abstractCarRepository')} AbstractCarRepository
 */

const Car = require('../entity/car');

module.exports = class CarService {
  /**
   * @param {AbstractCarRepository} carRepository
   */
  constructor(carRepository) {
    this.carRepository = carRepository;
  }

  /**
   * @returns {Array<Car>}
   */
  async getAll() {
    return this.carRepository.getAll();
  }

  /**
   * @param {number} id
   * @returns {Car}
   */
  async getById(id) {
    if (id === undefined) {
      throw new Error();
    }

    return this.carRepository.getById(id);
  }

  /**
   * @param {Car} car
   * @returns {Car}
   */
  async save(car) {
    if (car === undefined) {
      throw new Error();
    }

    return this.carRepository.save(car);
  }

  /**
   * @param {Car} car
   * @returns {boolean} success, or not, of the delete operation
   */
  async delete(car) {
    if (!(car instanceof Car)) {
      throw new Error();
    }

    return this.carRepository.delete(car);
  }
};
