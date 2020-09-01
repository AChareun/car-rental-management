module.exports = class Car {
  constructor({
    brand,
    model,
    year,
    kms,
    color,
    hasAirConditioning,
    passengers,
    isAutomatic
  }) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.kms = kms;
    this.color = color;
    this.hasAirConditioning = hasAirConditioning;
    this.passengers = passengers;
    this.isAutomatic = isAutomatic;
  }
}
