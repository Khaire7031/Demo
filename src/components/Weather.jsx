import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            const options = {
                method: "GET",
                url: "https://weather-api167.p.rapidapi.com/api/weather/current",
                params: {
                    place: "London,GB",
                    units: "standard",
                    lang: "en",
                    mode: "json",
                },
                headers: {
                    "x-rapidapi-key": "44fccb3027msh5cb272c5d09a6ddp1b09aejsn744658fb6df1",
                    "x-rapidapi-host": "weather-api167.p.rapidapi.com",
                    Accept: "application/json",
                },
            };

            try {
                const response = await axios.request(options);
                setWeather(response.data);
            } catch (error) {
                setError("Failed to fetch weather data");
                console.error(error);
            }
        };

        fetchWeather();
    }, []);

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!weather) {
        return <div className="loading">Loading weather data...</div>;
    }

    return (
        <div className="weather-container">
            <h2>Weather in {weather.name}, {weather.sys.country}</h2>
            <p><strong>Coordinates:</strong> Lon: {weather.coord.lon}, Lat: {weather.coord.lat}</p>
            <p><strong>Summary:</strong> {weather.weather[0].description}, {weather.main.temp}K,
                feels like {weather.main.feels_like}K</p>
            <p><strong>Wind:</strong> {weather.wind.speed} meter/sec from {weather.wind.deg}°</p>
            <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
            <p><strong>Pressure:</strong> {weather.main.pressure} hPa</p>
            <p><strong>Visibility:</strong> {weather.visibility} meters</p>
            <p><strong>Sunrise:</strong> {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p><strong>Sunset:</strong> {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
        </div>
    );
};

export default Weather;

// CSS Styles
const styles = `
.weather-container {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
  background: linear-gradient(135deg, #72c2ff, #004e92);
  color: white;
  text-align: center;
  font-family: Arial, sans-serif;
}
.loading, .error {
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
}
`;

document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);