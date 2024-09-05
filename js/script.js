// Declaração das variaáveis
const question = document.querySelector('#question');
const answersBox = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quizz-container');
const scoreContainer = document.querySelector('#score-container');
const letters = ["a", "b", "c","d"];
let points = 0;
let actualQuestion = 0;

//Perguntas
const questions = [
    {
        "question": "Quantas armas Mika consegue usar?",
        "answers":[
            {
                "answer": "1",
                "correct": false
            },
            { 
                "answer": "2",
                "correct": false
            },
            {
                "answer": "3",
                "correct": true
            },
            {
                "answer": "4",
                "correct": false         
            }
        ]  
    
    },
    {
        "question": "Quantos Aranaras podemos encontram na quest deles?",
        "answers":[
            {
                "answer": "57",
                "correct": false
            },
            { 
                "answer": "88",
                "correct": false
            },
            {
                "answer": "76",
                "correct": true
            },
            {
                "answer": "43",
                "correct": false         
            }
        ]  
    },
    {
        "question": "Quantas vezes a camara de jade foi dentruida?",
        "answers":[
            {
                "answer": "0",
                "correct": false
            },
            { 
                "answer": "2",
                "correct": false
            },
            {
                "answer": "1",
                "correct": true
            },
            {
                "answer": "3",
                "correct": false         
            }
        ]  
    },
    {
        "question": "Em quantas quests de arconte Signora apareceu?",
        "answers":[
            {
                "answer": "4",
                "correct": false
            },
            { 
                "answer": "2",
                "correct": false
            },
            {
                "answer": "3",
                "correct": true
            },
            {
                "answer": "1",
                "correct": false         
            }
        ]  
    }
]

// Substituição do quizz para a primeira pergunta
function init(){
    // criar a primeira pergunta
    createQuestion(0);
}

//Cria uma pergunta
function createQuestion(i){

   // Limpar a questão anterior
   const oldButtons = answersBox.querySelectorAll("button");

   oldButtons.forEach(function(btn){
     btn.remove();
   });

   // Alterar o texto da pergunta
   const questionText = question.querySelector('#question-text');
   const questionNumber = question.querySelector('#question-number');

   questionText.textContent = questions[i].question;
   questionNumber.textContent = i + 1;

   // Insere as alternativas
   questions[i].answers.forEach(function(answer, i){
      
      // Criar o template do botão do quizz  
      const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

      const letterBtn = answerTemplate.querySelector(".btn-letter");
      const answerText = answerTemplate.querySelector(".question-answer");

      letterBtn.textContent = letters[i];
      answerText.textContent = answer['answer'];

      answerTemplate.setAttribute("correct-answer", answer["correct"]);

      // Remover hide e template class
      answerTemplate.classList.remove("hide");
      answerTemplate.classList.remove("answer-template");

      // Inseri a alternativa na tela
      answersBox.appendChild(answerTemplate);

      // Inserir um evento de click no botão
      answerTemplate.addEventListener("click", function(){
        checkAnswer(this);
      });

   });

   // Incrementar o número da questão
   actualQuestion++;

}

// Verifica resposta do usúario
function checkAnswer(btn){

    // Selecionar todos os botões
    const buttons = answersBox.querySelectorAll("button");

    // Verifica se a resposta está correta e adciona classes nos botões
    buttons.forEach(function(button) {

        if(button.getAttribute("correct-answer") === "true"){

            button.classList.add("correct-answer");

            // Checa se o usúario acertou a pergunta 
            if(btn == button){
              // Incremento dos pontos
              points++;
            }

        }else{

            button.classList.add("wrong-answer");

        }
      
    });

    // Exibir próxima pergunta
    nextQuestion();

}

// Exibe a proxima pergunta no quizz
function nextQuestion(){

  // Timer para o usúario ver as respostas
  setTimeout(function(){
   
   // Verifica se ainda há perguntas
   if(actualQuestion >= questions.length){
    // Apresenta a mensagem de sucesso
    showSuccessMessage();
    return;
   }

   createQuestion(actualQuestion);

  }, 1500);

}

// Exibe a tela final
function showSuccessMessage() {

 hiderOrShowQuizz();

  // Trocar dados da tela  de sucesso

  // calcular o score
  const score = ((points / questions.length) * 100).toFixed(2);

  const displayScore = document.querySelector("#display-score span")

  displayScore.textContent = score.toString();

  // Alterar o número de perguntas corretas
  const correctAnswers = document.querySelector("#correct-answers");
  correctAnswers.textContent = points;

  // Alterar o total de questions
  const totalQuestions = document.querySelector("#questions-qty");
  totalQuestions.textContent = questions.length;

}

// Mostra ou esconde o score
function hiderOrShowQuizz(){
    quizzContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");
}

// Reiniciar Quizz
const restartBtn = document.querySelector('#restart');

restartBtn.addEventListener("click", function(){

  // Zerar o jogo
  actualQuestion = 0;
  points = 0;
  hiderOrShowQuizz();
  init();

})

// Inicialização do Quizz
init();
