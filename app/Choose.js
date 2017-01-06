import React from 'react';
import {Link, hashHistory} from 'react-router';
import store from './store';
import {createPlayer, setPlayer, setRedStart, setBlueStart} from './reducer';


export default class Choose extends React.Component {
	constructor(props) {
		super(props);
    this.state = Object.assign({nameInput: '', sideInput: 'red', returningPlayer: ''}, store.getState());

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSideChange = this.handleSideChange.bind(this);
    this.handleNewSubmit = this.handleNewSubmit.bind(this);
    this.handlePlayerChange = this.handlePlayerChange.bind(this);
    this.handleOldSubmit = this.handleOldSubmit.bind(this);
	}

  componentDidMount() {
		this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
    socket.on('startPos', (red, blue) => {
      store.dispatch(setRedStart(red));
      store.dispatch(setBlueStart(blue));
    });
    socket.on('serverRed', (red, name) => {
      store.dispatch(setRedStart(red, name));
    });
    socket.on('serverBlue', (blue, name) => {
      store.dispatch(setBlueStart(blue, name));
    });
	}
	componentWillUnmount() {
		this.unsubscribe();
	}


  handleInputChange(e) {
    this.setState({nameInput: e.target.value});
  }

  handleSideChange(e) {
    this.setState({sideInput: e.target.value});
  }

  handleNewSubmit(e) {
    e.preventDefault();
    store.dispatch(createPlayer(this.state.nameInput, this.state.sideInput));
    hashHistory.push(`/waiting`);
  }

  handlePlayerChange(e) {
    console.log(e.target.value);
    this.setState({returningPlayer: e.target.value});
  }

  handleOldSubmit(e) {
    e.preventDefault();
    const playerInfo = this.state.returningPlayer.split(':');
    store.dispatch(setPlayer(playerInfo[0], playerInfo[1]));
    hashHistory.push(`/waiting`);
  }


	render () {

		return (
      <div>
        <h3>Returning Player</h3>
        <form onSubmit={this.handleOldSubmit}>
          <select
                name="player"
                onChange={this.handlePlayerChange}>
                {
                  this.state.players && this.state.players.map((thing, i) => (
                    <option key={i} value={`${thing.player.name}:${thing.player.color}`}>{`${thing.player.name}, ${thing.player.color}`}</option>
                  ))
                }
              </select>
          <button type='submit'>This is me!</button>
        </form>
        <h3>New Player</h3>
        <form onSubmit={this.handleNewSubmit}>
          <input type='text' onChange={this.handleInputChange}/>
          <select onChange={this.handleSideChange}>
          <option value='red'>red</option>
          <option value='blue'>blue</option>
          </select>
          <button type='submit'>Choose Name and Side</button>
        </form>
      </div>
		)
	}

}