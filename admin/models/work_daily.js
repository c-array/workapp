/* jshint indent: 2 */
var moment = require('moment');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('work_daily', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
    },
    itemId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
    },
    taskName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    usedTime: {
      type: "DOUBLE",
      allowNull: false,
      defaultValue: '0'
    },
    description: {
      type: DataTypes.TEXT,
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
    tableName: 'work_daily'
  });
};
