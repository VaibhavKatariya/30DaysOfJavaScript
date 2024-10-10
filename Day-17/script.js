const currencyOptions = [
    { code: "INR", name: "Indian Rupee (₹)" },
    { code: "USD", name: "US Dollar ($)" },
    { code: "EUR", name: "Euro (€)" },
    { code: "GBP", name: "British Pound (£)" },
    { code: "JPY", name: "Japanese Yen (¥)" }
];

// Populate currency select elements
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');

currencyOptions.forEach(currency => {
    const optionFrom = document.createElement('option');
    optionFrom.value = currency.code;
    optionFrom.textContent = currency.name;
    fromCurrencySelect.appendChild(optionFrom);

    const optionTo = document.createElement('option');
    optionTo.value = currency.code;
    optionTo.textContent = currency.name;
    toCurrencySelect.appendChild(optionTo);
});

// Set default selection to INR
fromCurrencySelect.value = "INR";
toCurrencySelect.value = "USD"; // Change to your desired default target currency

const amountInput = document.getElementById('amount');
const resultDiv = document.getElementById('result');

async function convertCurrency() {
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    const amount = parseFloat(amountInput.value);
    
    if (isNaN(amount)) {
        resultDiv.textContent = "Please enter a valid amount.";
        resultDiv.classList.add('error-message');
        return;
    }

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);
        resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        resultDiv.classList.remove('error-message');
    } catch (error) {
        resultDiv.textContent = "Error fetching exchange rates. Please try again.";
        resultDiv.classList.add('error-message');
    }
}

// Add event listener to the convert button
document.getElementById('convertBtn').addEventListener('click', convertCurrency);