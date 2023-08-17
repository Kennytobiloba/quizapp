const  quiz= [
    {
        q:'which month comes right before june',
        options:["may","september","july","august"],
        answer:0
    },
    {
        q:'what color is bananna?',
        options:["red","yellow","white","blue"],
        answer:3
    },
    {
        q:'3 + 4 = 7',
        options:["true","False"],
        answer:0
    },
    {
        q:'what time of the day do we have breakfast',
        options:["in the afternoon","in the evenig", "in the morning"],
        answer:2
    },
    {
        q:'22 + 6 =  ?',
        options:["99","56","16","28"],
        answer:3
    },
    {
        q:'28 + 6 =  ?',
        options:["99","56","16","34"],
        answer:3
    }
]
const questionNumber =document.querySelector(".question-number");
const questionText =document.querySelector(".question-text");
const optionContainer =document.querySelector(".option-container");
const answersIndicatorContainer =document.querySelector(".answers-indicator");
const homebox = document.querySelector(".home-box");
const quizbox = document.querySelector(".quiz-box");
const resultbox = document.querySelector(".result-box");
let questionCounter = 0;
let currentQuestion;
let availableQuestion = []
let availableOptions =[]
let currentAnswer = 0;
let attempt = 0;


 function setAvailablequestions(){
    const totalQuestion = quiz.length
    for(let i=0; i < totalQuestion; i++){
        availableQuestion.push(quiz[i])

    }
   

 }
 function getNewQuestion(){
    
    questionNumber.innerHTML ="Question " +  ( questionCounter + 1) + " of " + quiz.length;
     const questionIndex = availableQuestion[Math.floor(Math.random()* availableQuestion.length)]
     currentQuestion = questionIndex;
     questionText.innerText = currentQuestion.q;
     console.log(questionIndex)
     
     const index1= availableQuestion.indexOf(questionIndex);
     availableQuestion.splice(index1,1 );
    //  
    const optionLength = currentQuestion.options.length;
    for (let i = 0; i < optionLength; i++) {
        availableOptions.push(i)
        
    }
    optionContainer.innerHTML = ""
    let animationDelay = 0.5;
    for (let i = 0; i < optionLength; i++) {
        
        const optionIndex = availableOptions[Math.floor(Math.random()* availableOptions.length)];
        const index2 = availableOptions.indexOf(optionIndex)
        availableOptions.splice(index2,1);
        const option = document.createElement("div")
        option.innerHTML = currentQuestion.options[optionIndex]
        option.style.animationDelay = animationDelay + "s";
        animationDelay = animationDelay + 0.5;
        option.id = optionIndex;
        option.className ="option"
        optionContainer.appendChild(option)
        option.setAttribute("onclick","getResult(this)");
   
 }
    // console.log(currentQuestion.options)
     questionCounter++
    
   }
   function getResult(element){
    const id = parseInt(element.id);
    console.log(typeof id)
    if (id === currentQuestion.answer){
      element.classList.add("correct");
      updateAnswerIndicator("correct") 
      currentAnswer++;
      console.log("correct:" + currentAnswer)
   }
else{
    element.classList.add("wrong");
    updateAnswerIndicator("wrong");
    const optionLens = optionContainer.children.length;
    for (let i = 0; i < optionLens; i++){
        if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
           optionContainer.children[i].classList.add("correct")
        }

    }
}
attempt++;
  onclickableOptions()
}
    
    function onclickableOptions(){
        const optionlen = optionContainer.children.length;
        for (let i = 0; i < optionlen.loptionlen; i++) {
            optionContainer.children[i].classList.add("already-answered");
        }
    }
   
    function answerIndicator(){
        answersIndicatorContainer.innerHTML ="";
        const totalQuestion = quiz.length;
        for (let i=0; i<totalQuestion; i++) {
            const indicator = document.createElement("div");
            answersIndicatorContainer.appendChild(indicator);

            }
        }
     function updateAnswerIndicator(markType) {
        answersIndicatorContainer.children[questionCounter-1].classList.add(markType);

        

     }   
    
   function next(){
    if(questionCounter === quiz.length ){
        console.log("quiz over")
        quizOver();
    }
    else{
        getNewQuestion();
    }
   }
   function quizOver(){
    quizbox.classList.add("hide");
    resultbox.classList.remove("hide");
    quizResult()

   }
   function quizResult(){
    resultbox.querySelector(".total-question").innerHTML = quiz.length 
    resultbox.querySelector(".total-attempt").innerHTML = attempt;
    resultbox.querySelector(".total-correct").innerHTML = currentAnswer
    resultbox.querySelector(".total-wrong").innerHTML = attempt - currentAnswer;
    const percentage = (currentAnswer/quiz.length)*100;
    resultbox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultbox.querySelector(".total-score").innerHTML = currentAnswer + "/" + quiz.length;
   }
   function resetQiz(){
    questionCounter = 0;
     currentQuestion;
     attempt = 0

   }
 
   function tryAgain(){
    resultbox.classList.add("hide");
    quizbox.classList.remove("hide");
    resetQiz();
    startQuiz()

   }
   function goToHome(){
    resultbox.classList.add("hide");
    homebox.classList.remove("hide");
    resetQiz();
   }
   function startQuiz(){
    homebox.classList.add("hide");
    quizbox.classList.remove("hide")
    setAvailablequestions();
    getNewQuestion();
    answerIndicator()

   }
window.onload = function (params) {
    setAvailablequestions()
    getNewQuestion()
    answerIndicator()
    
    
}
window.onload = function(){
    homebox.querySelector(".total-question").innerHTML = quiz.length

}