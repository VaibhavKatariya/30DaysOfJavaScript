const workoutForm = document.getElementById('workoutForm');
const workoutList = document.getElementById('workoutList');
const clearBtn = document.getElementById('clearBtn');

let workouts = JSON.parse(localStorage.getItem('workouts')) || [];

function renderWorkouts() {
    workoutList.innerHTML = '';
    workouts.forEach((workout, index) => {
        const li = document.createElement('li');
        li.textContent = `${workout.exerciseType} - ${workout.duration} mins - ${workout.calories} calories`;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteWorkout(index);
        li.appendChild(deleteBtn);
        
        workoutList.appendChild(li);
    });
}

function deleteWorkout(index) {
    workouts.splice(index, 1);
    localStorage.setItem('workouts', JSON.stringify(workouts));
    renderWorkouts();
}

workoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const exerciseType = document.getElementById('exerciseType').value;
    const duration = document.getElementById('duration').value;
    const calories = document.getElementById('calories').value;

    workouts.push({ exerciseType, duration, calories });
    localStorage.setItem('workouts', JSON.stringify(workouts));
    renderWorkouts();
    workoutForm.reset();
});

clearBtn.addEventListener('click', () => {
    localStorage.removeItem('workouts');
    workouts = [];
    renderWorkouts();
});

renderWorkouts();
