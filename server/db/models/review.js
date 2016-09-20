var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('alert', {
  startHr: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 23
    }
  },
  startMin: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 59
    }
  },
  endHr: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 23
    }
  },
  endMin: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 59
    }
  },
  timezone: {
    type: Sequelize.STRING //????
  }
  recur: {
    type: Sequelize.BOOLEAN
  },
  days: {
    type: Sequelize.ARRAY (Sequelize.INTEGER)
  },
  title: {
    type: Sequelize.STRING
  }
});
