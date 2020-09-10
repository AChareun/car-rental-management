const CarController = require('../carController');
const Car = require('../../entity/car');

const serviceMock = {
  save: jest.fn(),
  delete: jest.fn(() => Promise.resolve(true)),
  getById: jest.fn(() => Promise.resolve({})),
  getAll: jest.fn(() => Promise.resolve([])),
};

const testController = new CarController(serviceMock);

test('List renders the car-list view', async () => {
  const renderMock = jest.fn();

  await testController.list({ session: { errors: [], messages: [] } }, { render: renderMock });
  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('car/view/car-list.html', {
    data: { carList: [] },
    errors: [],
    messages: [],
    styles: 'car-list.css',
  });
});

test('Register renders the car-form view', async () => {
  const renderMock = jest.fn();
  await testController.register({}, { render: renderMock });

  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('car/view/car-form.html', {
    styles: 'car-form.css',
  });
});

test('View renders the car-info view with a Car data received from the service', async () => {
  const renderMock = jest.fn();
  const testCar = new Car({ id: 1 });
  serviceMock.getById.mockImplementationOnce(() => Promise.resolve(testCar));

  await testController.view({ params: { id: 1 } }, { render: renderMock });

  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('car/view/car-info.html', {
    data: { car: testCar },
    styles: 'car-info.css',
  });
});

test('Save calls the service with the req body and redirects to /car', async () => {
  const redirectMock = jest.fn();
  const bodyMock = new Car({
    id: 1,
    brand: 'brand',
    model: 'model',
    year: 2000,
    kms: 0,
    color: 'black',
    'has-air-conditioning': true,
    passengers: 4,
    'is-automatic': false,
  });

  await testController.save({
    body: bodyMock,
    session: { errors: [], messages: [] },
  }, { redirect: redirectMock });

  expect(serviceMock.save).toHaveBeenCalledTimes(1);
  expect(serviceMock.save).toHaveBeenCalledWith(bodyMock);
  expect(redirectMock).toHaveBeenCalledTimes(1);
  expect(redirectMock).toHaveBeenCalledWith('/car');
});

test('Delete calls the service with the req body id and redirects to /car', async () => {
  const testCar = new Car({ id: 1 });
  serviceMock.getById.mockImplementationOnce(() => Promise.resolve(testCar));
  const redirectMock = jest.fn();

  await testController.delete({
    params: { id: 1 },
    session: { errors: [], messages: [] },
  }, { redirect: redirectMock });

  expect(serviceMock.delete).toHaveBeenCalledTimes(1);
  expect(serviceMock.delete).toHaveBeenCalledWith(testCar);
  expect(redirectMock).toHaveBeenCalledTimes(1);
  expect(redirectMock).toHaveBeenCalledWith('/car');
});
