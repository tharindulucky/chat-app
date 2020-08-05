'use strict';
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    authorId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  Session.associate = function(models) {
    // associations can be defined here
    Session.hasMany(models.SessionUser, {as: 'me', foreignKey: 'sessionId'});
    Session.hasMany(models.SessionUser, {as: 'allparticipants', foreignKey: 'sessionId'});
    Session.hasMany(models.Message, {as: 'messages', foreignKey: 'sessionId'});
  };
  return Session;
};