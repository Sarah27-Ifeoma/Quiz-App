const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hypertext Markup Language", correct: true },
      { text: "Hyperlink Text Markup Language", correct: false },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyperlinking Text Module Language", correct: false }
    ]
  },
  {
    question: "Which CSS property controls the text size?",
    answers: [
      { text: "font-style", correct: false },
      { text: "text-size", correct: false },
      { text: "font-size", correct: true },
      { text: "text-style", correct: false }
    ]
  },
  {
    question: "Which JavaScript keyword is used to declare a variable?",
    answers: [
      { text: "let", correct: true },
      { text: "var", correct: true },
      { text: "const", correct: true },
      { text: "All of the above", correct: true }
    ]
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Cascading Style Sheets", correct: true },
      { text: "Creative Style System", correct: false },
      { text: "Computer Style Sheets", correct: false },
      { text: "Colorful Style System", correct: false }
    ]
  },
  {
    question: "Which HTML element is used to define the main heading?",
    answers: [
      { text: "<heading>", correct: false },
      { text: "<head>", correct: false },
      { text: "<h1>", correct: true },
      { text: "<h6>", correct: false }
    ]
  },
  {
    question: "What is the correct syntax to include an external JavaScript file?",
    answers: [
      { text: "<script src='file.js'>", correct: true },
      { text: "<script href='file.js'>", correct: false },
      { text: "<script link='file.js'>", correct: false },
      { text: "<script file='file.js'>", correct: false }
    ]
  },
  {
    question: "Which of these is a valid CSS unit?",
    answers: [
      { text: "px", correct: true },
      { text: "em", correct: true },
      { text: "rem", correct: true },
      { text: "All of the above", correct: true }
    ]
  },
  {
    question: "What does DOM stand for in JavaScript?",
    answers: [
      { text: "Document Object Model", correct: true },
      { text: "Data Object Management", correct: false },
      { text: "Digital Object Mapping", correct: false },
      { text: "Document Order Model", correct: false }
    ]
  },
  {
    question: "Which CSS property is used to change the background color?",
    answers: [
      { text: "color", correct: false },
      { text: "background-color", correct: true },
      { text: "bg-color", correct: false },
      { text: "background", correct: false }
    ]
  },
  {
    question: "Which JavaScript method is used to select an element by its ID?",
    answers: [
      { text: "getElementById()", correct: true },
      { text: "querySelector()", correct: false },
      { text: "getElementByClass()", correct: false },
      { text: "selectById()", correct: false }
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progressElement = document.getElementById("progress");

startQuiz();

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  progressElement.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer-btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hidden");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  if (correct) {
    score++;
  }
  setClassForAnswer(selectedButton, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setClassForAnswer(button, button.dataset.correct === "true");
    button.disabled = true;
  });
  nextButton.classList.remove("hidden");
}

function setClassForAnswer(element, correct) {
  clearClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  resetState();
  questionElement.innerText = `Quiz Complete! You scored ${score} out of ${questions.length}.`;
  nextButton.innerText = "Restart";
  nextButton.classList.remove("hidden");
  nextButton.addEventListener("click", startQuiz);
}
