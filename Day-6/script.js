const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = `https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current_weather=true`; // Delhi coordinates

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const temperature = data.current_weather.temperature;
            const description = data.current_weather.weathercode; // Will map this to a readable string
            weatherInfo.innerHTML = `Temperature: ${temperature}°C<br>Description: ${description}`;
        })
        .catch(error => {
            weatherInfo.innerHTML = "Error retrieving weather data.";
        });

    cityInput.value = '';
});