import React from 'react';
import {Link, hashHistory} from 'react-router';
import store from './store';
import {setRedStart, setBlueStart, setPlayer, clearRed, clearBlue, savePieces} from './reducer';

export default class App extends React.Component {
	constructor(props) {
		super(props);
    this.state = Object.assign({}, store.getState());
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSave = this.handleSave.bind(this);
	}

  componentDidMount() {
		this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

  handleClear() {
    if (this.state.playerSide === 'red') store.dispatch(clearRed());
    else store.dispatch(clearBlue());
  }

  handleRedClick() {
    hashHistory.push(`/redplay`);
  }

  handleBlueClick() {
    hashHistory.push(`/blueplay`);
  }

  handleCheck() {
    if (this.state.playerSide === 'red') socket.emit('needBlue');
    else socket.emit('needRed');
  }

  handleSave() {
    if (this.state.playerSide === 'red') {
      if (this.state.redStartPieces.length) {
        let redStart = [];
        let index = 0;
        for (let i = 6; i < 10; i++) {
          for (let j = 0; j < 10; j++) {
            redStart.push(
              {
                type: this.state.redStartPieces[index],
                x: j,
                y: i,
                color: 'red',
                playerId: this.state.playerId
              });
          }
        }
        store.dispatch(savePieces(redStart));
      }
    }
    else {
      if (this.state.blueStartPieces.length) {
        let blueStart = [];
        for (let i = 3; i >= 0; i--) {
          for (let j = 9; j >= 0; j--) {
            blueStart.push(
              {
                type: this.state.blueStartPieces[index],
                x: j,
                y: i,
                color: 'blue',
                playerId: this.state.playerId
              });
          }
        }
        store.dispatch(savePieces(this.state.blueStartPieces));
      }
    }
  }


	render () {

		return (
      <div>
        {(!this.state.playerName)
        ? <Link to={`/`}>Pick Name and Side First</Link>
        :
        <div>
          <button style={{float: 'right'}} onClick={this.handleClear}>Clear Board</button>
          <button style={{float: 'right'}} onClick={this.handleSave}>Save Pieces</button>
          <Link to={`/${this.state.playerSide}setup`}>{`Choose ${this.state.playerSide} start positions`}</Link>
          {(this.state.playerSide === 'red')
            ? (!this.state.blueStartPieces.length)
                ? <div>
                    <h5>Waiting for blue...</h5>
                    <button onClick={this.handleCheck}>Check for Opponent</button>
                  </div>
                : (!this.state.redStartPieces.length)
                ? null
                : <button style={{color: 'darkred', display: 'block',
      margin: 'auto'}} onClick={this.handleRedClick}><b>Play as Red</b></button>
            : (!this.state.redStartPieces.length)
                ? <div>
                    <h5>Waiting for red...</h5>
                    <button onClick={this.handleCheck}>Check for Opponent</button>
                  </div>
                : (!this.state.blueStartPieces.length)
                ? null
                : <button style={{color: 'darkblue', display: 'block',
      margin: 'auto'}} onClick={this.handleBlueClick}><b>Play as Blue</b></button>
          }
        </div>
        }
      </div>
		)
	}

}