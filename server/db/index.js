'use strict';
var db = require('./_db');
var User = require('./models/user');
var Alert = require('./models/alert');
var Favorite = require('./models/favorite');
var Stop = require('./models/stop');

Alert.belongsTo(User);
User.hasMany(Alert);

Favorite.belongsTo(User);
User.hasMany(Favorite);

Stop.belongsTo(Alert);
Stop.belongsTo(Favorite);

module.exports=db;
