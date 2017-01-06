const Sequelize = require('sequelize')
const db = require('../index.js')

const columns = {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  currentPlayer: {
    type: Sequelize.STRING,
    allowNull: false
  }
};

const Game = db.define('game', columns);

module.exports = Game;
