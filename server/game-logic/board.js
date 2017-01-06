class Piece {
  constructor(type, player) {
    this.player = player;
    this.type = type;
    this.x = null;
    this.y = null;
    this.moves = [];
  }
}

class Square {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.piece = null;
    this.water = false;
    if ((x === 2) || (x === 3) || (x === 6) || (x === 7)) {
      if ((y === 4) || (y === 5)) this.water = true;
    }
  }
  show() {
    return (this.water)
      ? 'W'  // blue image
      : (this.piece)
        ? this.piece.type  //piece image
        : 'L';  //green image
  }
}

function createBoard() {
  let board = [];
  for (let i = 0; i < 10; i++) {
    board.push([]);
    for (let j = 0; j < 10; j++) {
      board[i].push(new Square(j, i));
    }
  }
  return board;
}

function createRedPieces(redOrderedPieces, board) {
  let redStart = [];
  for (let i = 6; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      redStart.push([j, i]);
    }
  }
  let pieces = redOrderedPieces.map((type) => new Piece(type, 'red'));
  pieces.forEach((piece, i) => {
    let [x, y] = redStart[i];
    piece.x = x;
    piece.y = y;
    board.board[y][x].piece = piece;
  });
  return pieces;
}

function createBluePieces(blueOrderedPieces, board) {
  let blueStart = [];
  for (let i = 3; i >= 0; i--) {
    for (let j = 9; j >= 0; j--) {
      blueStart.push([j, i]);
    }
  }
  let pieces = blueOrderedPieces.map((type) => new Piece(type, 'blue'));
  pieces.forEach((piece, i) => {
    let [x, y] = blueStart[i];
    piece.x = x;
    piece.y = y;
    board.board[y][x].piece = piece;
  });
  return pieces;
}

function addMove(pieceMoves, x, y) {

}

function findMoves(square, board, player) {
  if (!square.piece || (square.piece.player !== player)) return [];
  if (square.piece.type === 'B' || square.piece.type === 'F') {
    square.piece.moves = [];
    return [];
  }

  const pieceMoves = [];
  const x = square.x, y = square.y;
  if (board.board[y][x + 1] !== undefined) {
    let blocked = false;
    if (board.board[y][x + 1].piece) {
      if (board.board[y][x + 1].piece.player !== square.piece.player) {
        pieceMoves.push(board.board[y][x + 1]);
      }
      blocked = true;
    }
    else if (!board.board[y][x + 1].water) pieceMoves.push(board.board[y][x + 1]);
    else if (board.board[y][x + 1].water) blocked = true;

    if (square.piece.type === '1' && !blocked) {
      let xs = x + 2;
      while (board.board[y][xs] !== undefined && !blocked) {
        if (board.board[y][xs].piece) {
          if (board.board[y][xs].piece.player !== square.piece.player) {
            pieceMoves.push(board.board[y][xs]);
          }
          blocked = true;
        }
        else if (!board.board[y][xs].water) pieceMoves.push(board.board[y][xs]);
        else if (board.board[y][xs].water) blocked = true;
        xs++;
      }
    }
  }
  if (board.board[y][x - 1] !== undefined) {
    let blocked = false;
    if (board.board[y][x - 1].piece) {
      if (board.board[y][x - 1].piece.player !== square.piece.player) {
        pieceMoves.push(board.board[y][x - 1]);
      }
      blocked = true;
    }
    else if (!board.board[y][x - 1].water) pieceMoves.push(board.board[y][x - 1]);
    else if (board.board[y][x - 1].water) blocked = true;

    if (square.piece.type === '1' && !blocked) {
      let xs = x - 2;
      while (board.board[y][xs] !== undefined && !blocked) {
        if (board.board[y][xs].piece) {
          if (board.board[y][xs].piece.player !== square.piece.player) {
            pieceMoves.push(board.board[y][xs]);
          }
          blocked = true;
        }
        else if (!board.board[y][xs].water) pieceMoves.push(board.board[y][xs]);
        else if (board.board[y][xs].water) blocked = true;
        xs--;
      }
    }
  }
  if (board.board[y + 1] !== undefined) {
    let blocked = false;
    if (board.board[y + 1][x].piece) {
      if (board.board[y + 1][x].piece.player !== square.piece.player) {
        pieceMoves.push(board.board[y + 1][x]);
      }
      blocked = true;
    }
    else if (!board.board[y + 1][x].water) pieceMoves.push(board.board[y + 1][x]);
    else if (board.board[y + 1][x].water) blocked = true;

    if (square.piece.type === '1'  && !blocked) {
      let ys = y + 2;
      while (board.board[ys] !== undefined && !blocked) {
        if (board.board[ys][x].piece) {
          if (board.board[ys][x].piece.player !== square.piece.player) {
            pieceMoves.push(board.board[ys][x]);
          }
          blocked = true;
        }
        else if (!board.board[ys][x].water) pieceMoves.push(board.board[ys][x]);
        else if (board.board[ys][x].water) blocked = true;
        ys++;
      }
    }
  }
  if (board.board[y - 1] !== undefined) {
    let blocked = false;
    if (board.board[y - 1][x].piece) {
      if (board.board[y - 1][x].piece.player !== square.piece.player) {
        pieceMoves.push(board.board[y - 1][x]);
      }
      blocked = true;
    }
    else if (!board.board[y - 1][x].water) pieceMoves.push(board.board[y - 1][x]);
    else if (board.board[y - 1][x].water) blocked = true;

    if (square.piece.type === '1'  && !blocked) {
      let ys = y - 2;
      while (board.board[ys] !== undefined && !blocked) {
        if (board.board[ys][x].piece) {
          if (board.board[ys][x].piece.player !== square.piece.player) {
            pieceMoves.push(board.board[ys][x]);
          }
          blocked = true;
        }
        else if (!board.board[ys][x].water) pieceMoves.push(board.board[ys][x]);
        else if (board.board[ys][x].water) blocked = true;
        ys--;
      }
    }
  }
  square.piece.moves = pieceMoves;
  return pieceMoves;
}

