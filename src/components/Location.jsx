import React, { useState, useEffect } from 'react';
import axios from 'axios';
import countries from "../countries.json"

const Location = () => {
    const [geo, setGeo] = useState({})

    useEffect(() =>{
        axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=-0.11945301285051656&lon=-78.48137182626431&limit=1&appid=da0f67a4b754f6b86eebe51869877c34`)
            .then(res => setGeo(res.data[0]))
    }, [])
    

    let currentCountry = countries.find(function (country) {
        return country.code === `${geo.country}`
    })

    return (
        <div className='img_geo'>
            <p><i className='bx bx-map-pin'></i> {geo.name}, {currentCountry?.name}</p>
        </div>
    );
};

export default Location;