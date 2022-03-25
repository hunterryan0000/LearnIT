let curr_problem = 1;
let curr_score = 0;
let answer; 

function updateProblemAndScore() {
    let problem = document.getElementsByClassName("currentProblem")[0];
    problem.innerText = curr_problem.toString();

    let score = document.getElementsByClassName("currentScore")[0];
    score.innerText = curr_score.toString();

    if(curr_problem <= 10) {
        newProblem();
    } else {
        let hide = document.querySelectorAll('.show-hide');
        
        hide.forEach(element => {
            element.style.display = "none";
            curr_problem = 10;
            problem.innerText = curr_problem.toString();
        })
    }
}

function start() {
    let answers = document.querySelectorAll("li");

    answers.forEach(element => {
        element.addEventListener("click", event => {
            let choice = element.innerText;

            if(choice.toString() === answer.toString()) {
                curr_score++;
            }

            
            curr_problem++;
            
            updateProblemAndScore();
        })
    });
}

function newProblem() {
    let left_operand = Math.floor(Math.random()*Math.floor(10));
    let right_operand = Math.floor(Math.random()*Math.floor(10));
    answer = left_operand * right_operand;
    updateDisplayProblem([left_operand, right_operand]);
}

function updateDisplayProblem(operands) {
    let displayProblem = document.getElementsByClassName("expression show-hide")[0];
    displayProblem.innerText = operands[0] + " * " + operands[1];

    let answers = document.querySelectorAll("li");

    let possibleAnswers = [];
    possibleAnswers.push(operands[0] * operands[1]);

    while(possibleAnswers.length < 4) {
        let choice = Math.floor(Math.random()*Math.floor(81));
        if(!possibleAnswers.includes(choice)) {
            possibleAnswers.push(choice);
        }
    }

    possibleAnswers = possibleAnswers.sort(function (a, b) {return Math.random() - 0.5});

    for(let i = 0; i < answers.length; i++) {
        answers[i].innerText = possibleAnswers[i];
    }
}

document.addEventListener("DOMContentLoaded", event => {
    start();
    newProblem(); 

    let startOver = document.getElementById("btnStartOver");
    startOver.addEventListener("click", event => {
        curr_problem = 1;
        curr_score = 0;
        updateProblemAndScore();
        newProblem();

        let show = document.querySelectorAll('.show-hide');
        
        show.forEach(element => {
            element.style.display = "block";
        });
    });
})