var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('alert', {
  starttime: {
      type: Sequelize.DATE
    },
  endtime:  {
      type: Sequelize.DATE
    },
  interval: {
      type: Sequelize.INTEGER,
      defaultValue: 5
  },
  recur: {
    type: Sequelize.BOOLEAN
  },
  weekdays: {
      type: Sequelize.ARRAY (Sequelize.INTEGER),
      defaultValue: [1,2,3,4,5]
  }
});
