module.exports = class Car {
  constructor({
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
  }) {
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.kms = kms;
    this.color = color;
    this.hasAirConditioning = hasAirConditioning;
    this.passengers = passengers;
    this.isAutomatic = isAutomatic;
    this.unitaryValue = unitaryValue;
  }
};
