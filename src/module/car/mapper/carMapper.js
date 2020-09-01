const Car = require('../entity/car');

/**
 * @param {Object} formData 
 * @returns {Car}
 */
function fromDataToEntity({
  brand,
  model,
  year,
  kms,
  color,
  'has-air-conditioning': hasAirConditioning,
  passengers,
  'is-automatic': isAutomatic
}) {
  return new Car({
    brand,
    model,
    year,
    kms,
    color,
    hasAirConditioning,
    passengers,
    isAutomatic
  })
}

/**
 * @param {Object} DbData 
 * @returns {Car}
 */
function fromDbToEntity({
  brand,
  model,
  year,
  kms,
  color,
  has_air_conditioning: hasAirConditioning,
  passengers,
  is_automatic: isAutomatic
}) {
  return new Car({
    brand,
    model,
    year,
    kms,
    color,
    hasAirConditioning,
    passengers,
    isAutomatic
  })
}

module.exports = {
  fromDataToEntity,
  fromDbToEntity
};
