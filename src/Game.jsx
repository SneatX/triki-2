import { useState } from "react";
import { Board } from "./components/Board";
import "./Game.css";

/**
 * Funcion auxiliar para verificar si hay un ganador en el tablero
 * @param {Array} squares - El estado actual del tablero
 * @returns {object} - Un objeto con el ganador (X o O)
*/

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], line: [a, b, c] };
        }
    }
    return {};
}

export function Game() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [gameMode, setGameMode] = useState("pvp");
    const [stepNumber, setStepNumber] = useState(0);

    const { winner, line } = calculateWinner(squares)
    const isDraw = !winner && squares.every(square => square !== null);

    /**
     * Maneja el click en una celda
     * @param {number} i - El índice de la celda clickeada
     */
    function handleClick(i) {
        if (winner || squares[i]) return;

        const newSquares = squares.slice();
        newSquares[i] = xIsNext ? "X" : "O";

        setSquares(newSquares);
        setXIsNext(!xIsNext);
        setHistory([...history.slice(0, stepNumber + 1), newSquares]);
        setStepNumber(stepNumber + 1);

        // modo contra computadora

        if (gameMode === "computer" && !calculateWinner(newSquares).winner && newSquares.some(s => s === null)) {
            setTimeout(() => { makeComputerMove(newSquares) }, 500);
        }
    }

    function makeComputerMove(currentSquares) {
        const emptySquares = currentSquares
            .map((sq, idx) => sq === null ? idx : null)
            .filter(idx => idx !== null);

        if (emptySquares.length === 0) return;

        const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        const newSquares = currentSquares.slice();
        newSquares[randomIndex] = "O";

        setSquares(newSquares);
        setXIsNext(true);
        setHistory([...history.slice(0, stepNumber + 1), newSquares]);
        setStepNumber(stepNumber + 1);
    }

    /**
     * Reinicia el juego
     */

    function resetGame() {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
        setHistory([Array(9).fill(null)]);
        setStepNumber(0);
    }

    /**
     * Navega a una jugada especifica del historial
     * @param {number} step - El número de la jugada a la que se quiere navegar
     */
    function jumpTo(step) {
        setSquares(history[step]);
        setStepNumber(step);
        setXIsNext((step % 2) === 0);
    }

    function getStatus() {
        if (winner) return `Ganador: ${winner}`;
        if (isDraw) return "Empate";
        return `Turno de: ${xIsNext ? "X" : "O"}`;
    }

    return (
        <div className="game">
            <h1 className="game-title">Triki</h1>
            <div className="game-mode">
                <button
                    className={`mode-btn ${gameMode === "pvp" ? "active" : ""}`}
                    onClick={() => { setGameMode("pvp"); resetGame(); }}
                >
                    2 jugadores
                </button>
                <button
                    className={`mode-btn ${gameMode === "computer" ? "active" : ""}`}
                    onClick={() => { setGameMode("computer"); resetGame(); }}
                >
                    vs Computadora
                </button>
            </div>

            <div className="game-info">
                <div className={`status ${winner ? "winner" : ""}`}>
                    {getStatus()}
                </div>
            </div>
            <Board
                squares={squares}
                onSquareClick={handleClick}
                winningLine={line}
            />

            <button className="reset-btn" onClick={resetGame}>
                Reiniciar Juego
            </button>

            {
                history.length > 1 && (
                    <div className="history">
                        <h3>Historial de Jugadas</h3>
                        <div className="history-list">
                            {history.map((_, step) => (
                                <button
                                    key={step}
                                    className={`history-btn ${step === stepNumber ? "current" : ""}`}
                                    onClick={() => jumpTo(step)}
                                >
                                    {step === 0 ? "Inicio" : `Movimiento ${step}`}
                                </button>
                            ))}
                        </div>
                    </div>
                )
            }
        </div>
    );
}