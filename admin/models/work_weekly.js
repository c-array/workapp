/* jshint indent: 2 */
var moment = require('moment');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('work_weekly', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER(255).UNSIGNED,
      allowNull: true,
      references: {
        model: 'work_admin',
        key: 'id'
      }
    },
    taskName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    createDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      get() {
        return moment(this.getDataValue('createDate')).format('YYYY-MM-DD');
      }
    }
  }, {
    tableName: 'work_weekly'
  });
};
