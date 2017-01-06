import React, {Component} from 'react';
import {hashHistory, Link} from 'react-router';
import { connect } from 'react-redux';
import {Board, halfBoard, allPieces, validPieceMessage, shuffle} from '../server/game-logic/board';
import HalfBoardSquare from './HalfBoardSquare';
import Info from './Info';
import store from './store';
import {setRedStart, setBlueStart} from './reducer';


export default class Setup extends React.Component {
	constructor(props) {
		super(props);
		const player = (this.props.route.path === '/redsetup') ? 'red' : 'blue';
		this.state = Object.assign({possibleStart:[], errorMessage: '', errorDetail: '', player: player}, store.getState());
		this.enterPieceInHalfBoardSquare = this.enterPieceInHalfBoardSquare.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleRandom = this.handleRandom.bind(this);
	}

	enterPieceInHalfBoardSquare(index, value) {
		const newPossibleStart = [...this.state.possibleStart];
		newPossibleStart[Number(index)] = value;
		this.setState({ possibleStart: newPossibleStart });
	}

	handleSubmit(e) {
		e.preventDefault();
		let valid = true;
		const sorted = this.state.possibleStart.sort();

		if (sorted.length !== 40) {
			valid = false;
			this.setState({ errorMessage: 'please fill in all 40 fields' });
		}
		else {
			const pieceCount = {};
			for (let i = 0; i < sorted.length; i++) {
				if (pieceCount[sorted[i]] === undefined) pieceCount[sorted[i]] = 0;
				pieceCount[sorted[i]]++;

				if (sorted[i] !== allPieces[i]) {
					valid = false;
					this.setState({ errorMessage: 'incorrect input for starting pieces' });
				}
			}
			if (!valid) {
				const countArr = [];
				for (let k in pieceCount) {
					if (k === '') countArr.push(`${pieceCount[k]} empty`);
					else countArr.push(`${pieceCount[k]} ${k}(s)`);
				}
				const errorDetail = 'You have ' + countArr.join(', ');
				this.setState({ errorDetail: errorDetail });
			}
		}
		if (valid) {
			if (this.state.player === 'red') {
				this.setState({ errorMessage: '', errorDetail: '' });
				store.dispatch(setRedStart(this.state.possibleStart));
				socket.emit('redComplete', this.state.possibleStart, this.state.playerName);
				hashHistory.push(`/waiting`);  //goto app
			}
			else {
				this.setState({ errorMessage: '', errorDetail: '' });
				store.dispatch(setBlueStart(this.state.possibleStart));
				socket.emit('blueComplete', this.state.possibleStart, this.state.playerName);
				hashHistory.push(`/waiting`);  //goto app
			}
		}
	}

  componentDidMount() {
		this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
	}
	componentWillUnmount() {
		this.unsubscribe();
	}

	handleRandom() {
		const rand = shuffle(allPieces);
		if (this.state.player === 'red') {
			store.dispatch(setRedStart(rand));
			socket.emit('redComplete', rand, this.state.playerName);
			hashHistory.push(`/waiting`);  //goto app
			}
		else {
			store.dispatch(setBlueStart(rand));
			socket.emit('blueComplete', rand, this.state.playerName);
			hashHistory.push(`/waiting`);  //goto app
		}
	}



	render() {
		return (
			<div>
			<Link to={`/waiting`}>Waiting Room</Link>
			<form onSubmit={this.handleSubmit}>
				<table id="board">
					<tbody>
					{
						halfBoard.map( (row,i) => (
						<tr key={i}>
							{
								row.map( (type, j) => (
									<HalfBoardSquare
                  key={`${i}+${j}`}
                  type={type}
                  index={i * 10 + j - 10}
									enterPieceInHalfBoardSquare={this.enterPieceInHalfBoardSquare}/>
								))
							}
						</tr>
						))
					}
					</tbody>
				</table>
				<button type='submit' style={{float:'right'}}>
          Set Initial Positions
        </button>
				{ (this.state.errorMessage) && <div className="warning"><h3 style={{color: 'darkred'}}>{this.state.errorMessage}</h3></div> }
				{ (this.state.errorDetail) && <div className="warning"style={{color: 'darkred'}}>{this.state.errorDetail}</div> }
				{ (this.state.errorDetail) && <div className="warning"style={{color: 'darkred'}}>{validPieceMessage}</div> }
        </form>
				<div>
				<button onClick={this.handleRandom}>
          Play with Random Start Positions
        </button>
				</div>
				<br/>
				<br/>
				<br/>
				<Info/>
			</div>
		);
	}
}