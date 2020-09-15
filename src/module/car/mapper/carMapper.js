/**
 * @typedef {import('../model/carModel')} CarModel
 */

const Car = require('../entity/car');

/**
 * @param {Object} formData
 * @returns {Car}
 */
function fromDataToEntity({
  id,
  brand,
  model,
  year,
  kms,
  color,
  'has-air-conditioning': hasAirConditioning,
  passengers,
  'is-automatic': isAutomatic,
  'unitary-value': unitaryValue,
}) {
  return new Car({
    id,
    brand,
    model,
    year,
    kms,
    color,
    hasAirConditioning,
    passengers,
    isAutomatic,
    unitaryValue,
  });
}

/**
 * @param {CarModel} carModel
 * @returns {Car}
 */
function fromModelToEntity(carModel) {
  return new Car(carModel.toJSON());
}

module.exports = {
  fromDataToEntity,
  fromModelToEntity,
};
