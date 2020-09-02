/* eslint-disable max-classes-per-file */

const AbstractCarRepository = require('../abstractCarRepository');
const AbstractCarRepositoryError = require('../error/abstractCarRepositoryError');
const MethodNotImplementedError = require('../error/methodNotImplementedError');

test('AbstractCarRepository cannot be instantiated directly', () => {
  let repositoryInstance;
  try {
    repositoryInstance = new AbstractCarRepository();
  } catch (error) {
    expect(error).toBeInstanceOf(AbstractCarRepositoryError);
  } finally {
    expect(repositoryInstance).toBeUndefined();
  }
});

test('A concrete implementation of AbstractCarRepository can be instantiated', () => {
  const ConcreteRepository = class extends AbstractCarRepository {};
  const instanceOfConcrete = new ConcreteRepository();

  expect(instanceOfConcrete).toBeInstanceOf(AbstractCarRepository);
  expect(instanceOfConcrete).toBeInstanceOf(ConcreteRepository);
});

test('Abstract methods throw an error when being called with no implementation', () => {
  const ConcreteRepository = class extends AbstractCarRepository {};
  const instanceOfConcrete = new ConcreteRepository();

  expect(() => instanceOfConcrete.getAll()).rejects.toThrowError(MethodNotImplementedError);
  expect(() => instanceOfConcrete.getById()).rejects.toThrowError(MethodNotImplementedError);
  expect(() => instanceOfConcrete.save()).rejects.toThrowError(MethodNotImplementedError);
  expect(() => instanceOfConcrete.delete()).rejects.toThrowError(MethodNotImplementedError);
});
