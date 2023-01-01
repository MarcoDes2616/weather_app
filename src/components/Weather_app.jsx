import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import countries from "../countries.json"
import Clock from './Clock';

const Weather_app = () => {

    const [currentWeather, setCurrentWeather] = useState({})

    useEffect(() => {
        function success(pos) {
            const crd = pos.coords;

            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=da0f67a4b754f6b86eebe51869877c34
            `)
                .then(res => setCurrentWeather(res.data))

            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
        }
        

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error);
    }, [])

    let tempFarenheit = 0
    let tempCelsius = 0
    const tempKelvin = `${currentWeather.main?.temp}`
    tempFarenheit = ((tempKelvin - 273.15) * 9 / 5 + 32).toFixed(1)
    tempCelsius = (tempKelvin - 273.15).toFixed(1)

    const [isFarenheit, setIsFarenheit] = useState(false)

    let currentCountry = countries.find(function (country) {
        return country.code === `${currentWeather.sys?.country}`
    })
    
    return (
        <div className='weather__app'>
            <h1>SMART WEATHER</h1><i className='bx bxs-battery-charging'></i>
            <div className='first_contain'>
                <Clock />
                <div className='img_geo'>
                    {currentWeather.weather?.[0].icon ? <img src={`https://openweathermap.org/img/wn/${currentWeather.weather?.[0].icon}@2x.png`} alt="" /> : "loading"}                
                    <p><i className='bx bx-map-pin'></i> {currentWeather.name}, {currentCountry?.name}</p>
                </div>
            </div>
            <p className='dir'><i className='bx bx-log-in-circle'></i> https://openweathermap.org/</p>
            <div className='info_weather'>
                <div className='info temp'>
                    <i className='bx bxs-sun'></i>
                    <p>{isFarenheit ? tempFarenheit : tempCelsius}<br />{isFarenheit ? "°F" : "°C"}</p>
                </div>
                <div className='info wind'>
                    <i className='bx bxl-tailwind-css'></i>
                    <p>{currentWeather.wind?.speed ? currentWeather.wind?.speed : "0"}<br />m/s</p>
                </div>
                <div className='info cloud'>
                    <i className='bx bxl-google-cloud'></i>
                    <p>{currentWeather.clouds?.all ? currentWeather.clouds?.all : "0"}<br />%</p>
                </div>
                <div className='info press'>
                    <i className='bx bxs-thermometer'></i>
                    <p>{currentWeather.main?.pressure ? currentWeather.main?.pressure : "0"}<br />hPa</p>
                </div>
                <div className='button'>
                    <button onClick={() => setIsFarenheit(!isFarenheit)}><i className='bx bx-shuffle'></i>  {isFarenheit ? "°C" : "°F"}</button>
                    <p>by Marco Cardenas - G21 - ACADEMLO</p>
                </div>

            </div>
        </div>
    );
};

export default Weather_app;