import axios from 'axios';

export const initialState = {
  selectedSquare: {},
  selectedPiece: {},
  pieceMoves: [],
  board: {},
  redStartPieces: [],
  blueStartPieces: [],
  playerName: '',
  playerSide: '',
  playerId: '',
  opponentName: '',
  players: []
};

export const savePieces = (pieces) => {
  return dispatch => {
    axios.post(`/api/pieces`, pieces)
      .then(res => {
        console.log('posting pieces!!!!: ', res.data);
      })
  };
};

export const setPlayer = (playerName, playerSide, playerId) => ({
    type: 'SET_PLAYER',
    playerName,
    playerSide,
    playerId
});

export const createPlayer = (playerName, playerSide) => {
  return dispatch => {
    axios.post(`/api/players`, {name: playerName, color: playerSide})
      .then(res => {
        console.log('posting!!!!: ', res.data);
        dispatch(setPlayer(playerName, playerSide, res.data.id));
      })
  };
};

export const setPlayers = (players) => ({
    type: 'SET_PLAYERS',
    players
});

export const getPlayers = () => {
  return dispatch => {
    axios.get(`/api/players`)
      .then(res => res.data)
      .then(players => {
        console.log('getting!!!!: ', players);
        dispatch(setPlayers(players));
      })
  };
};

export const setBlueStart = (blueStartPieces, opponentName) => ({
    type: 'SET_BLUE_START',
    blueStartPieces,
    opponentName
});

export const setRedStart = (redStartPieces, opponentName) => ({
    type: 'SET_RED_START',
    redStartPieces,
    opponentName
});

export const selectPiece = (square, piece, moves) => ({
    type: 'SET_SELECTED_PIECE',
    square,
    piece,
    moves
});

export const setBoard = (board) => ({
    type: 'SET_BOARD',
    board
});

export const clearRed = () => ({
    type: 'CLEAR_RED'
});

export const clearBlue = () => ({
    type: 'CLEAR_BLUE'
});

export default function (state = initialState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {
    case 'SET_BLUE_START':
      newState.blueStartPieces = action.blueStartPieces;
      if (action.opponentName) newState.opponentName = action.opponentName;
      break;
    case 'SET_RED_START':
      newState.redStartPieces = action.redStartPieces;
      if (action.opponentName) newState.opponentName = action.opponentName;
      break;
    case 'SET_SELECTED_PIECE':
      newState.selectedSquare = action.square;
      newState.selectedPiece = action.piece;
      newState.pieceMoves = action.moves;
      break;
    case 'SET_BOARD':
      newState.board = action.board;
      break;
    case 'CLEAR_RED':
      newState.board = {};
      newState.redStartPieces = [];
      break;
    case 'CLEAR_BLUE':
      newState.board = {};
      newState.blueStartPieces = [];
      break;
    case 'SET_PLAYER':
      newState.playerName = action.playerName;
      newState.playerSide = action.playerSide;
      newState.playerId = action.playerId;
      break;
    case 'SET_PLAYERS':
      newState.players = action.players;
      break;

    default:
      return state;

  }

  return newState;

}