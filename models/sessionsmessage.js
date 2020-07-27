'use strict';
module.exports = (sequelize, DataTypes) => {
  const SessionsMessage = sequelize.define('SessionsMessage', {
    content: DataTypes.TEXT,
    sessionId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  SessionsMessage.associate = function(models) {
    // associations can be defined here
  };
  return SessionsMessage;
};