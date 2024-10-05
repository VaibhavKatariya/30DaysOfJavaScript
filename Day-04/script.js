const billAmountInput = document.getElementById('bill-amount');
const tipPercentageInput = document.getElementById('tip-percentage');
const peopleInput = document.getElementById('people');
const calculateBtn = document.getElementById('calculate-btn');
const tipAmountDisplay = document.getElementById('tip-amount');
const totalAmountDisplay = document.getElementById('total-amount');
const amountPerPersonDisplay = document.getElementById('amount-per-person');

calculateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const billAmount = parseFloat(billAmountInput.value);
    const tipPercentage = parseFloat(tipPercentageInput.value) / 100;
    const numberOfPeople = parseInt(peopleInput.value) || 1;

    if (isNaN(billAmount) || billAmount <= 0) {
        alert('Please enter a valid bill amount');
        return;
    }

    const tipAmount = billAmount * tipPercentage;
    const totalAmount = billAmount + tipAmount;
    const amountPerPerson = totalAmount / numberOfPeople;

    tipAmountDisplay.textContent = `Tip Amount: ₹${tipAmount.toFixed(2)}`;
    totalAmountDisplay.textContent = `Total Amount: ₹${totalAmount.toFixed(2)}`;

    if (numberOfPeople > 1) {
        amountPerPersonDisplay.style.display = 'block';
        amountPerPersonDisplay.textContent = `Amount per Person: ₹${amountPerPerson.toFixed(2)}`;
    } else {
        amountPerPersonDisplay.style.display = 'none';
    }
});
