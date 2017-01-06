const Sequelize = require('sequelize')
const db = require('../index.js')

const columns = {
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false
  },
  x: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  y: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
};

const Piece = db.define('piece', columns);

module.exports = Piece;
