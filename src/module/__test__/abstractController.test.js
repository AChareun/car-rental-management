const AbstractController = require('../abstractController');
const AbstractControllerError = require('../error/abstractControllerError');

test('AbstractController can not be directly instantiated', () => {
  try {
    // eslint-disable-next-line no-new
    new AbstractController();
  } catch (error) {
    expect(error).toBeInstanceOf(AbstractControllerError);
  }
});

test('A concrete class that inherits from AbstractController can be instantiated', () => {
  const ConcreteController = class extends AbstractController {};

  expect(new ConcreteController()).toBeInstanceOf(AbstractController);
});
