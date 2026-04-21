import { useState } from "react";
import Board from "./components/Board";
import "./styles.css";

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);

  const winner = calculateWinner(squares);

  function handleClick(i) {
    if (squares[i] || winner) return;

    const next = squares.slice();
    next[i] = isX ? "X" : "O";

    setSquares(next);
    setIsX(!isX);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setIsX(true);
  }

  return (
    <div className="app">
      <h1>🎮 TicTac Arena</h1>

      <p className="status">
        {winner
          ? `Winner: ${winner}`
          : `Next Player: ${isX ? "X" : "O"}`}
      </p>

      <Board squares={squares} onClick={handleClick} />

      <button onClick={resetGame}>Restart Game</button>
    </div>
  );
}

function calculateWinner(sq) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let [a,b,c] of lines) {
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
      return sq[a];
    }
  }

  return null;
}
