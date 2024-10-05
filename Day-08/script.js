const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "Who wrote 'Hamlet'?",
        answers: [
            { text: "Charles Dickens", correct: false },
            { text: "William Shakespeare", correct: true },
            { text: "Leo Tolstoy", correct: false },
            { text: "Homer", correct: false }
        ]
    },
    {
        question: "What is the smallest prime number?",
        answers: [
            { text: "0", correct: false },
            { text: "1", correct: false },
            { text: "2", correct: true },
            { text: "3", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const scoreElement = document.getElementById('score');
const progressBar = document.getElementById('progress');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    nextButton.style.display = 'none';
    restartButton.style.display = 'none';
    showQuestion(questions[currentQuestionIndex]);
    updateProgressBar();
}

function showQuestion(question) {
    questionElement.textContent = question.question;
    answerButtonsElement.innerHTML = '';
    question.answers.forEach(answer => {
        const li = document.createElement('li');
        li.textContent = answer.text;
        li.classList.add('answer');
        li.addEventListener('click', () => selectAnswer(answer));
        answerButtonsElement.appendChild(li);
    });
}

function selectAnswer(answer) {
    const isCorrect = answer.correct;
    if (isCorrect) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
    }
    nextButton.style.display = 'block';
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        updateProgressBar();
    } else {
        nextButton.style.display = 'none';
        restartButton.style.display = 'block';
        questionElement.textContent = 'Quiz Completed!';
    }
});

restartButton.addEventListener('click', startQuiz);

function updateProgressBar() {
    progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
}

document.addEventListener('DOMContentLoaded', startQuiz);
