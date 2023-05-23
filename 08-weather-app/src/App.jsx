import { useEffect, useState } from 'react';
import './App.css';

const API_KEY = '439d4b804bc8187953eb36d2a8c26a02';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (city) {
      getWeatherData(getDatacb);
    }
  }, [city]);

  const getDatacb = (data) => {
    console.log(data.list[0].weather[0].main);
    setWeather(data.list[0].weather[0].main);
  };

  const getWeatherData = async (cb) => {
    try {
      const res = await fetch(
        `https://openweathermap.org/data/2.5/find?q=${city}&appid=${API_KEY}`,
        {
          method: 'GET',
        }
      );
      const response = await res.json();
      cb(response)
      console.log('after data');
    } catch (e) {
      console.log(e);
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const getBackgroundImage = () => {
    if (weather === 'Clear') {
      return 'url(https://images.pexels.com/photos/296234/pexels-photo-296234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'; // Replace with actual image URL
    } else if (weather === 'Clouds') {
      return 'url(https://images.pexels.com/photos/2761308/pexels-photo-2761308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'; // Replace with actual image URL
    } else if (weather === 'Rain') {
      return 'url(https://images.pexels.com/photos/1463530/pexels-photo-1463530.jpeg?auto=compress&cs=tinysrgb&w=1600)'; // Replace with actual image URL
    } else if (weather === 'Snow') {
      return 'url(https://images.pexels.com/photos/3462588/pexels-photo-3462588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'; // Replace with actual image URL
    } else {
      return 'url(https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'; // No background image
    }
  };

  const getBackgroundColor = () => {
    if (weather === 'Clear') {
      return '#ffce53'; // Yellow
    } else if (weather === 'Clouds') {
      return '#7f8c8d'; // Gray
    } else if (weather === 'Rain') {
      return '#3498db'; // Blue
    } else if (weather === 'Snow') {
      return '#ecf0f1'; // White
    } else {
      return '#ddd'; // Default background color
    }
  };

  return (
    <div
      className='app'
      style={{
        backgroundImage: getBackgroundImage(),
      }}
    >
      <h1 className='title' style={{ color: getBackgroundColor() }}>
        Weather App
      </h1>
      <input
        className='city-input'
        type='text'
        value={city}
        onChange={handleCityChange}
        placeholder='Enter a city'
      />
      {weather && (
        <h2 style={{ color: getBackgroundColor() }} className='weather-text'>
          Current weather: {weather}
        </h2>
      )}
    </div>
  );
}

export default App;
