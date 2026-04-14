import React from "react";
import Square from "./Square";
import "./Board.css";

export function Board({ squares, winningLine, onSquareClick }) {
  const renderSquare = (i) => {
    const isWinning = winningLine && winningLine.includes(i);
    return (
      <Square
        key={i}
        value={squares[i]}
        isWinning={isWinning}
        onClick={() => onSquareClick(i)}
      />
    );
  };
  const rows = [0, 1, 2].map((row) => (
    <div key={row} className="board-row">
      {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
    </div>
  ));
  return <div>{rows}</div>;
}

export default Board;
