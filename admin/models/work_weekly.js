/* jshint indent: 2 */

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
    week: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'work_weekly'
  });
};
