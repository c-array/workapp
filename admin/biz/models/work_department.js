/* jshint indent: 2 */
var moment = require('moment');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('work_department', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    depName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    depDescribe: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true,
      get() {
        return moment(this.getDataValue('createTime')).format('YYYY-MM-DD');
      }
    }
  }, {
    tableName: 'work_department'
  });
};
