import React, { useState } from "react";

// PUBLIC_INTERFACE
function TicTacToeDuo() {
  /**
   * Main stateful container and UI for the TicTacToe Duo game.
   * - Handles the board, turn, winner/draw, UI, and restart functionality.
   * - Two players take turns on the same device.
   * - Win/draw detection is automatic.
   * - Board is clickable; status and reset are shown as described.
   */

  // 3x3 board as a flat array, values: 'X', 'O', null
  const [board, setBoard] = useState(Array(9).fill(null));
  // true: X's turn, false: O's turn
  const [xIsNext, setXIsNext] = useState(true);
  // Winner: 'X' | 'O' | null
  const [winner, setWinner] = useState(null);
  // Boolean for draw state
  const [isDraw, setIsDraw] = useState(false);
  // Cells that are part of the winning line (indices), to highlight
  const [winningLine, setWinningLine] = useState([]);

  // Win detection logic: returns {winner, line: [indices]} or null
  function calculateWinner(squares) {
    // All possible winning lines in 3x3 tic tac toe
    const lines = [
      [0, 1, 2], // rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // columns
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // diagonals
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }
    return null;
  }

  // Handle click on cell
  function handleClick(idx) {
    if (board[idx] || winner) return; // Do nothing if cell filled or game over
    const newBoard = board.slice();
    newBoard[idx] = xIsNext ? "X" : "O";
    const winResult = calculateWinner(newBoard);

    if (winResult) {
      setWinner(winResult.winner);
      setWinningLine(winResult.line);
      setIsDraw(false);
    } else if (newBoard.every((cell) => cell)) {
      setIsDraw(true);
      setWinner(null);
      setWinningLine([]);
    } else {
      setIsDraw(false);
      setWinner(null);
      setWinningLine([]);
    }

    setBoard(newBoard);
    setXIsNext((prev) => !prev);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    /**
     * Resets the game back to initial state.
     */
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setIsDraw(false);
    setWinningLine([]);
  }

  function renderStatus() {
    if (winner) {
      return (
        <span style={{ color: "#4caf50", fontWeight: 600 }}>
          Player {winner} wins!
        </span>
      );
    }
    if (isDraw) {
      return (
        <span style={{ color: "#222222", fontWeight: 500 }}>
          It's a draw!
        </span>
      );
    }
    return (
      <span>
        Next turn: <span style={{ color: "#4caf50", fontWeight: 500 }}>Player {xIsNext ? "X" : "O"}</span>
      </span>
    );
  }

  // --- Styling constants (inline since no CSS module/scoped CSS available) ---
  const palette = {
    primary: "#ffffff",
    secondary: "#222222",
    accent: "#4caf50",
    boardBG: "#ffffff",
    cellBorder: "#222222",
    winBG: "#c8ffd9"
  };

  const boardSize = 288; // px (3x3 grid, each cell 96px)
  const cellSize = 96; // px

  return (
    <div
      style={{
        minHeight: "100vh",
        background: palette.primary,
        color: palette.secondary,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif"
      }}
      data-testid="tttduo"
    >
      <div style={{ marginBottom: 28, fontSize: "1.3rem", letterSpacing: "0.01em", minHeight: 30 }}>
        {renderStatus()}
      </div>

      {/* Game board */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          border: `3px solid ${palette.accent}`,
          borderRadius: 16,
          background: palette.boardBG,
          boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
          width: boardSize,
          height: boardSize,
          marginBottom: 20,
        }}
      >
        {board.map((cell, idx) => {
          const isWin = winningLine.includes(idx);
          return (
            <button
              key={idx}
              data-testid={`cell-${idx}`}
              onClick={() => handleClick(idx)}
              disabled={cell || winner || isDraw}
              style={{
                width: cellSize,
                height: cellSize,
                border: `1.5px solid ${palette.cellBorder}`,
                outline: isWin
                  ? `3px solid ${palette.accent}`
                  : "none",
                background: isWin
                  ? palette.winBG
                  : palette.boardBG,
                color: cell === "X" ? "#4caf50" : "#222222",
                fontWeight: "bold",
                fontSize: "2.4rem",
                cursor:
                  !cell && !winner && !isDraw
                    ? "pointer"
                    : "not-allowed",
                transition: "background 0.2s, outline 0.2s",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                userSelect: "none",
                touchAction: "manipulation"
              }}
              aria-label={`Tic Tac Toe cell ${idx + 1}`}
            >
              {cell}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleRestart}
        className="btn btn-large"
        style={{
          backgroundColor: palette.accent,
          color: "#fff",
          border: "none",
          padding: "12px 32px",
          fontSize: "1.08rem",
          fontWeight: 600,
          borderRadius: 8,
          boxShadow: "0 1px 2px rgba(34,34,34,0.09)",
          cursor: "pointer",
          marginTop: 6,
          transition: "background 0.2s",
          letterSpacing: "0.03em",
        }}
        data-testid="restart"
      >
        Restart
      </button>

      <div style={{ marginTop: 24, fontSize: "0.98rem", color: "#808080" }}>
        TicTacToe Duo &mdash; Two player mode | Light Theme | Powered by KAVIA
      </div>
    </div>
  );
}

export default TicTacToeDuo;
