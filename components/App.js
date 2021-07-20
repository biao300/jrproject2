import React from 'react';
import Temprature from './Temprature';
import Detail from './Detail';
import OtherCity from './OtherCity';
import Weekly from './Weekly';

/**
 * base url:
 * https://openweathermap.org/api
 * 
 * get by city id:
 * https://api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key}
 * 
 * 5 days free api:
 * https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}
 * 
 * this is for paid service XD:
 * https://api.openweathermap.org/data/2.5/forecast/daily?id={city ID}&cnt={cnt}&appid={API key}
 */

// const data
const url_base = "https://api.openweathermap.org/data/2.5";
const api_key = "3c8a6822afb89f8a6e9ba88e40c5ef0d";

// city coords [latitude, longitude]
const melbourne_coords = [-37.814, 144.9633];

const city_list = [
    //"2158177", // Melbourne
    "2147714", // Sydney
    "2174003", // Brisbane
    "2172517", // Canberra
    "2063523", // Perth
    "2073124", // Darwin
];

const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

const axios = require('axios');

// for api call
function GetCityWeatherById(cityid, callback) {
    /*
    // use axios or got
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          //can get correct data here but can't pass out
          //console.log(this.responseText);
          
          callback(JSON.parse(this.responseText));
          // will get undefined if just use return...
          //return this.responseText;
        }
    };
    xhttp.open("GET", `${url_base}/weather?id=${cityid}&appid=${api_key}`, true);
    xhttp.send();
    */

    axios.get(`${url_base}/weather?id=${cityid}&appid=${api_key}`)
    .then((response) => {
        callback(response.data);
    })
    .catch((error) => {
        console.log(error);
    });
}

function GetCurrentCityWeather(coords, callback) {
    // axios makes source code more readable
    axios.get(`${url_base}/onecall?lat=${coords[0]}&lon=${coords[1]}&exclude=minutely,hourly,alerts&appid=${api_key}`)
    .then((response) => {
        callback(response.data);
    })
    .catch((error) => {
        console.log(error);
    });
}

// process original data to fit for display
function Kelvin2Celsius(temp) {
    if (Number(temp) === NaN) {
        return 0;
    }

    return parseInt(Number(temp) - 273.15) + "º";
}

function Timezone2City(timezone) {
    let arr = timezone.split("/");
    return arr[1];
}

function Unix2Date(unix) {
    let date = new Date(unix * 1000);
    return date;
}


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            current: null,  // type: object
            others:[],
        };

        // must do this or we will get "Cannot read property 'setState' of undefined"
        this.handleWeatherChange = this.handleWeatherChange.bind(this);
        this.handleWeeklyChange = this.handleWeeklyChange.bind(this);
    }

    componentDidMount() {
        // current city's weather + 5 days free api
        GetCurrentCityWeather(melbourne_coords, this.handleWeeklyChange);

        for (let i = 0; i < city_list.length; i ++)
        {
            // for other cities current weather
            GetCityWeatherById(city_list[i], this.handleWeatherChange);
        }
    }

    handleWeatherChange(newWeather) {
        // make a copy of state
        let {others} = this.state;
        // change
        others.push(newWeather);

        // set & re-render
        this.setState({
            others: others,
        });
    }

    handleWeeklyChange(newWeekly) {
        let {current} = this.state;
        current = newWeekly;

        this.setState({
            current: current,
        });
    }

    render() {
        const others = this.state.others;
        //console.log(others);
        const current = this.state.current;
        //console.log(current);

        const fiveDays = current ? current.daily.slice(1,6) : [];

        return (
            <div className="container">
                <div className="container__current">
                    <div className="container__current__left">
                        <div className="container__current__left__up">
                            <Temprature data={{
                                temprature: current ? Kelvin2Celsius(current.current.temp) : "loading", 
                                weather: current ? current.current.weather[0].main : ""
                            }}/>
                        </div>
                        <div className="container__current__left__down">
                            <Detail data={{
                                line1: "Humidity", 
                                line2: current ? (current.current.humidity + "%") : ""
                            }} />
                            <p className="container__current__left__down__line"> </p>
                            <Detail data={{
                                line1: "Wind", 
                                line2: current ? (current.current.wind_speed + " m/s") : ""
                            }} />
                        </div>
                    </div>
                    <div className="container__current__right">
                        {current ? Timezone2City(current.timezone) : ""}
                    </div>
                </div>

                <div className="container__others">
                    <div className="container__others__left">
                        <table className="container__others__left__city">
                            <tbody>
                                {others.map((item, index) => {
                                    // use map() to render array elements, but need a key for DOM??
                                    return <OtherCity key={index} data={{
                                                city: item ? item.name : "",
                                                temprature: item ? Kelvin2Celsius(item.main.temp) : "",
                                                weather: item ? item.weather[0].main : ""
                                            }}/>
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="container__others__line"></div>
                    <div className="container__others__right">
                        {fiveDays.map((item, index) => {
                            if (item) {
                                let date = Unix2Date(item.dt);
                                return <Weekly key={index} data={{
                                            date: date.getDate() + " " + months[date.getMonth()],
                                            weekday: weekdays[date.getDay()], 
                                            temprature: Kelvin2Celsius(item.temp.day), 
                                            weather: item.weather[0].main}}/>
                            }
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

// 定制的组建名首字母一定要大写
// 为什么要引入 React?
// html attrs 的另命名

/* 
some command line memo:

sass styles\style.scss styles\style.css
npm run build
*/