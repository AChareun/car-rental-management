const { Sequelize } = require('sequelize');

const CarModel = require('../carModel');

const sequelizeInstance = new Sequelize('sqlite::memory:');

test('CarModel setup creates Cars table on database', async () => {
  CarModel.setup(sequelizeInstance);

  await sequelizeInstance.sync({ force: true });

  await expect(CarModel.findAll()).resolves.toEqual([]);
});
