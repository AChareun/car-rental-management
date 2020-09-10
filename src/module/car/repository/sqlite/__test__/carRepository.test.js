const Sqlite3Database = require('better-sqlite3');
const fs = require('fs');
const CarRepository = require('../carRepository');
const CarNotFoundError = require('../../error/carNotFoundError');
const CarNotDefinedError = require('../../error/carNotDefinedError');
const Car = require('../../../entity/car');

let mockDb;

beforeEach(() => {
  mockDb = new Sqlite3Database(':memory:');
  const migration = fs.readFileSync('./src/config/setup.sql', 'utf8');
  mockDb.exec(migration);
});

/**
 * @param {CarRepository} repository
 */
async function saveTestCar(repository, id = null) {
  return repository.save(
    new Car({
      id,
      brand: id ? 'newBrand' : 'brand',
      model: 'model',
      year: 1995,
      kms: 0,
      color: 'color',
      hasAirConditioning: 1,
      passengers: 4,
      isAutomatic: 0,
    }),
  );
}

test('Save a new Car generates a new id', async () => {
  const testRepo = new CarRepository(mockDb);
  const testCar = await saveTestCar(testRepo);

  expect(testCar.id).toEqual(1);
});

test('Calling method save with an existing Car updates its values', async () => {
  const testRepo = new CarRepository(mockDb);
  let testCar = await saveTestCar(testRepo);

  expect(testCar.id).toEqual(1);
  expect(testCar.brand).toEqual('brand');

  testCar = await saveTestCar(testRepo, 1);

  expect(testCar.id).toEqual(1);
  expect(testCar.brand).toEqual('newBrand');
});

test('Trying to update a non-existing Car throws an error', () => {
  const testRepo = new CarRepository(mockDb);

  expect(saveTestCar(testRepo, 1)).rejects.toThrowError();
});

test('Trying to get a non-existing Car throws a specific error', async () => {
  const testRepo = new CarRepository(mockDb);

  try {
    await testRepo.getById(1);
  } catch (error) {
    expect(error).toBeInstanceOf(CarNotFoundError);
  }
});

test('Method getById returns the correct Car', async () => {
  const testRepo = new CarRepository(mockDb);
  const testCar = await saveTestCar(testRepo);

  expect(testCar.id).toEqual(1);
  expect(testRepo.getById(1)).resolves.toEqual(testCar);
});

test('Delete method deletes the correct Car', async () => {
  const testRepo = new CarRepository(mockDb);
  const testCar = await saveTestCar(testRepo);
  const testCar2 = await saveTestCar(testRepo);

  expect(testCar.id).toEqual(1);
  expect(testCar2.id).toEqual(2);

  expect(testRepo.delete(testCar)).resolves.toBe(true);
  expect(testRepo.getById(1)).rejects.toThrowError();
  expect(testRepo.getById(2)).resolves.toEqual(testCar2);
});

test('Trying to delete a non-existing Car throws a specific errro', async () => {
  const testRepo = new CarRepository(mockDb);

  try {
    await testRepo.delete({});
  } catch (error) {
    expect(error).toBeInstanceOf(CarNotDefinedError);
  }
});

test('Method getAll returns all Cars', async () => {
  const testRepo = new CarRepository(mockDb);
  expect(testRepo.getAll()).resolves.toEqual([]);

  const testCar = await saveTestCar(testRepo);
  const testCar2 = await saveTestCar(testRepo);

  expect(testRepo.getAll()).resolves.toEqual([testCar, testCar2]);
});
