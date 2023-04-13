import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(index) {
    const newBoard = [...board];
    if (newBoard[index] || calculateWinner(newBoard)) {
      return;
    }
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  }

  function calculateWinner(board) {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  function renderSquare(index) {
    const winner = calculateWinner(board);
    const isFilled = board[index] !== null;
    let buttonColor = "outline-dark";
    if (winner) {
      buttonColor = winner === board[index] ? "success" : buttonColor;
    }
  
    const buttonStyle = {
      width: "35px",
      height: "35px",
      margin:"15px"
    };
  
    return (
      <Button variant={buttonColor} onClick={() => handleClick(index)} disabled={isFilled} style={buttonStyle}>
        {board[index]}
      </Button>
    );
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  function renderResetButton() {
    const winner = calculateWinner(board);
    const isTie = !winner && board.filter(b => b === null).length === 0;
    if (winner || isTie) {
      return (
        <Row>
          <Col>
            <Button variant="primary" onClick={resetGame}>Restart game</Button>
          </Col>
        </Row>
      );
    }
  }

  const winner = calculateWinner(board);
  const isTie = !winner && board.filter(b => b === null).length === 0;
  const status = winner
    ? `Winner: ${winner}`
    : isTie
    ? "Tie game"
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <Container>
      <Row>
        <Col>
          <h1>Tic Tac Toe</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>{status}</p>
        </Col>
      </Row>
      <Row>
        <Col>{renderSquare(0)}</Col>
        <Col>{renderSquare(1)}</Col>
        <Col>{renderSquare(2)}</Col>
      </Row>
      <Row>
        <Col>{renderSquare(3)}</Col>
        <Col>{renderSquare(4)}</Col>
        <Col>{renderSquare(5)}</Col>
      </Row>
      <Row>
        <Col>{renderSquare(6)}</Col>
        <Col>{renderSquare(7)}</Col>
        <Col>{renderSquare(8)}</Col>
      </Row>
      <Row>
    <Col>
    {renderResetButton()}
    <h5 style={{margin: "10px"}}>TIC TAC TOE created in react by CoDaze GitHub: <a href='#'>asdasdasd</a></h5>
    </Col>
  </Row>
    </Container>
  );
}

function App() {
  return (
    <div className="App">
      <TicTacToe />
    </div>
  );
}

export default App;