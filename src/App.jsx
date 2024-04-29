import { useState } from "react";
import './components/player.jsx'
import Player from './components/player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from "./components/log.jsx";
import { WINNING_COMBINATIONS } from "./components/winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];



function deriveActivePlayer(gameTurns){
  let currentPlayer = 'x'
  if (gameTurns.length >0 && gameTurns[0].player==='x') {
    currentPlayer ='o'
  } 
  return currentPlayer
}
function App() {
  const [players, setPlayers] = useState({
x : 'Player 1',
o: 'Player 2'

  })
  const [gameTurns , setGameTurns] = useState([])
  // const [activePlayer, setActivePlayer] = useState('x');
   
  const activePlayer = deriveActivePlayer(gameTurns)

  let  gameBoard = [...initialGameBoard.map(array=>[...array])]

for(const turn of gameTurns){
const { square , player } = turn;
const {row , col} = square;
gameBoard[row][col] = player;
} 
let winner;
for(const combination of WINNING_COMBINATIONS){
  const firstSquareSymbol  = gameBoard[combination[0].row][ combination[0].column ];
  const secondSquareSymbol= gameBoard[combination[1].row][ combination[1].column ];
  const thirdSquareSymbol= gameBoard[combination[2].row][ combination[2].column ];

if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol)
{
  winner = players[firstSquareSymbol]}
}

const hasDraw = gameTurns.length ===9 && !winner
  function handleSelectSquare(rowIndex,colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'x' ? 'o' : 'x');
    setGameTurns(( prevTurns) =>{

const currentPlayer = deriveActivePlayer(prevTurns)

      const updateTurns = [ { square : { row: rowIndex, col: colIndex } , player:currentPlayer }  ,...prevTurns]

      return updateTurns;
    } )
  }

  function handleRestart(){
    setGameTurns([])
  }
 
function handlePlayerNameChange(symbol , newName){
setPlayers(prevPlayers =>{
  return{
    ...prevPlayers,
    [symbol]: newName
  }
})
}

  return (
    <header>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player-1" symbol="x" isActive={activePlayer === 'x'} onChangeName={handlePlayerNameChange}/>
          <Player initialName="Player-2" symbol="o" isActive={activePlayer === 'o'} onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner = {winner} onRestart={handleRestart} /> }
        <GameBoard onSelectSquare={handleSelectSquare} 
        board = {gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </header>
  );
}

export default App;
