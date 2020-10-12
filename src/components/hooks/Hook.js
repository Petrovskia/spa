import React, {Component, useState} from "react";

// кликер по кнопке
// class Hook extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             count: 0
//         }
//     }
//
//     render() {
//         return (
//             <div>
//                 <h3>Вы кликнули: {this.state.count}</h3>
//                 <button onClick={() => {
//                     this.setState({
//                         count: this.state.count + 1
//                     })
//                 }
//                 }>Тыкай
//                 </button>
//             </div>
//         )
//     }
// }


// тот же пример с хуком
function Hook() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h3>Вы кликнули: {count}</h3>
            <button onClick={() => {
                setCount(count + 1)
            }
            }>Тыкай
            </button>
        </div>
    )
}

export default Hook;