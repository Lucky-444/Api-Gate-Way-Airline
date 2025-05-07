'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.User, { foreignKey: 'userId' });
      // this.belongsTo(models.Role, { foreignKey: 'roleId' });
    }
  }
  User_Role.init({
    userId: {
      type : DataTypes.INTEGER,
      allowNull : false,
    },
    roleId: {
      type:DataTypes.INTEGER,
      allowNull : false,
    }
  }, {
    sequelize,
    modelName: 'User_Role',
  });
  return User_Role;
};