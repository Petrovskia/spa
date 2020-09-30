import React, {Component} from "react";

class WeatherController extends Component {
    render() {
        return (
            <div>
                <h3>Облачность: {this.props.main}</h3>
                <img src={this.props.iconUrl} alt={this.props.alt}/>
                <hr/>
                <p>Город: {this.props.city}</p>
                <p>Страна: {this.props.country}</p>
                <p>Температура: {this.props.temp}&deg;</p>
                <p>Скорость ветра: {this.props.wind}</p>
                <p>Восход солнца: {this.props.sunrise}</p>
                <p>Закат: {this.props.sunset}</p>
            </div>
        )
    }
}

export default WeatherController;