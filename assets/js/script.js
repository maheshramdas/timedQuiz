var startQuizBtn = document.querySelector("#startQuiz");
var countEl = document.querySelector("#countDown");


var containerEl = document.querySelector(".container");
var buttonContainerEl = document.querySelector(".button-container");
var resultEl = document.querySelector(".result-container");
var score = 0;
var maxTime = 75;
var questionCount = 0;
var timeLeft = maxTime - 2;


// "questions" Object contains the javascript related Questionare with muliple choices and the correct answer 
var questions = [
  {
    question: "Commonly used datatype Do Not include: ",
    options: [
      "1. Strings",
      "2. Numbers",
      "3. Alerts",
      "4. Booleans"],
    answer: "3. Alerts"
  },
  {
    question: "Which of the following is correct about JavaScript?",
    options: [
      "1. Object-Based language",
      "2. Assembly-language",
      "3. Object-Oriented language",
      "4. High-level language"],
    answer: "3. Object-Oriented language"
  },
  {
    question: "Which object is the main entry point to all client-side JavaScript features and APIs?",
    options: [
      "1. Position",
      "2. Window",
      "3. Standard",
      "4. Location"],
    answer: "2. Window"
  },
  {
    question: "Which of the following is not an error in JavaScript?",
    options: [
      "1. Missing of Bracket",
      "2. Division by zero",
      "3. Syntax error",
      "4. Missing of semicolons"],
    answer: "2. Division by zero"
  },
  {
    question: "Array is javascript can be used to store ___________.",
    options: [
      "1. Other arrays",
      "2. Numbers",
      "3. Strings",
      "4. All of the above"],
    answer: "4. All of the above"
  }
];

/**
 * Attach event listener to start quiz
 * Start the timer
 * Update the page with the first question
 */
startQuizBtn.addEventListener("click", function () {

  countEl.textContent = "Time: " + maxTime;
  countdown();
  var paragraphEL = document.querySelector("#welcomeMessage");
  startQuizBtn.remove();
  paragraphEL.remove();
  containerEl.setAttribute("style", "text-align: left");
  var result = document.createTextNode("");
  updateQuestion(result);
});


/**
 * Function to handle the questionare
 * 
 * if questions are still present updates the page with next quextion
 * and result else updates the score page
 * @param {*} result 
 */

function updateQuestion(result) {

  resultEl.replaceChildren();
  buttonContainerEl.replaceChildren();

  var h1EL = document.querySelector("h1");
  if (questionCount < questions.length) {

    h1EL.textContent = questions[questionCount].question;

    for (var i = 0; i < questions[questionCount].options.length; i++) {
      var optionABtn = document.createElement("button");
      var br = document.createElement("br");
      optionABtn.textContent = questions[questionCount].options[i];
      optionABtn.setAttribute("style", "width: 100%");
      buttonContainerEl.appendChild(optionABtn);
      buttonContainerEl.appendChild(br);
      resultEl.appendChild(result);
    }

  } else {
    scorePage();
  }

}

/**
 * Update the page with final score 
 */
function scorePage() {

  containerEl.replaceChildren();

  var h1EL = document.createElement("h1");
  h1EL.textContent = "All Done!";
  containerEl.appendChild(h1EL);

  var pEL = document.createElement("p");
  pEL.setAttribute("id", "scorePage");

  pEL.textContent = "Your final score is " + score + ".";
  containerEl.append(pEL);

  var pEL2 = document.createElement("p");
  pEL2.setAttribute("style", "display:inline-block");
  pEL2.setAttribute("id", "scorePage");
  pEL2.textContent = "Enter initials: ";
  containerEl.append(pEL2);

  var submit = document.createElement("input");
  submit.setAttribute("id", "textboxid");
  submit.type = "value";
  containerEl.append(submit);

  var submitBtn = document.createElement("button");
  submitBtn.textContent = "Submit";
  containerEl.append(submitBtn);

}
 
/**
 * Attach event listener to check if any options for the given question is clicked
 * 
 */
buttonContainerEl.addEventListener("click", function (event) {
  var element = event.target;
  var result = document.createElement("h2");

  if (element.matches("button")) {
    var selectedOption = element.textContent;
    if (selectedOption == questions[questionCount].answer) {
      result.textContent = "Correct!";
      score = score + 10;
    } else {
      result.textContent = "Wrong!";
      score = score - 2;
      timeLeft = timeLeft - 10;
      countEl.textContent = "Time: " + timeLeft;
    }
    questionCount = questionCount + 1;
    updateQuestion(result);
  }
});

// Attach event listener to check if submit button is clicked
containerEl.addEventListener("click", function (event) {
  var element = event.target;
  if (element.matches("button")) {
    var selectedOption = element.textContent;
    if (selectedOption == "Submit") {

      var initials = document.getElementById("textboxid").value;

      updateHighScores(initials);
      var h1EL = document.createElement("h1");
      h1EL.textContent = "High scores";
      containerEl.replaceChildren();
      containerEl.appendChild(h1EL);


      var initialstBtn = document.createElement("div");
      initialstBtn.setAttribute("id", "highScoresDiv");
      initialstBtn.textContent = getHighScoresFromLocalStorage();
      containerEl.append(initialstBtn);

      var goBacktBtn = document.createElement("button");
      goBacktBtn.textContent = "Go back";
      containerEl.append(goBacktBtn);

      var clearBtn = document.createElement("button");
      clearBtn.textContent = "Clear high scores";
      containerEl.append(clearBtn);
    } else if (selectedOption == "Go back") {
      location.reload();
    }else if (selectedOption == "Clear high scores") {

      var highScoretxt = document.getElementById("highScoresDiv");
      highScoretxt.textContent = "\n";
      localStorage.clear();
    }
  }
});

/**
 * Retrives the top 2 scores from local storage
 */
function getHighScoresFromLocalStorage() {

  var firstScore = localStorage.getItem("firstScore");
  var firstName = localStorage.getItem("firstName");

  var highScores = "1. "+ firstName + " - " + firstScore;
  if (localStorage.getItem("secondScore") !== null) {

    var secondScore = localStorage.getItem("secondScore");
    var secondName = localStorage.getItem("secondName");
    highScores = highScores + "\r\n" + "2. "+ secondName + " - " + secondScore;
  }
  return highScores;
}
/**
 * Updates the top 2 high scores to localStorage
 * @param {*} name 
 * 
 */
function updateHighScores(name) {

  if (localStorage.getItem("firstScore") === null) {
    localStorage.setItem('firstScore', score);
    localStorage.setItem('firstName', name);

  } else if (score > localStorage.getItem("firstScore")) {

    var firstscore = localStorage.getItem("firstScore");
    var firstName = localStorage.getItem("firstName");

    localStorage.setItem('firstScore', score);
    localStorage.setItem('firstName', name);

    localStorage.setItem('secondScore', firstscore);
    localStorage.setItem('secondName', firstName);

  } else if ((localStorage.getItem("secondScore")=== null) || (score > localStorage.getItem("secondScore") )){
    localStorage.setItem('secondScore', score);
    localStorage.setItem('secondName', name);
  }
}

function countdown() {


  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {

    if (questionCount == questions.length) {
      //Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
    } else if (timeLeft > 0) {
      // Set the `textContent` of `countEl` to show the remaining seconds
      countEl.textContent = "Time: " + timeLeft;
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `countEl` to an empty string
      countEl.textContent = "Time: " + "0";
      //Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      scorePage();
    }
  }, 1000);
}









