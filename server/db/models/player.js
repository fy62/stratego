const Sequelize = require('sequelize')
const db = require('../index.js')

const columns = {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false
  }
};

const Player = db.define('player', columns);

module.exports = Player;
