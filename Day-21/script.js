const habitInput = document.getElementById('habitInput');
const addHabitBtn = document.getElementById('addHabitBtn');
const habitList = document.getElementById('habitList');

let habits = JSON.parse(localStorage.getItem('habits')) || [];

function renderHabits() {
    habitList.innerHTML = '';
    habits.forEach((habit, index) => {
        const li = document.createElement('li');
        li.classList.add(habit.completed ? 'completed' : 'pending');
        li.innerHTML = `
            <span>${habit.name}</span>
            <div>
            <button onclick="toggleHabit(${index})">${habit.completed ? 'Undo' : 'Complete'}</button>
            <button style=" background-color: red; " onclick="removeHabit(${index})">Delete</button>
            </div>
        `;
        habitList.appendChild(li);
    });
}

function addHabit() {
    const habitName = habitInput.value.trim();
    if (habitName) {
        habits.push({ name: habitName, completed: false });
        localStorage.setItem('habits', JSON.stringify(habits));
        habitInput.value = '';
        renderHabits();
    }
}

function toggleHabit(index) {
    habits[index].completed = !habits[index].completed;
    localStorage.setItem('habits', JSON.stringify(habits));
    renderHabits();
}

function removeHabit(index) {
    habits.splice(index, 1); // Remove the habit at the given index
    localStorage.setItem('habits', JSON.stringify(habits));
    renderHabits();
}

addHabitBtn.addEventListener('click', addHabit);
window.onload = renderHabits;
