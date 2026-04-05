import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'


const Weather = () => {

    const inputref = useRef()
    // this is for  the  icons ddata
    const [weatherData, setweatherData] = useState(false);
    const allicons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    }

    const search = async (city) => {
        if (city == "") {
            alert("enter city name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                setweatherData(false);
                alert("City not found");
                return;
            }

            const icon = allicons[data.weather[0].icon] || clear_icon;

            setweatherData({
                humidity: data.main.humidity,
                windSpeed: Math.floor(data.wind.speed * 3.6),
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        } catch (error) {
            setweatherData(false);
            console.error("error in fecthing the data");
        }
    }

    useEffect(() => {
        search()
    }, [])

    return (
        <div className='weather'>
            <div className="search-bar">
                <input ref={inputref} type="text" placeholder='search' />
                <img src={search_icon} alt="" onClick={() => {
                    search(inputref.current.value) ;
                    inputref.current.value = "" ;
                }} />
            </div>

            {weatherData ? <>
                <img src={weatherData.icon} alt="" className='weather-icon' />
                <p className='temperature'>{weatherData.temperature}°c</p>
                <p className='location'>{weatherData.location}</p>

                <div className="weather-data">
                    <div className="col">
                        <img src={humidity_icon} alt="" />
                        <div>
                            <p>{weatherData.humidity} %</p>
                            <span>Humidity</span>
                        </div>
                    </div>
                    <div className="col">
                        <img src={wind_icon} alt="" />
                        <div>
                            <p>{weatherData.windSpeed}km/hr</p>
                            <span>wind-spped</span>
                        </div>
                    </div>
                </div>
            </> : <><p className='datantfound'>data not found</p></>}
        </div>
    )
}

export default Weather
