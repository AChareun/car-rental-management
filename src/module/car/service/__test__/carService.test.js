const CarService = require('../carService');
const Car = require('../../entity/car');

const repositoryMock = {
  getAll: jest.fn(),
  getById: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

const testService = new CarService(repositoryMock);

test('getAll calls the getAll method from the repository', () => {
  testService.getAll();

  expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
});

test('getById calls getById method from the repository with the id passed', () => {
  testService.getById(1);

  expect(repositoryMock.getById).toHaveBeenCalledWith(1);
});

test('calling getById with no id throws an error', async () => {
  await expect(testService.getById).rejects.toThrowError();
});

test('save calls save method from the repository with car passed', () => {
  const testCar = new Car({});
  testService.save(testCar);

  expect(repositoryMock.save).toHaveBeenCalledWith(testCar);
});

test('calling save with no car throws an error', async () => {
  await expect(testService.save()).rejects.toThrowError();
});

test('delete calls delete method from the repository', () => {
  const testCar = new Car({});
  testService.delete(testCar);

  expect(repositoryMock.delete).toHaveBeenCalledWith(testCar);
});

test('calling delete with something that is not a Car instance throws an error', async () => {
  await expect(testService.delete({})).rejects.toThrowError();
});
