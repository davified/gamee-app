// set timeout for wrong popup message.
/* global $ */
function Question (qn, options, answerIndex, factMsg) {
  this.qn = qn
  this.options = options
  this.answerIndex = answerIndex
  this.factMsg = factMsg
}

// using the new keyword and the constructor we can create questions for the quiz
var question1 = new Question('What can you do to raise your metabolism rate?', ["You can't change your metabolism rate", 'Build greater muscle mass', 'Eat lesser oily food', 'Drink yuzu tea'], 1, 'Staying fit is the best way to raise your metabolism rate because you use more energy when you have greater muscle mass. Put simply, the more you move about, the more calories you will burn.')

var question2 = new Question('Which of the options below is not an effective weight loss practice?', ['Skipping meals', 'Walking at least 10,000 steps a day', 'Having sufficient sleep', 'Eating well'], 0, 'Contrary to popular belief, skipping meals actually disrupts your metabolic rate and is not effective as a weight loss strategy. Eating well and sleeping early also lowers the desire for unhealthy snacks.')

var question3 = new Question('How long must you brisk-walk for before you can reap the health benefits of brisk-walking?', ["15 minutes a day", '30 minutes a day', '1 hour a day', '2 hours a day'], 1, 'Walking continuously for 30 minutes or more is best for fat-burning. It takes that long for the body to burn enough calories that it needs to release fat from your fat cells and use it for fuel. Walk most days of the week for at least 30 minutes to burn an extra 1000 to 3000 calories per week and to improve your metabolism each day.')

var question4 = new Question('Can you "work out" a cold or the flu?', ["Only if you're not too sick", 'Yes', 'A cold, but not the flu', 'No way!'], 2, 'If your symptoms are above the neck, including a sore throat, nasal congestion, sneezing, and tearing eyes, then it\'s OK to exercise," he says. "If your symptoms are below the neck, such as coughing, body aches, fever, and fatigue, then it\'s time to hang up the running shoes until these symptoms subside.')

var question5 = new Question('Which locations in Singapore are highest hit with Dengue?', ['Orchard','Kallang','Bukit timah','Marymount'], 3, 'Marymount has the highest number of dengue cases. If you live in the area, remember to take safety precautions')


// we can create an object to represent all of the settings and scores for the quiz
var quiz = {
  currentQuestion: 0,
  questions: [question1, question2, question3, question4, question5],
  isGameOver: false,
  score: 0
}

// numberOfQuestions should return an integer that is the number of questions in a game
function numberOfQuestions () {
  return quiz.questions.length
}

// currentQuestion should return an integer that is the zero-based index of the current question in the quiz
function currentQuestion () {
  return quiz.currentQuestion
}

// correctAnswer should return an integer that is the zero-based index the correct answer for the currrent question
function correctAnswer () {
  return quiz.questions[quiz.currentQuestion].answerIndex
}

// numberOfAnswers should return an integer that is the number of choices for the current question
function numberOfAnswers () {
  return quiz.questions[quiz.currentQuestion].options.length
}

// playTurn should take a single integer, which specifies which choice the current player wants to make. It should return a boolean true/false if the answer is correct.
function playTurn (choice) {
  if (quiz.isGameOver === true) {
    return false
  }
  var correct
  if (choice === correctAnswer()) {
    correct = true
    quiz.score++
  } else {
    correct = false
  }
  quiz.currentQuestion++

  if (quiz.currentQuestion === numberOfQuestions()) {
    quiz.isGameOver = true
  }
  return correct
}

// isGameOver should return a true or false if the quiz is over.
function isGameOver () {
  return quiz.isGameOver
}

// whoWon should return 0 if the game is not yet finished, 1 or 2 depending on which player won, else 3 if the game is a draw.
// function whoWon () {
//   if (quiz.isGameOver === false) return 0
//   if (quiz.score > quiz.player2Score) return 1
//   if (quiz.player2Score > quiz.score) return 2
//   else return 3
// }

// restart should restart the game so it can be played again.
function restart () {
  quiz.currentQuestion = 0
  quiz.score = 0
  quiz.isGameOver = false
}

// a function to update the display whenever the data changes
function updateDisplay () {
  if (isGameOver()) {

  } else {
    $('h1.question').text(quiz.questions[quiz.currentQuestion].qn)
    $('h2.answer').text(quiz.questions[quiz.currentQuestion].factMsg)
    // hard coded display, only has 4 answers at a time. Each is displayed as a button, so can use the order (eg) that they appear in the dom to select them
    $('button').eq(0).text(quiz.questions[quiz.currentQuestion].options[0])
    $('button').eq(1).text(quiz.questions[quiz.currentQuestion].options[1])
    if (quiz.questions[quiz.currentQuestion].options[2]) {
      $('button').eq(2).text(quiz.questions[quiz.currentQuestion].options[2])
    } else {
    }
    $('button').eq(3).text(quiz.questions[quiz.currentQuestion].options[3])
  }
}

// the jQuery ready function will add click listeners once the dom is loaded

function showCorrectPopup () {
  $('h2.message1').empty().append('Correct!!')
  $('h3.message2').empty().append((quiz.score + 1) * 10 + ' points! Keep it up!').addClass('correct')
  $('h2.factMsg').empty().append(quiz.questions[quiz.currentQuestion].factMsg)
  $('div.glyphicon').removeClass('glyphicon-remove').addClass('glyphicon-ok').removeClass('text-danger').addClass('text-success')
}

function showWrongPopup () {
  $('h2.message1').empty().append("Oops! You didn't get this one right")
  $('h3.message2').empty()
  $('h2.factMsg').empty().append(quiz.questions[quiz.currentQuestion - 1].factMsg)
  $('div.glyphicon').removeClass('glyphicon-ok').addClass('glyphicon-remove').removeClass('text-success').addClass('text-danger')
}

$(function () {
  $('button.option').click(function () {
    showCorrectPopup()
    if (!playTurn($(this).index())) {
      showWrongPopup()
    }
    updateDisplay()
  })
  updateDisplay()

  $('button.next').click(function() {
    if (isGameOver()) {
      window.location.href = 'score.html'
      setTimeout($('div#score_num').append(quiz.score), 1000)
    }
  })

  $('#winner_pop').click(function(){
    console.log('asdf')
  })
})
