const form = document.getElementById('diary-form');
const input = document.getElementById('diary-input');
const diaryList = document.getElementById('diary-list');

function loadDiaryEntries() {
    const entries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
    entries.forEach(entry => {
        addEntryToDOM(entry);
    });
}

function addEntryToDOM(entry) {
    const li = document.createElement('li');
    li.textContent = entry;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = () => {
        deleteEntry(entry, li);
    };
    li.appendChild(deleteBtn);
    diaryList.appendChild(li);
}

function deleteEntry(entry, li) {
    let entries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
    entries = entries.filter(e => e !== entry);
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
    diaryList.removeChild(li);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const entry = input.value.trim();
    if (entry) {
        let entries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
        entries.push(entry);
        localStorage.setItem('diaryEntries', JSON.stringify(entries));
        addEntryToDOM(entry);
        input.value = '';
    }
});

document.addEventListener('DOMContentLoaded', loadDiaryEntries);
