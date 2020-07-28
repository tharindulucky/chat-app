'use strict';
module.exports = (sequelize, DataTypes) => {
  const SessionUser = sequelize.define('SessionUser', {
    userId: DataTypes.INTEGER,
    sessionId: DataTypes.INTEGER
  }, {});
  SessionUser.associate = function(models) {
    // associations can be defined here
    SessionUser.belongsTo(models.User, {as:'userData', targetKey: "id", foreignKey: 'userId'});
  };
  return SessionUser;
};