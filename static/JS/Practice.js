
const question_number_label = document.getElementById('question_number_label');
const question_label = document.getElementById('question_label');
const question = document.getElementById('question');
const quizContainer = document.getElementById('quiz-container');
const scoreboard = document.getElementById('scoreboard_container');
const answerBank_Container = document.querySelector('#answerBank');
const allQuestionsBank = document.querySelector('#all_questions');
const score_title = document.getElementById('score_title');
const score_label = document.getElementById('score_label');
const inputs = document.querySelectorAll('input');
let stat = document.getElementById('stat');
const answers_button = document.getElementById('check-answer');
const img = document.getElementById('score-img');
const input_score = document.getElementById('score');
const form = document.getElementById("quiz-form");
const answers = document.getElementById("answers");


let options= [];
for (let i = 0; i < 4; i++){
    options[i] = document.getElementById(`option${i}`);
}
const total_questions = 6; 
let questions;
let questionBank = [];
let answers_bank = [];
let definition_bank = [];
let user_Practice = [];
let removed_options = [];
let opt1;    
let opt2;    
let opt3;    
let index;
let i = 0;
let score = 0;



//display the questions
const displayQuestion =  () => {
    inputs.forEach(input => {
        input.style.background ='none'
    });

    question_number_label.innerHTML = `Question ${(i+1)} :`;
    question_label.innerHTML = `${questionBank[i].q}`;
    question.value = `${questionBank[i].q}`;
    

    for (let opt = 0; opt< options.length; opt++){
        options[opt].value = questionBank[i].o[opt]
    }
    stat.innerHTML= `Question ${(i+1)} out of ${total_questions}`;
    return;
}


//function to calculate the score and indicate if user is right or wrong
const calcScore =  (user_ans) => {
    const user_answer = user_ans.value;
    if(user_answer===questionBank[i].a && score<total_questions){
        score +=1;
        user_ans.style.background= 'limegreen';
        
        user_Practice.push({
            user_q: questionBank[i].q,
            user_a: user_answer,
            real_a: questionBank[i].a,
            user_s: 1
        });

        input_score.value = 1;

    }else{
        user_ans.style.background= 'red';
        
        user_Practice.push({
            user_q: questionBank[i].q,
            user_a: user_answer,
            real_a: questionBank[i].a,
            user_s: 0
        });
        input_score.value = 0;
    }
    setTimeout(nextQuestion,300);
}


// set image for the scoreboard
const getImage = () => {
    score = Math.round((score/total_questions)*100);
    if(score < 50){
        img.src = '/ICONS/sorry.jpeg';
    }else if(score < 70){
        img.src = '/ICONS/goodjob.jpeg';
    }else {
        img.src = '/ICONS/excellent.jpeg';
    }
    img.style.visibility = 'visible';
}

//function to display next question
const nextQuestion = () => {
    if(i + 1 < total_questions){
        i+=1;
        displayQuestion();
    }else{
        getImage();
        score_label.innerHTML= score;
        quizContainer.classList.add('hide');
        scoreboard.classList.remove('hide');
        updateTable();
    }
}

//function to check answers
const checkAnswer = function (){
    answerBank_Container.classList.remove('hide');

}

document.addEventListener("DOMContentLoaded", () => {
    //disable nav bar
    const nav = document.querySelector('nav')
    nav.style.display = 'none';
    
    //hide containers
    allQuestionsBank.classList.add('hide');
    scoreboard.classList.add('hide');
    answerBank_Container.classList.add('hide');
    input_score.classList.add('hide');
    question.classList.add('hide');


    //set quiz
    get_Questions();

    //show first question
    displayQuestion();
});



//get questions
const get_Questions = () => {
    //get all the questions
    questions = document.querySelectorAll('.practice_questions');

    //get all distinct answers
    questions.forEach( q => {
        ans = q.children[1].innerHTML;
        def = q.children[2].innerHTML;
        if(!answers_bank.includes(ans)){
            answers_bank.push(ans);
            definition_bank.push(def);
        }
    });
    set_Questions();
}

//set practice questions
const set_Questions = () => {
    for (let q = 0; q<total_questions; q++){
        quest = questions[q].children[0].innerHTML;

        if(quest.includes('definition')){
            ans = questions[q].children[2].innerHTML;
            [opt1,opt2,opt3] = getThreeOptions(definition_bank, ans);            
        }else{
            ans = questions[q].children[1].innerHTML;
            [opt1,opt2,opt3] = getThreeOptions(answers_bank, ans);
        }
        
        questionBank.push({
            q: quest,
            o: [ans, opt1, opt2, opt3].sort( () => { return Math.random() - 0.5}),
            a: ans
        });
    }
}


//get options
const getThreeOptions = (arr, ans) => {
    index = arr.indexOf(ans);
    arr.splice(index,1);
 
    let shuffledAnswers = arr.sort( () => { return Math.random() - 0.5});
    let threeOptions = shuffledAnswers.slice(0, 3);
    return threeOptions;
}

//return to home page
const HomePage = () =>{
    window.location.href = "/MainPage";
}
//try another practice
const QuizPage = () =>{
    window.location.href = "/Practice";
}


//update answers table after the practice is done
const updateTable = () => {
    // Get reference to the table body
    var tableBody = document.getElementById("this_practice_questions");

    // Clear the existing content of the table
    tableBody.innerHTML = "";

    // Loop through the data array
    for (var i = 0; i < user_Practice.length; i++) {
        // Create a new table row
        var newRow = document.createElement("tr");

        // Add the question to the first column
        var questionColumn = document.createElement("td");
        questionColumn.innerHTML = user_Practice[i].user_q;
        newRow.appendChild(questionColumn);

        // Add the answer to the second column
        var answerColumn = document.createElement("td");
        answerColumn.innerHTML = user_Practice[i].user_a;
        newRow.appendChild(answerColumn);

        // Add the answer to the second column
        var realAnswerColumn = document.createElement("td");
        realAnswerColumn.innerHTML = user_Practice[i].real_a;
        newRow.appendChild(realAnswerColumn);

        // Add the score to the third column
        var scoreColumn = document.createElement("td");
        scoreColumn.innerHTML = user_Practice[i].user_s;
        newRow.appendChild(scoreColumn);

        // Add the new row to the table
        tableBody.appendChild(newRow);
    }
}