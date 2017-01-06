const express = require('express');
const Game = require('../db/models/game');
const Player = require('../db/models/player');
const Piece = require('../db/models/piece');

const router = express.Router();

// /api/games
router.get('/games', (req, res, next) => {
  Game.findAll({})
  .then(games => res.send(games));
});

router.get('/games/:id', (req, res, next) => {
  Game.findById(req.params.id)
  .then(game => res.send(game));
});

router.post('/games', (req, res, next) => {
  Game.create(req.body)
  .then(game => res.send(game));
});

router.put('/games/:id', (req, res, next) => {
  Game.findById(req.params.id)
  .then(game => game.update(req.body))
  .then(() => res.sendStatus(204));
});

// /api/players

// returns an array of objects with a player and its pieces
router.get('/players', (req, res, next) => {
  let allPlayers;
  Player.findAll({})
  .then(players => {
    allPlayers = players;
    const gettingPieces = players.map((player) => player.getPieces());
    return Promise.all(gettingPieces);
  })
  .then(piecesArr => {
    const playersAndPieces = piecesArr.map((pieces, i) => ({player: allPlayers[i], pieces: pieces}));
    res.send(playersAndPieces);
  });
});

router.get('/players/:id', (req, res, next) => {
  let thePlayer;
  Player.findById(req.params.id)
  .then(player => {
    thePlayer = player;
    return player.getPieces();
  })
  .then(pieces => {
    const playerAndPieces = {player: thePlayer, pieces: pieces};
    res.send(playerAndPieces);
  });
});

router.post('/players', (req, res, next) => {
  console.log(req.body);
  Player.create(req.body)
  .then(player => res.send(player));
});

router.put('/players/:id', (req, res, next) => {
  Player.findById(req.params.id)
  .then(player => player.update(req.body))
  .then(() => res.sendStatus(204));
});


// /api/pieces
router.get('/pieces', (req, res, next) => {
  Piece.findAll({})
  .then(pieces => res.send(pieces));
});

router.get('/pieces/:id', (req, res, next) => {
  Piece.findById(req.params.id)
  .then(piece => res.send(piece));
});

router.post('/pieces', (req, res, next) => {
  if (!req.body[0]) {
    Piece.create(req.body)
    .then(piece => res.send(piece));
  }
  else {
     Piece.bulkCreate(req.body)
    .then(pieces => res.send(pieces));
  }
});

router.delete('/pieces/:playerid', (req, res, next) => {
  Piece.destroy({where: {playerid: req.params.playerid}})
  .then(() => res.send(200));
});

router.put('/pieces/:id', (req, res, next) => {
  Piece.findById(req.params.id)
  .then(piece => piece.update(req.body))
  .then(() => res.sendStatus(204));
});


module.exports = router;
