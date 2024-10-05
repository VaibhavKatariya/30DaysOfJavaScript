const form = document.querySelector('#converter-form');
const temperatureInput = document.querySelector('#temperature-input');
const unitSelect = document.querySelector('#unit-select');
const resultOutput = document.querySelector('#result-output');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const temperature = parseFloat(temperatureInput.value);
    const unit = unitSelect.value;

    if (isNaN(temperature)) {
        resultOutput.textContent = 'Please enter a valid number.';
        return;
    }

    let convertedTemp;
    if (unit === 'celsius') {
        convertedTemp = (temperature * 9 / 5) + 32;
        resultOutput.textContent = `${temperature}°C = ${convertedTemp.toFixed(2)}°F`;
    } else {
        convertedTemp = (temperature - 32) * 5 / 9;
        resultOutput.textContent = `${temperature}°F = ${convertedTemp.toFixed(2)}°C`;
    }
});
