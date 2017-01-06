import React from 'react'
import store from './store';
import {setBoard, selectPiece} from './reducer';

export default class Square extends React.Component {
	constructor(props) {
		super(props);

		this.state = Object.assign({
			//color: color,
			// content: this.props.content,
			player: this.props.player,
			square: this.props.square,
			selectPieceInSquare: this.props.selectPieceInSquare,
			movePieceInSquare: this.props.movePieceInSquare
		}, store.getState());

		//this.state.player = this.state.board.currentPlayer;

		this.state.color = this.chooseColor(this.state);
		this.state.canMove = (this.state.color === 'lightgreen');
		this.handleClick = this.handleClick.bind(this);
	}

	chooseColor(state) {
		const color = (state.square.water)
			? 'blue'
			: ((state.selectedPiece.x === state.square.x) && (state.selectedPiece.y === state.square.y))
				? 'chartreuse'	//selected
				: (state.pieceMoves.some((square) => ((state.square.x === square.x) && (state.square.y === square.y))))
					? 'lightgreen'	//available moves
					: 'limegreen';  //empty land and unselected pieces
		return color;
	}

	componentDidMount() {
		this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
			const color = this.chooseColor(Object.assign(this.state, store.getState()));
			this.setState({color: color, canMove: (color === 'lightgreen')});
    });
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	handleClick(e) {
		const callback = (response) => console.log(response);
		if (this.state.square.piece) { // the square you're clicking has a piece
			// if it is selected, unselect it
			if ((this.state.selectedPiece.x === this.state.square.x) && (this.state.selectedPiece.y === this.state.square.y)) {
				this.state.selectPieceInSquare({}, {}, []);
			}
			// if you're attacking a piece
			else if (this.state.canMove) {
			console.log('before emit', this.state.selectedSquare, this.state.square);
			socket.emit('clientMove', this.state.selectedSquare.x, this.state.selectedSquare.y, this.state.square.x, this.state.square.y, callback);
			console.log('after');
			this.state.board.movePiece(this.state.selectedSquare, this.state.square);
			store.dispatch(setBoard(this.state.board));
			//socket.emit('clientBoardChange', this.state.board);
			this.state.selectPieceInSquare({}, {}, []);
			}
			else {
				// otherwise if clicking a new piece, select that one
				if (this.state.square.piece.player === this.state.player && this.state.square.piece.player === this.state.board.currentPlayer) {
					this.state.selectPieceInSquare(this.state.square, this.state.square.piece, this.state.square.piece.moves);
				}
			}
		}
		// if you're clicking on an empty square
		else if (this.state.canMove) {
			console.log('before emit');
			socket.emit('clientMove', this.state.selectedSquare.x, this.state.selectedSquare.y, this.state.square.x, this.state.square.y, callback);
			console.log('after');
			this.state.board.movePiece(this.state.selectedSquare, this.state.square);
			store.dispatch(setBoard(this.state.board));
			//socket.emit('clientBoardChange', this.state.board);
			this.state.selectPieceInSquare({}, {}, []);
		}
	}

	render () {
		let content = this.state.square.show();
		if (content === 'B' || content === 'F') content = `[ ${content} ]`
		let textColor;
		if (this.state.square.piece) {
			if (this.state.square.piece.player === this.state.player) textColor = 'white';
			else textColor = (this.state.player === 'red') ? 'darkblue' : 'darkred';
		}

		return (
			<td
				style={{backgroundColor:this.state.color, color: textColor}}
				onClick={this.handleClick}>
        {(this.state.square.piece)
				? <span className='piece' style={{backgroundColor:'dark' + this.state.square.piece.player}}>
						<strong >
							{(this.state.square.piece.player === this.state.player) ? content : null}
						</strong>
					</span>
				: null}
			</td>
			)
	}

}