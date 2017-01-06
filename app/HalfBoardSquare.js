import React from 'react';
import store from './store';
import {setBoard, selectPiece} from './reducer';

export default class HalfBoardSquare extends React.Component {
	constructor(props) {
		super(props);
    //this.state = Object.assign({enterPieceInHalfBoardSquare: this.props.enterPieceInHalfBoardSquare}, store.getState());
    this.handleChange = this.handleChange.bind(this);
	}

  handleChange(e) {
    this.props.enterPieceInHalfBoardSquare(this.props.index, e.target.value);
  }

  // componentDidMount() {
	// 	this.unsubscribe = store.subscribe(() => {
  //     this.setState(store.getState());
  //   });
	// }


	render () {
		const type = this.props.type;
    const color = (type === 'W') ? 'blue' : 'limegreen';
		//console.log(this.state);

		return (
      <td style={{backgroundColor:color}}>
        {(this.props.index >= 0)
          ?
              <select name="piece" defaultValue="?" onChange={this.handleChange}>
                <option value="?" hidden disabled>?</option>
                <option value="B">B</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="S">S</option>
                <option value="F">F</option>
              </select>

          : null}
			</td>
			)
	}

}