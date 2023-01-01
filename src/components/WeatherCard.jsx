import React from 'react';
import { useState, useEffect } from 'react';
import Weather_app from './Weather_app';


const WeatherCard = () => {

    const [load, setLoad] = useState(false)

    useEffect(() => {
        setLoad(true)

        setTimeout(() => {
            setLoad(false)
        }, 4000)

    }, [])

    return (
        <div className='card'>
            <div className='weather__card'>
                {load ?
                    <i className='bx bxl-google-cloud bx-tada bx-lg' ></i> :
                    <Weather_app />}
            </div>
        </div>
    );
};

export default WeatherCard;