const unitType = document.getElementById("unit-type");
const fromUnit = document.getElementById("from-unit");
const toUnit = document.getElementById("to-unit");
const inputValue = document.getElementById("input-value");
const outputValue = document.getElementById("output-value");
const convertBtn = document.getElementById("convert-btn");

const units = {
    length: {
        units: ["Meters", "Kilometers", "Miles"],
        conversions: {
            "Meters-Kilometers": (value) => value / 1000,
            "Kilometers-Meters": (value) => value * 1000,
            "Miles-Kilometers": (value) => value * 1.60934,
            "Kilometers-Miles": (value) => value / 1.60934,
        },
    },
    weight: {
        units: ["Kilograms", "Pounds"],
        conversions: {
            "Kilograms-Pounds": (value) => value * 2.20462,
            "Pounds-Kilograms": (value) => value / 2.20462,
        },
    },
    temperature: {
        units: ["Celsius", "Fahrenheit"],
        conversions: {
            "Celsius-Fahrenheit": (value) => (value * 9/5) + 32,
            "Fahrenheit-Celsius": (value) => (value - 32) * 5/9,
        },
    },
};

function populateUnits() {
    const selectedType = units[unitType.value].units;
    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";
    selectedType.forEach(unit => {
        fromUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
        toUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
    });
}

function convert() {
    const type = unitType.value;
    const from = fromUnit.value;
    const to = toUnit.value;
    const value = parseFloat(inputValue.value);

    if (!value) {
        outputValue.value = "Invalid input";
        return;
    }

    const conversionKey = `${from}-${to}`;
    const conversionFunction = units[type].conversions[conversionKey];

    if (conversionFunction) {
        outputValue.value = conversionFunction(value).toFixed(2);
    } else {
        outputValue.value = "Conversion not supported";
    }
}

unitType.addEventListener("change", populateUnits);
convertBtn.addEventListener("click", convert);

// Initialize
populateUnits();
