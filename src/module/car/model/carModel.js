/**
 * @typedef {import('sequelize').Sequelize} Sequelize
 */

const { Model, DataTypes } = require('sequelize');

module.exports = class CarModel extends Model {
  /**
     * @param {Sequelize} sequelizeInstance
     * @returns {CarModel}
     */
  static setup(sequelizeInstance) {
    CarModel.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      kms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hasAirConditioning: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      passengers: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isAutomatic: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize: sequelizeInstance,
      modelName: 'Car',
      timestamps: true,
    });

    return CarModel;
  }
};