function findAllMoves(board, player) {
  const moves = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      moves.push(...findMoves(board.board[i][j], board, player));
    }
  }
  return moves;
}

function findAndDeletePiece(piece, board) {
  const arrayToSearch = (piece.player === 'red') ? board.redPieces : board.bluePieces;
  for (let i = 0; i < arrayToSearch.length; i++) {
    if (arrayToSearch[i].x === piece.x && arrayToSearch[i].y === piece.y) {
      arrayToSearch.splice(i, 1);
    }
  }
}

const _validPieceCount = {1: 8, 2: 5, 3: 4, 4: 4, 5: 4, 6: 3, 7: 2, 8: 1, 9: 1, B: 6, F: 1, S: 1};

const countArr = [];
for (let k in _validPieceCount) {
  countArr.push(`${_validPieceCount[k]} ${k}(s)`);
}
const validPieceMessage = 'You need ' + countArr.join(', ');

const allPieces = ['1', '1', '1', '1', '1', '1', '1', '1', '2', '2', '2', '2', '2', '3', '3', '3', '3', '4', '4', '4', '4', '5', '5', '5', '5', '6', '6', '6', '7', '7', '8', '9', 'B', 'B', 'B', 'B', 'B', 'B', 'F', 'S'];

const halfBoard = [['L', 'L', 'W', 'W', 'L', 'L', 'W', 'W', 'L', 'L'], ['L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L'], ['L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L'], ['L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L'], ['L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L']];


// redPos/bluePos will be arrays of piece types to placed into the valid starting positions, starting at the upper left corner and wrapping around for red and starting at the lower right corner for blue and wrapping around
class Board {
  constructor(redOrderedPieces, blueOrderedPieces, started, currentPlayer = 'red') {
    this.board = createBoard();
    if (!started) {
      this.redPieces = createRedPieces(redOrderedPieces, this);
      this.bluePieces = createBluePieces(blueOrderedPieces, this);
    }
    // else {
    //   this.redPieces = redOrderedPieces;
    //   this.bluePieces = blueOrderedPieces;
    //   this.placePieces();
    // }

    this.currentPlayer = currentPlayer;
    this.attackingPiece = {};
    this.attackedPiece = {};
    this.attackMessage = '';
    this.currentValidRedMoves = [];
    this.currentValidBlueMoves = [];
    this.winner = null;
    this.findMovesAndCheckWinner();
  }

