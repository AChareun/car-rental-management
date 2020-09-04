const AbstractController = require('../abstractController');
const AbstractControllerError = require('../error/abstractControllerError');

test('AbstractController can not be directly instantiated', () => {
  let controllerInstance;
  try {
    controllerInstance = new AbstractController();
  } catch (error) {
    expect(error).toBeInstanceOf(AbstractControllerError);
  } finally {
    expect(controllerInstance).toBeUndefined();
  }
});

test('A concrete class that inherits from AbstractController can be instantiated', () => {
  const ConcreteController = class extends AbstractController {};

  expect(new ConcreteController()).toBeInstanceOf(AbstractController);
});
