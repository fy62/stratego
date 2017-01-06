import React, {Component} from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import {Board} from '../server/game-logic/board';
import Square from './Square';
import store from './store';
import {setBoard, selectPiece} from './reducer';


export default class Play extends React.Component {
	constructor(props) {
		super(props);
		const initialStore = store.getState();

		const player = (this.props.route.path === '/redplay') ? 'red' : 'blue';
		if (!initialStore.board.board) {
			const board = ((initialStore.redStartPieces.length === 40) && (initialStore.blueStartPieces.length === 40)) ? new Board(initialStore.redStartPieces, initialStore.blueStartPieces, false) : {};
			store.dispatch(setBoard(board));
		}
		this.state = Object.assign({player: player}, store.getState());

		this.selectPieceInSquare = this.selectPieceInSquare.bind(this);
		this.movePieceInSquare = this.movePieceInSquare.bind(this);
	}

// const mapStateToProps = (state) => {
// 	return state;
// }
// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		handleClick: selectPiece
// 	}
// }
	selectPieceInSquare(square, piece, moves) {
		store.dispatch(selectPiece(square, piece, moves));
	}

	movePieceInSquare(square1, square2) {
		this.state.board.movePiece(square1, square2);
		store.dispatch(setBoard(this.state.board));
	}

	componentDidMount() {
		this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });

		socket.on('serverBoardChange', (board) => {
			console.log('nailed it', board);
			store.dispatch(setBoard(board));
			this.setState(store.getState());
		});
		socket.on('serverMove', (s1y, s1x, s2y, s2x) => {
			console.log('nailed it', s1y, s1x, s2y, s2x);

			this.movePieceInSquare(this.state.board.board[s1y][s1x], this.state.board.board[s2y][s2x]);
			store.dispatch(setBoard(this.state.board));
			this.setState(store.getState());
		});
		// socket.on('serverBoardChange', (board) => {
		// 	console.log('whyyyy', board);

		// 	this.state.board = board;
		// 	store.dispatch(setBoard(this.state.board));
		// 	//this.setState(store.getState());
		// });
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	handleClick() {

	}

	render() {
		if (this.state.board.attackMessage) {
			const len = this.state.board.attackMessage.length;
			if (this.state.board.attackMessage.charAt(len - 1) === 'F') {
				let loser = (this.state.board.winner === 'red') ? 'blue' : 'red';
				this.state.board.attackMessage = this.state.board.winner + ' captured the ' + loser + ' flag';
			}
		}
		return (this.state.board.winner)
		?
			<div>
			<h1>You {(this.state.board.winner === this.state.player) ? 'Win!!!!!!' : 'Lose...'}</h1>
			<h4>{this.state.board.attackMessage}</h4>
			<br/>
			<Link to={`/`}>Go Home to Play Again</Link>
			</div>

		: (this.state.board.board)
			? (
			<div>
				<Link to={`/waiting`}>Waiting Room</Link>
				<button style={{float: 'right'}} onClick={this.handleClick}>Save Current Game</button>
				<h3>Current Player: {this.state.board.currentPlayer}</h3>
				<table id="board">
					<tbody>
					{
						this.state.board.board.map( (row,i) => (
						<tr key={i}>
							{
								row.map( (square, j) => (
									<Square
										key={`${i}+${j}`}
										square={square}
										selectPieceInSquare={this.selectPieceInSquare}
										movePieceInSquare={this.movePieceInSquare}
										player={this.state.player}/>
								))
							}
						</tr>
						))
					}
					</tbody>
				</table>
				{
					(this.state.board.attackMessage)
					? <h3 className='centeredText'>{this.state.board.attackMessage}</h3>
					: null
				}
			</div>
		)
		: <Link to={`/`}>Go Home to Choose Name and Side</Link>;
	}
}