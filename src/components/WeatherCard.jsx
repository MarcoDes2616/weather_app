import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import countries from "../countries.json"
import Clock from './Clock';


const WeatherCard = () => {

    const [currentWeather, setCurrentWeather] = useState({})
    const [geo, setGeo] = useState({})

    useEffect(() => {
        function success(pos) {
            const crd = pos.coords;

            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=da0f67a4b754f6b86eebe51869877c34
            `)
                .then(res => setCurrentWeather(res.data))

            axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${crd.latitude}&lon=${crd.longitude}&limit=1&appid=da0f67a4b754f6b86eebe51869877c34`)
                .then(res => setGeo(res.data[0]))

            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error);
    }, [])

    let currentCountry = countries.find(function (country) {
        return country.code === `${geo.country}`
    })

    const tempKelvin = `${currentWeather.main?.temp}`
    const tempFarenheit = Math.round((tempKelvin - 273.15) * 9 / 5 + 32)
    const tempCelsius = Math.round(tempKelvin - 273.15)

    const [isFarenheit, setIsFarenheit] = useState(false)

    return (
        <div className='card'>
            <img className='bg_card' src="src/assets/img/bg.png" alt="" />
            <div className='weather__app'>
                <h1>SMART WEATHER</h1>
                <div className='first_contain'>
                    <Clock />
                    <div className='img_geo'>
                    <img src={`http://openweathermap.org/img/wn/${currentWeather.weather?.[0].icon}@2x.png`} alt="" />
                    <p><i class='bx bx-map-pin'></i> {geo.name}, {currentCountry?.name}</p>
                    </div>
                </div>
                <p className='dir'><i class='bx bx-log-in-circle'></i> https://openweathermap.org/</p>
                <div className='info_weather'>
                    <div className='info temp'>
                        <i class='bx bxs-sun'></i>
                        <p>{isFarenheit ? tempFarenheit : tempCelsius} <br />{isFarenheit ? "°F" : "°C"}</p>
                    </div>
                    <div className='info wind'>
                        <i class='bx bxl-tailwind-css'></i>
                        <p>{currentWeather.wind?.speed} <br /> m/s</p>
                    </div>
                    <div className='info cloud'>
                        <i class='bx bxl-google-cloud'></i>
                        <p>{currentWeather.clouds?.all}<br />%</p>
                    </div>
                    <div className='info press'>
                        <i class='bx bxs-thermometer'></i>
                        <p>{currentWeather.main?.pressure} <br /> hPa</p>
                    </div>
                    <div className='bottom'></div>
                </div>
                <div className='btn_contain'>
                    <button onClick={() => setIsFarenheit(!isFarenheit)}><i class='bx bx-shuffle'></i>  {isFarenheit ? "°C" : "°F"}</button>
                </div>  
            </div>
        </div>
    );
};

export default WeatherCard;