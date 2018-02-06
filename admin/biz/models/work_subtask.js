/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('work_subtask', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    subTaskName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dailyId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      references: {
        model: 'work_daily',
        key: 'id'
      }
    }
  }, {
    tableName: 'work_subtask'
  });
};
