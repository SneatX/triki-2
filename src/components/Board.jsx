import Square from "./Square";
import "./Board.css";

export function Board({ squares, winningLine, onSquareClick }) {
  return (
    <div className="board">
      {squares.map((value, i) => (
        <Square
          key={i}
          value={value}
          isWinning={winningLine && winningLine.includes(i)}
          onClick={() => onSquareClick(i)}
        />
      ))}
    </div>
  );
}

export default Board;
