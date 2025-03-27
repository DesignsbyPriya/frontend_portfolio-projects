// Question Bank
const questions = [
   {
     question: "Which country will host the 2026 FIFA World Cup?",
     options:["Qatar","Canada,USA & Mexico","Germany","Australia"],
     answer: 1
   }, 
   
   {
     question: "Who won the Best Actor Oscar in 2025",
     options:["Leonardo DiCaprio","Timothée Chalamet","Tom Holland","Cillian Murphy"],
     answer: 3
   },  

   {
     question: "Which Indian cricketer recently scored the fastest century in T20 international cricket",
     options:["Virat Kohli", "Shubhnam Gill", "Rohit Sharma", "Suryakumar Yadav"],
     answer: 3
   },  

   {
     question: "The theme for World Environment Day 2025 is:",
     options:["Beat Plastic Pollution", " Restore Our Earth", "Save Biodiversity", " Water for All"],
     answer: 1
   },  

   {
     question: " A clock shows 3:15. What is the angle between the hour and minute hand?",
     options:["7.5°", "15°", "30°", "37.5°"],
     answer: 0
   }    
];

// Initial Variables
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timer;
const totalQuestions = questions.length;

// DOM Elements
const questionEl = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result-text");
const restartBtn = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress-bar");
const timerEl = document.getElementById("time-left");

// Load Questions
function loadQuestion(){
   resetState();
   const currentQuestion = questions[currentQuestionIndex];
   questionEl.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

   currentQuestion.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.innerText = option;
      button.addEventListener("click", () => checkAnswer(index));
      optionsContainer.appendChild(button);
   });

// Reset Timer
timeLeft = 30;
timerEl.innerText = timeLeft;
startTimer();
updateProgressBar();
}

// Start Timer
function startTimer(){
   clearInterval(timer);
   timer = setInterval(() => {
      timeLeft--;
      timerEl.innerText = timeLeft;

      if(timeLeft === 0){
        clearInterval(timer);
        showNextQuestion();
      }
   }, 1000); 
}

// check Answer
function checkAnswer(selectedIndex){
   const correctAnswer = questions[currentQuestionIndex].answer;
   if(selectedIndex === correctAnswer){
      score++;
   }
   showNextQuestion();
}

// Show Next Question or Result
function showNextQuestion(){
    currentQuestionIndex++;
    if(currentQuestionIndex < totalQuestions){
        loadQuestion(); 
    }else{
        clearInterval(timer);
        showResult();
    }
}

// Show Result
function showResult(){
  questionEl.innerText = "";
  optionsContainer.innerHTML = "";
  nextBtn.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  resultText.innerText = `You scored ${score} out of ${totalQuestions}! 🎉`;  
}

// Restart Quiz
restartBtn.addEventListener("click", () => {
    resetQuiz();
    loadQuestion();
});

// Reset State
function resetState(){
    nextBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    optionsContainer.innerHTML = "";
}

// Reset Quiz 
function resetQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    resetState();
    nextBtn.classList.remove("hidden");
}

// Update ProgressBar
function updateProgressBar(){
    const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

// Intialize Quiz
loadQuestion();
