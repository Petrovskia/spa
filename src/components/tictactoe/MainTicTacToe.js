import React, {Component} from "react";
import Board from "./Board";

class MainTicTacToe extends Component {
    render() {
        return (
            <div className={"game"}>
                <h1>Крестики-нолики</h1>
                <div className={"game-board"}>
                    <Board />
                </div>
                <div className={"game-info"}>

                </div>
            </div>
        )
    }
}
export default MainTicTacToe;