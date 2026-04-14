function Square({ value, isWinning, onClick }) {
  return (
    <button
      className={`square ${value?.toLowerCase()} ${isWinning ? "winning" : ""}`}
      onClick={onClick}
      aria-label={value ? `Celda con ${value}` : "Celda vacía"}
    >
      {value}
    </button>
  );
}

export default Square;
