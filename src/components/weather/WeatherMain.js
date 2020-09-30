import React, {Component} from "react";
import WeatherController from "./WeatherController";
import Info from "./Info";
import Form from "./Form";

const API_KEY = 'ee912c3f02a518a9cfa9399356db39d0';

class WeatherMain extends Component {
    state = {
        iconUrl: null,
        alt: null,
        wind: null,
        main: null,
        temp: null,
        city: null,
        country: null,
        sunrise: null,
        sunset: null,
        error: null,
    }

    // Promise(промис/обещание) - объект, представляющий окончательное завершение или сбойасинхронного запроса. Промис возвращает объект, к которому прикрепляется колбэк.
    gettingWeather = async (event) => {
        event.preventDefault(); // отменяем обновление страницы при отправке формы

        const city = event.target.elements.city.value; // получаем значение введенного в поле формы с name="city"
        const country = event.target.elements.country.value;
        console.log(city, country);

        // выполняем асинронный запрос по Url через функцию fetch
        const apiUrl = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&APPID=${API_KEY}`);
        //console.log(apiUrl);  // при успешном выполнении получаем статус ответа от сервера 200, т.е. все ОК
        const data = await apiUrl.json(); // считываем данные
        console.log(data); // полные данные по городу
        //console.log(data.city.population); // узнать сколько людей в городе

        try {
            let sunrise = data.city.sunrise;
            let sunset = data.city.sunset;
            let timezone = data.city.timezone; // Часовой пояс НСК -> 25200 секунд = это 7 часов

            let date = new Date();
            date.setTime(sunrise * 1000 - timezone);
            let sunriseDate = date.toLocaleTimeString(); // 07:28:26

            date.setTime(sunset * 1000 - timezone);
            let sunsetDate = date.toLocaleTimeString(); // 19:06:59

            let icon = data.list[0].weather[0].icon;

            // setState - позволяет установить новые значения в state(состоянии) и как-только это произойдет, наш компонент будет перерисован с новыми данными
            this.setState({
                main: data.list[0].weather[0].main,
                iconUrl: `http://openweathermap.org/img/wn/${icon}.png`,
                alt: data.list[0].weather[0].description,
                temp: (data.list[0].main.temp - 273.15).toFixed(2),
                wind: data.list[0].wind.speed,
                city: data.city.name,
                country: data.city.country,
                sunrise: sunriseDate,
                sunset: sunsetDate,
            });
        } catch (error) {
            alert('Нет такого города');
            console.log(error);
        }
    }


    render() {
        return (
            <div>
                <Info />
                <Form weatherMethod={this.gettingWeather}/>
                <WeatherController
                    main={this.state.main}
                    iconUrl={this.state.iconUrl}
                    wind={this.state.wind}
                    temp={this.state.temp}
                    city={this.state.city}
                    country={this.state.country}
                    alt={this.state.alt}
                    sunrise={this.state.sunrise}
                    sunset={this.state.sunset}
                />
            </div>
        )
    }
}

export default WeatherMain;