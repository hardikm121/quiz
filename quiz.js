const quizQuestions = [
  {
    question: "What is the capital of India?",
    options: ["Bhopal", "Mumbai", "Delhi", "Kolkata"],
    correctAnswer: "Delhi"
  },
  {
    question: "Which of the following is the northernmost state in India?",
    options: ["Jharkhand", "Rajasthan", "Jammu and Kashmir", "Gujarat"],
    correctAnswer: "Jammu and Kashmir"
  },
  {
    question: "Which river forms the eastern boundary of India with Bangladesh?",
    options: ["Yamuna", "Ganges", "Brahmaputra", "Godavari"],
    correctAnswer: "Brahmaputra"
  },
  {
    question: "What is the total number of States in India?",
    options: ["29", "28", "26", "27"],
    correctAnswer: "28"
  },
  {
    question: "What is the total number of Union Territories in India?",
    options: ["9", "7", "8", "6"],
    correctAnswer: "8"
  },
  {
    question: "What is the capital of Madhya Pradesh?",
    options: ["Bhopal", "Indore", "Ujjain", "Gwalior"],
    correctAnswer: "Bhopal"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft =10;
let timerInterval;

function startQuiz() {
  document.getElementById("start-button").style.display = "none";
  displayQuestion();
  startTimer();
}

function displayQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const questionText = document.getElementById("question-text");
  const answerButtons = document.getElementById("answer-buttons");

  questionText.innerHTML = "";
  answerButtons.innerHTML = "";

  questionText.innerHTML = currentQuestion.question;

  currentQuestion.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("answer-button");
    answerButtons.appendChild(button);

    button.addEventListener("click", function() {
      checkAnswer(option);
    });
  });
}

function checkAnswer(selectedOption) {
  const currentQuestion = quizQuestions[currentQuestionIndex];

  if (selectedOption === currentQuestion.correctAnswer) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

function startTimer() {
  timerInterval = setInterval(function() {
    timeLeft--;

    document.getElementById("timer").textContent = timeLeft;

    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timerInterval);

  const scorePercentage = (score / quizQuestions.length) * 100;

  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>Your Score: ${score} out of ${quizQuestions.length}</p>
    <p>Score Percentage: ${scorePercentage}%</p>
  `;
}

document.getElementById("start-button").addEventListener("click", startQuiz);