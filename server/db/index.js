'use strict';
var db = require('./_db');
var User = require('./models/user');
var Alert = require('./models/alert');
var Favorite = require('./models/review');

Alert.belongsTo(User);
User.hasMany(Alert);

Favorite.belongsTo(User);
User.hasMany(Favorite);

module.exports=db;

