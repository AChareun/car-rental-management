/**
 * @typedef {import('../../model/carModel')} CarModel
 * @typedef {import('../../entity/car')} Car
 */

const AbstractCarRepository = require('../abstractCarRepository');
const CarNotFoundError = require('../error/carNotFoundError');
const CarNotDefinedError = require('../error/carNotDefinedError');
const CarNotSavedError = require('../error/carNotSavedError');
const { fromModelToEntity } = require('../../mapper/carMapper');

module.exports = class CarRepository extends AbstractCarRepository {
  /**
   * @param {CarModel} carModel
   */
  constructor(carModel) {
    super();
    this.carModel = carModel;
  }

  /**
   * @returns {Array<Car>} all Cars stored in the DB
   */
  async getAll() {
    const cars = await this.carModel.findAll();

    return cars.map((car) => fromModelToEntity(car));
  }

  /**
   * @param {number} id
   * @returns {Car}
   */
  async getById(id) {
    try {
      const car = await this.carModel.findByPk(id);
      return fromModelToEntity(car);
    } catch (error) {
      throw new CarNotFoundError(`Car with ID ${id} was not found`);
    }
  }

  /**
   * @param {Car} car
   * @returns {Car}
   */
  async save(car) {
    let carModel = this.carModel.build(car, { isNewRecord: !car.id });

    try {
      carModel = await carModel.save();
      return fromModelToEntity(carModel);
    } catch (error) {
      throw new CarNotSavedError('It was not possible to save the Car');
    }
  }

  /**
   * @param {Car} car
   */
  async delete(car) {
    if (!car || !car.id) {
      throw new CarNotDefinedError('Car to delete is not defined');
    }

    return Boolean(await this.carModel.destroy({
      where: {
        id: car.id,
      },
    }));
  }
};
