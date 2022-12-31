import React from 'react';
import { useState, useEffect } from 'react';
import Weather_app from './Weather_app';
import PacmanLoader from "react-spinners/PacmanLoader";


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
                    <PacmanLoader
                        color={"rgb(4, 250, 37)"}
                        loading={load}
                        size={30}
                    /> :
                    <Weather_app />}
            </div>
        </div>
    );
};

export default WeatherCard;