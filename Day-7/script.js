const form = document.getElementById('expense-form');
const nameInput = document.getElementById('expense-name');
const amountInput = document.getElementById('expense-amount');
const categoryInput = document.getElementById('expense-category');
const expenseList = document.getElementById('expense-list');
const totalExpenses = document.getElementById('total-expenses');
const filterCategory = document.getElementById('filter-category');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const expense = {
        id: Date.now(),
        name: nameInput.value,
        amount: parseFloat(amountInput.value),
        category: categoryInput.value
    };
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses(expenses);
    nameInput.value = '';
    amountInput.value = '';
});

filterCategory.addEventListener('change', () => {
    const filteredExpenses = filterCategory.value === 'All' 
        ? expenses 
        : expenses.filter(expense => expense.category === filterCategory.value);
    renderExpenses(filteredExpenses);
});

function renderExpenses(expensesToRender) {
    expenseList.innerHTML = '';
    let total = 0;
    expensesToRender.forEach(expense => {
        const li = document.createElement('li');
        li.innerHTML = `${expense.name} - ₹${expense.amount} 
        <span>[${expense.category}]</span> <button class="delete-btn" data-id="${expense.id}">Delete</button>`;
        total += expense.amount;
        expenseList.appendChild(li);
    });
    totalExpenses.textContent = `₹${total}/-`;

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', () => {
            const id = parseInt(button.getAttribute('data-id'));
            expenses = expenses.filter(expense => expense.id !== id);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            renderExpenses(expenses);
        });
    });
}

renderExpenses(expenses);
