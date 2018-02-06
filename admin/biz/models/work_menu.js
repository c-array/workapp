/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('work_menu', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    linkUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    level: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    parentId: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    order: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    className: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'work_menu'
  });
};