  toString() {
    let str = '';
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        str += this.board[i][j].show();
      }
      str += '\n';
    }
    return str;
  }

  placePieces() {
    this.redPieces.forEach((piece) => {
      this.board[piece.y][piece.y].piece = piece;
    });
    this.bluePieces.forEach((piece) => {
      this.board[piece.y][piece.y].piece = piece;
    });
  }

  movePiece(square1, square2) {
    const piece1 = square1.piece;
    this.attackingPiece = piece1;
    this.attackedPiece = square2.piece || {};
    square1.piece = null;
    // move piece1 to square2 if it's empty or it beats piece2
    if (!square2.piece || (this.comparePieces(piece1, square2.piece) === 1)) {
      piece1.x = square2.x;
      piece1.y = square2.y;
      square2.piece = piece1;
      this.attackMessage = (this.attackedPiece.type)
        ? `${this.attackingPiece.player}'s ${this.attackingPiece.type} beat ${this.attackedPiece.player}'s ${this.attackedPiece.type}`
        : '';
      if (this.attackedPiece.type) findAndDeletePiece(this.attackedPiece, this);
    }
    // both disappear if tie
    else if (this.comparePieces(piece1, square2.piece) === 0) {
      square2.piece = null;
      this.attackMessage = `${this.attackingPiece.player}'s ${this.attackingPiece.type} tied with ${this.attackedPiece.player}'s ${this.attackedPiece.type}`;
      findAndDeletePiece(this.attackingPiece, this);
      findAndDeletePiece(this.attackedPiece, this);
    }
    //otherwise piece1 dies and disappears
    else {
      this.attackMessage = `${this.attackingPiece.player}'s ${this.attackingPiece.type} lost to ${this.attackedPiece.player}'s ${this.attackedPiece.type}`;
      findAndDeletePiece(this.attackingPiece, this);
    }

    //find valid moves and switch player
    this.findMovesAndCheckWinner();
    this.currentPlayer = (this.currentPlayer === 'red') ? 'blue' : 'red';
  }

  findMovesAndCheckWinner() {
    this.currentValidRedMoves = findAllMoves(this, 'red');
    if (!this.currentValidRedMoves.length) {
      this.winner = 'blue';
      this.attackMessage = 'Red has no valid moves';
    }
    this.currentValidBlueMoves = findAllMoves(this, 'blue');
    if (!this.currentValidBlueMoves.length) {
      this.winner = 'red';
      this.attackMessage = 'Blue has no valid moves';
    }
  }

  comparePieces(piece1, piece2) {
    const type1 = piece1.type, type2 = piece2.type;
    if (type1 === 'S' && type2 === '9') return 1;  //spy beats marshall
    else if (type1 === '2' && type2 === 'B') return 1; // sapper beats bomb
    else if (type2 === 'B') return -1; //all else dies to bomb (and bomb doesn't explode?!?!)
    else if (type2 === 'F') {  //everything beats flag, player1 wins
      this.winner = piece1.player;
      return 1;
    }
    else if (type1 === type2) return 0;  //tie
    else if (type1 === 'S') return -1;  // spy loses
    else if (type2 === 'S') return 1;  // spy loses
    else if (type1 > type2) return 1;  // numbered comparisons
    else if (type1 < type2) return -1;  // numbered comparisons
  }

  // updateBoard(redPieces, bluePieces) {
  //   this.redPieces = redPieces;
  //   this.bluePieces = bluePieces;
  //   this.findMovesAndCheckWinner();
  //   this.currentPlayer = (this.currentPlayer === 'red') ? 'blue' : 'red';
  // }
}



function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


module.exports = {
  Board,
  allPieces,
  shuffle,
  halfBoard,
  validPieceMessage
}
