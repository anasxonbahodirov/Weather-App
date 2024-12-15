import React, { useState } from "react";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("bg-blue-200");

  const fetchWeatherData = async (e) => {
    e.preventDefault();

    if (!city) return alert("Iltimos, shahar nomini kiriting");

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a73158bcd0973b583f214356df9ec897`
      );
      const data = await res.json();

      if (data.cod === 200) {
        setWeatherData(data);
        updateBackgroundImage(data.weather[0].main);
      } else {
        alert("Shahar topilmadi. Iltimos, qaytadan urinib ko'ring.");
      }
    } catch (error) {
      alert("Ma'lumotlarni olishda xatolik yuz berdi. Keyinroq qayta urinib ko'ring.");
    }
  };

  const updateBackgroundImage = (weatherCondition) => {
    switch (weatherCondition.toLowerCase()) {
      case "clear":
        setBackgroundImage("bg-[url('https://example.com/clear.jpg')]");
        break;
      case "clouds":
        setBackgroundImage("bg-[url('https://example.com/clouds.jpg')]");
        break;
      case "rain":
        setBackgroundImage("bg-[url('https://example.com/rain.jpg')]");
        break;
      case "snow":
        setBackgroundImage("bg-[url('https://example.com/snow.jpg')]");
        break;
      default:
        setBackgroundImage("bg-blue-200");
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-cover bg-center ${backgroundImage}`}>
      <form
        onSubmit={fetchWeatherData}
        className="bg-white p-6 rounded shadow-lg w-full max-w-lg text-center md:w-1/2 lg:w-1/3"
      >
        <h2 className="text-3xl font-bold mb-6 text-blue-700">Ob-havo Ilovasi</h2>
        <p className="mb-4 text-gray-700">Shahar nomini kiriting:</p>
        <div className="flex mb-6">
          <input
            type="text"
            placeholder="Masalan, Toshkent"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-3 rounded-r hover:bg-blue-700 transition focus:ring-2 focus:ring-blue-400"
          >
            Ma'lumot olish
          </button>
        </div>
      </form>

      {weatherData && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-lg md:w-1/2 lg:w-1/3">
          <h3 className="text-2xl font-bold text-gray-800">
            {weatherData.name}, {weatherData.sys.country}
          </h3>
          <p className="text-xl text-gray-600">Harorat: {weatherData.main.temp}°C</p>
          <p className="text-lg text-gray-600">Holat: {weatherData.weather[0].description}</p>
          <p className="text-lg text-gray-600">Namlik: {weatherData.main.humidity}%</p>
          <p className="text-lg text-gray-600">Shamol tezligi: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default App;
