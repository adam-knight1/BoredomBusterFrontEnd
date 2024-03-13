import React, { useState } from 'react';
import Link from 'next/link';

interface WeatherInfo {
  wind_speed: number;
  wind_degrees: number;
  temp: number;
  humidity: number;
  sunset: number;
  min_temp: number;
  cloud_pct: number;
  feels_like: number;
  sunrise: number;
  max_temp: number;
}

const WeatherInfo = () => {
  const [zip, setZip] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

 const fetchWeatherInfo = async () => {
   setLoading(true);
   setError(''); // Clear previous errors
   const backendBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
   const query = zip ? `zip=${encodeURIComponent(zip)}` : `city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}`;
   console.log(`Requesting weather data from: ${backendBaseUrl}/api/weather/forecast?${query}`);

   try {
     const response = await fetch(`${backendBaseUrl}/api/weather/forecast?${query}`, {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
       },
     });

      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }

      const data: WeatherInfo = await response.json();
      setWeather(data);
    } catch (error: any) {
      console.error(error);
      setError('Failed to fetch weather information. ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchWeatherInfo();
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mb-6">Weather Information</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col items-center gap-3">
        <input
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="Enter ZIP code"
          className="input input-bordered input-primary w-full rounded-full"
          style={{ padding: '10px', border: '1px solid #ccc', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
        />
        <div>OR</div>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="input input-bordered input-primary w-full rounded-full"
          style={{ padding: '10px', border: '1px solid #ccc', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
        />
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="Enter state"
          className="input input-bordered input-primary w-full rounded-full"
          style={{ padding: '10px', border: '1px solid #ccc', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
        />
        <button
          type="submit"
          className="btn bg-accent hover:bg-red-700 text-white font-semibold rounded-full py-2 px-6"
          style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
        >
          Get Weather
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {weather && (
        <div
          className="mt-4 p-4 w-full max-w-lg bg-white rounded-3xl text-center"
          style={{ boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)' }}
        >
                 <h2 className="text-lg font-semibold">
                 Weather Information:
                 {zip ? ` ZIP Code: ${zip}` : ` ${city}, ${state}`}
                 </h2>
                 <p>Temperature: {weather.temp}°C</p>
                 <p>Wind Speed: {weather.wind_speed} km/h</p>
                 <p>Wind Direction: {weather.wind_degrees}°</p>
                 <p>Humidity: {weather.humidity}%</p>
                 <p>Sunset: {new Date(weather.sunset * 1000).toLocaleTimeString()}</p>
                 <p>Minimum Temperature: {weather.min_temp}°C</p>
                 <p>Cloud Coverage: {weather.cloud_pct}%</p>
                 <p>Feels Like: {weather.feels_like}°C</p>
                 <p>Sunrise: {new Date(weather.sunrise * 1000).toLocaleTimeString()}</p>
                 <p>Maximum Temperature: {weather.max_temp}°C</p>
               </div>
             )}

      <Link href="/" className="mt-6 text-indigo-800 hover:underline">Back to home</Link>
    </div>
    );
      };

    export default WeatherInfo;

