'use strict'
const Sequelize = require('sequelize')


const url = process.env.DATABASE_URL || 'postgres://localhost:5432/stratego'

console.log(`Opening database connection to ${url}`);

// create the database instance
const db = module.exports = new Sequelize(url, {
  native: true,   // lets Sequelize know we can use pg-native for ~30% more speed
  define: {
    freezeTableName: true,   // don't change table names from the one specified
    timestamps: true,        // automatically include timestamp columns
  }
})

// pull in our models
const Game = require('./models/game');
const Player = require('./models/player');
const Piece = require('./models/piece');

Piece.belongsTo(Player);
Player.hasMany(Piece);
Player.belongsTo(Game);
Game.hasMany(Player);


// sync the db, creating it if necessary
function sync() {
  return db.sync()
    .then(() => console.log(`Synced models to db ${url}`))
    .catch(fail => {
      console.log(fail)
    })
}

db.didSync = sync();
