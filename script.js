const questions = [
    {
        question: "Which Club has the most champions leagues",
        answers: [
            {text: "Bayern munchen", correct: false},
            {text: "Real Madrid", correct: true},
            {text: "Barcelona", correct: false},
            {text: "Milan", correct: false},
        ]

    },
    {
         question: "Who Scored 91 Goals in 2012",
        answers: [
            {text: "Messi", correct: true},
            {text: "Cristiano Ronaldo", correct: false},
            {text: "Kaka", correct: false},
            {text: "Samuel eto", correct: false},
        ]
    },
    {
          question: "Which Nation has 2 world cups exactly",
        answers: [
            {text: "Spain", correct: false},
            {text: "Netherlands", correct: false},
            {text: "England", correct: false},
            {text: "France", correct: true},
        ]
    },
    {
          question: "Which Club does Memphis Depay play for today",
        answers: [
            {text: "Lyon", correct: false},
            {text: "Corinthians", correct: true},
            {text: "Al Hilal", correct: false},
            {text: "Atletico Madrid", correct: false},
        ]
    },
    {
          question: "Which Club won the 2012 Champions league",
        answers: [
            {text: "Bayern munchen", correct: false},
            {text: "Chelsea", correct: true},
            {text: "Borussia Dortmund", correct: false},
            {text: "Inter milan", correct: false},
        ]
    },
    {
          question: "Which club has won the most national titles in italy",
        answers: [
            {text: "Napoli", correct: false},
            {text: "Milan", correct: false},
            {text: "Inter Milan", correct: false},
            {text: "Juventus", correct: true},
        ]
    },
    {
          question: "Who won the ballon dor in 2007",
        answers: [
            {text: "Kaka", correct: true},
            {text: "Cristiano Ronaldo", correct:false },
            {text: "Lionel Messi", correct: false}, 
            {text: "Zinedine Zidane", correct: false},
        ]
    },
    {
          question: "which of the clubs are actual rivals",
        answers: [
            {text: "Borussia dortmund x Shalke 04", correct: true},
            {text: "fulham x brentford", correct: false},
            {text: "Inter milan x Napoli", correct: false},
            {text: "Monaco x Nice", correct: false},
        ]
    },
    {
          question: "Which country was the 2010 world cup played at",
        answers: [
            {text: "United states", correct: false},
            {text: "South Africa", correct: true},
            {text: "Brazil", correct: false},
            {text: "France", correct: false},
        ]
    },
    {
          question: "Whats the name of Corinthians stadium",
        answers: [
            {text: "Alliaz Parque", correct: false},
            {text: "Beira rio", correct: false},
            {text: "Neo quimica Arena", correct: true},
            {text: "Morumbis", correct: false},
        ]
    }
 ];
 
 const questionElement = document.getElementById("question");
 const answerButtons = document.getElementById("answer-buttons");
 const nextButton = document.getElementById("nxt-btn");
 

let currentQuestionIndex = 0
let score = 0

function shuffle(array){
    for( let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random()*(i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startQuiz(){
    shuffle(questions);
    currentQuestionIndex = 0;
    score = 0
    nextButton.innerHTML = "Next"
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = questionNo + " . " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
};

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    } 
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}


function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex ++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
    
})

startQuiz();

