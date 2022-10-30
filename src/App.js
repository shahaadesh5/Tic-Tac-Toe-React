import "./App.css";
import { useState, useEffect } from "react";

import Square from "./Components/Square";

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("O");
  const [result, setResult] = useState({ winner: "none", state: "none" });

  const patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  useEffect(() => {
    checkWinner();
    checkTie();
    if (player === "X") setPlayer("O");
    else setPlayer("X");
  }, [board]);

  useEffect(() => {
    if (result.state !== "none") setTimeout(() => resetGame(), 2000);
  }, [result]);

  const chooseSquare = (square) => {
    setBoard(
      board.map((val, index) => {
        if (square === index && val === "") return player;
        return val;
      })
    );
  };

  const resetGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("O");
    setResult({ winner: "none", state: "none"});
  };

  const checkWinner = () => {
    patterns.forEach((currentPattern) => {
      const firstPlayer = board[currentPattern[0]];
      if (firstPlayer === "") return;
      let foundWinPattern = true;
      currentPattern.forEach((idx) => {
        if (board[idx] != firstPlayer) foundWinPattern = false;
      });

      if (foundWinPattern) setResult({ winner: player, state: "Won" });
    });
  };

  const checkTie = () => {
    let completed = true;
    board.forEach((item) => {
      if (item === "") completed = false;
    });
    if (completed) setResult({ winner: "No one", state: "tie" });
  };

  return (
    <>
      {result.state !== "none" ? `Winner is ${result.winner}` : ""}
      <div className="App">
        <div className="board">
          <div className="row">
            <Square value={board[0]} chooseSquare={() => chooseSquare(0)} />
            <Square value={board[1]} chooseSquare={() => chooseSquare(1)} />
            <Square value={board[2]} chooseSquare={() => chooseSquare(2)} />
          </div>
          <div className="row">
            <Square value={board[3]} chooseSquare={() => chooseSquare(3)} />
            <Square value={board[4]} chooseSquare={() => chooseSquare(4)} />
            <Square value={board[5]} chooseSquare={() => chooseSquare(5)} />
          </div>
          <div className="row">
            <Square value={board[6]} chooseSquare={() => chooseSquare(6)} />
            <Square value={board[7]} chooseSquare={() => chooseSquare(7)} />
            <Square value={board[8]} chooseSquare={() => chooseSquare(8)} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
