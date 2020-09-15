const { Sequelize } = require('sequelize');

const CarRepository = require('../carRepository');
const CarNotFoundError = require('../../error/carNotFoundError');
const CarNotDefinedError = require('../../error/carNotDefinedError');
const CarNotSavedError = require('../../error/carNotSavedError');
const CarModel = require('../../../model/carModel');
const Car = require('../../../entity/car');

const testSequelizeInstance = new Sequelize('sqlite::memory:');
/**
* @type {CarRepository} testRepo
*/
let testRepo;

const fakeNewCar = new Car({
  brand: 'Ford',
  model: 'Fiesta',
  year: 2014,
  kms: 0,
  color: 'white',
  hasAirConditioning: 1,
  passengers: 4,
  isAutomatic: 0,
  unitaryValue: 1000,
});

beforeAll(() => {
  const carModel = CarModel.setup(testSequelizeInstance);
  testRepo = new CarRepository(carModel);
});

beforeEach(async (done) => {
  await testSequelizeInstance.sync({ force: true });
  done();
});

test('Save a new Car generates a new id', async () => {
  const testCar = await testRepo.save(fakeNewCar);

  expect(testCar.id).toEqual(1);
});

test('Calling method save with an existing Car updates its values', async () => {
  let testCar = await testRepo.save(fakeNewCar);

  expect(testCar.id).toEqual(1);
  expect(testCar.kms).toEqual(0);

  testCar.kms = 15000;
  testCar = await testRepo.save(testCar);

  expect(testCar.id).toEqual(1);
  expect(testCar.kms).toEqual(15000);
});

test('A failed save operation throws a specific Error', async () => {
  try {
    await testRepo.save({ brand: 'Honda' });
  } catch (error) {
    expect(error).toBeInstanceOf(CarNotSavedError);
  }
});

test('Trying to get a non-existing Car throws a specific error', async () => {
  try {
    await testRepo.getById(1);
  } catch (error) {
    expect(error).toBeInstanceOf(CarNotFoundError);
  }
});

test('Method getById returns the correct Car', async () => {
  const testCar = await testRepo.save(fakeNewCar);

  expect(testCar.id).toEqual(1);
  await expect(testRepo.getById(1)).resolves.toEqual(testCar);
});

test('Delete method deletes the correct Car', async () => {
  const testCar = await testRepo.save(fakeNewCar);
  const testCar2 = await testRepo.save(fakeNewCar);

  expect(testCar.id).toEqual(1);
  expect(testCar2.id).toEqual(2);

  await expect(testRepo.delete(testCar)).resolves.toBe(true);
  await expect(testRepo.getById(1)).rejects.toThrowError();
  await expect(testRepo.getById(2)).resolves.toEqual(testCar2);
});

test('Trying to delete a non-existing Car throws a specific error', async () => {
  try {
    await testRepo.delete({});
  } catch (error) {
    expect(error).toBeInstanceOf(CarNotDefinedError);
  }
});

test('Method getAll returns all Cars', async () => {
  await expect(testRepo.getAll()).resolves.toEqual([]);

  const testCar = await testRepo.save(fakeNewCar);
  const testCar2 = await testRepo.save(fakeNewCar);

  await expect(testRepo.getAll()).resolves.toEqual([testCar, testCar2]);
});
