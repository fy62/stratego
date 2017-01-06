import React from 'react';

export default () => {
  return (
    <table id='info' style={{align:'center'}}>
        <tbody>
          <tr><th>Rank</th><th>Number Per Player</th><th>Special Properties</th></tr>
          <tr><td>B</td><td>6</td><td>bomb - immovable, stays on the board until disarmed</td></tr>
          <tr><td>9</td><td>1</td><td></td></tr>
          <tr><td>8</td><td>1</td><td></td></tr>
          <tr><td>7</td><td>2</td><td></td></tr>
          <tr><td>6</td><td>3</td><td></td></tr>
          <tr><td>5</td><td>4</td><td></td></tr>
          <tr><td>4</td><td>4</td><td></td></tr>
          <tr><td>3</td><td>4</td><td></td></tr>
          <tr><td>2</td><td>5</td><td>sapper - can disarm bombs</td></tr>
          <tr><td>1</td><td>8</td><td>scout - moves like a rook</td></tr>
          <tr><td>S</td><td>1</td><td>spy - can kill 9 if it attacks, loses all fights if attacked</td></tr>
          <tr><td>F</td><td>1</td><td>flag - immovable, you lose if it's captured</td></tr>
        </tbody>
      </table>
  );
}