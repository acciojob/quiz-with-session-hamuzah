const questions = [
  {
    question: "Question 1: What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    question: "Question 2: What is the largest planet in our solar system?",
    options: ["Mars", "Jupiter", "Saturn", "Venus"],
    correctAnswer: "Jupiter"
  },
  {
    question: "Question 3: Who painted the Mona Lisa?",
    options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Claude Monet"],
    correctAnswer: "Leonardo da Vinci"
  },
  {
    question: "Question 4: Which country won the FIFA World Cup in 2018?",
    options: ["Brazil", "Germany", "France", "Argentina"],
    correctAnswer: "France"
  },
  {
    question: "Question 5: What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Cu", "Fe"],
    correctAnswer: "Au"
  }
];

const questionsContainer = document.getElementById("questions");
const scoreElement = document.getElementById("score");

function renderQuiz() {
  let quizHtml = "";
  const savedProgress = sessionStorage.getItem("progress");
  const progress = savedProgress ? JSON.parse(savedProgress) : [];

  questions.forEach((question, index) => {
    const selectedOption = progress[index] || "";
    const optionsHtml = question.options
      .map(option => `<label><input type="radio" name="question${index}" value="${option}" ${selectedOption === option ? "checked" : ""}>${option}</label>`)
      .join("<br>");

    quizHtml += `<div>${question.question}<br>${optionsHtml}</div><br>`;
  });

  questionsContainer.innerHTML = quizHtml;
}

function saveProgress() {
  const progress = [];
  const options = document.querySelectorAll('input[type="radio"]:checked');

  options.forEach(option => {
    const questionIndex = parseInt(option.name.replace("question", ""));
    const selectedOption = option.value;
    progress[questionIndex] = selectedOption;
  });

  sessionStorage.setItem("progress", JSON.stringify(progress));
}

function submitQuiz() {
  saveProgress();

  const score = calculateScore();
  scoreElement.textContent = `Your score is ${score} out of 5.`;

  localStorage.setItem("score", score.toString());
}

function calculateScore() {
  const progress = sessionStorage.getItem("progress");
  if (!progress) {
    return 0;
  }

  const savedProgress = JSON.parse(progress);
  let score = 0;

  questions.forEach((question, index) => {
    const selectedOption = savedProgress[index];
    if (selectedOption === question.correctAnswer) {
      score++;
    }
  });

  return score;
}

renderQuiz();