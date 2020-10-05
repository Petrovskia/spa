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
        const squaresCopy = this.state.squares.slice(); // создать копию массива из состояния squares

        // отмена повторного нажатия на элемент, и отмена при ничье и победе
        if(squaresCopy[i] || calculateWinner(squaresCopy) === 1) {
            return;
        }

        squaresCopy[i] = this.state.xIsNext ? 'X' : '0';
        // console.log(squares[i]);

        this.setState({
            xIsNext: !this.state.xIsNext, // меняем каждый ход значение на противоположное
            squares: squaresCopy
        });
    }

    // метод генерацией square
    renderSquare(i) {
        return <Square
            value={this.state.squares[i]}
            onClick={()=>this.handleClick(i)}
        />
    }

    render() {
        let winner = calculateWinner(this.state.squares);
        let status = null;
        if(winner === 1) {
            status = `Победил: ${this.state.xIsNext ? '0' : 'X'}`;
        } else if(winner === 2)  {
            status = 'НИЧЬЯ!';
        } else if(winner === 3)  {
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
        [0,1,2],
        [3,4,5],
        [6,7,8],

        [0,3,6],
        [1,4,7],
        [2,5,8],

        [0,4,8],
        [2,4,6]
    ];

    for(let i=0; i < lines.length; i++) {
        const [a,b,c] = lines[i];
        // console.log([a,b,c]);
        if(squaresCalc[a] && squaresCalc[a] === squaresCalc[b] && squaresCalc[a] === squaresCalc[c]) {
            console.log(1)
            return 1;
        } else if(!squaresCalc[a] && !squaresCalc[b] && !squaresCalc[c]){
            console.log(2)
            return 2;
        } else {
            console.log(3)
            return 3;
        }
    }
}

export default Board;