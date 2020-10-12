import React, {Component} from "react";
import Square from "./Square";

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        }
    }

    // обработчик нажатия на кнопку
    handleClick(i) {
        // debugger;
        const squaresCopy = this.state.squares.slice(); // создать копию массива из состояния squares

        // отмена повторного нажатия на элемент, и отмена при ничье и победе
        if (!squaresCopy[i] && !calculateWinner(squaresCopy)) {
            this.state.xIsNext ? squaresCopy[i] = 'X' : squaresCopy[i] = '0';

            let randomIndex;
            do {
                if(!squaresCopy.includes(null)) break;
                randomIndex = Math.floor(Math.random() * 9); // получаем случ. целое число от 0 до 8 вкл.
            } while (squaresCopy[randomIndex] !== null);
            squaresCopy[randomIndex] = '0';

            this.setState({
                xIsNext: true, // меняем каждый ход значение на противоположное
                squares: squaresCopy
            });
        }
    }

    // метод генерацией square
    renderSquare(i) {
        return <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />
    }

    render() {
        let winner = calculateWinner(this.state.squares);
        let status = null;
        if (winner && winner !== 'draw') {
            status = `Победил: ${winner}`;
        } else if (winner === 'draw') {
            status = 'НИЧЬЯ!';
        } else {
            status = `Сейчас ходит: ${this.state.xIsNext ? 'X' : '0'}`
        }

        return (
            <div>
                <div className={"status"}>
                    <h4>{status}</h4>
                </div>
                <div className={"board-row"}>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className={"board-row"}>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className={"board-row"}>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}

function calculateWinner(squaresCalc) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        // console.log([a,b,c]);
        if (squaresCalc[a] && squaresCalc[a] === squaresCalc[b] && squaresCalc[a] === squaresCalc[c]) {
            return squaresCalc[a]; // возвращается крестик/нолик
        } else if (!squaresCalc.includes(null)) { // если нет в массиве null, то это ничья
            return 'draw';
        }
    }
    return false;
}

export default Board;