//variables
var starting_bet;
var total_rolls = 0;
var max_amount_won;
var max_amount_roll = 0;
var played = false;

//Play button to play game!
document.getElementById("button").onclick = play;

//function to roll dice
function rollDice(numSides) {
  return Math.floor(Math.random() * numSides) + 1;
}

//function to validate input!
function validation() {
  if (starting_bet <= 0) {
    alert("Please input a number greater than 0!");
    document.getElementById("startingBet").value = "";
    return false;
  } else {
    return true;
  }
}

//function to play Lucky Sevens!
function play() {
  if (played == true) {
    reset();
    played = false;
  } else {
    starting_bet = parseInt(document.getElementById("startingBet").value);
    if (validation()) {
      var roll1;
      var roll2;
      var rollsum;
      var money = starting_bet;
      max_amount_won = starting_bet;
      while (money > 0) {
        roll1 = rollDice(6);
        roll2 = rollDice(6);
        rollsum = roll1 + roll2;
        if (rollsum == 7) {
          money += 4;
          total_rolls += 1;
        } else {
          money -= 1;
          total_rolls += 1;
        }
        if (money > max_amount_won) {
          max_amount_won = money;
          max_amount_roll = total_rolls;
        }
      }
      display();
      document.getElementById("startingBet").value = "";
      document.getElementById("button").innerText = "Reset";
      document.getElementById("startingBet").style.display = "none";
      document.getElementById("startingBetLabel").style.display = "none";
      played = true;
    }
  }
}
//function to display results!
function display() {
  document.getElementById("resultForm").style.display = "block";
  document.getElementById("sbResults").innerText = formatter.format(starting_bet);
  document.getElementById("trResults").innerText = total_rolls;
  document.getElementById("haResults").innerText = formatter.format(max_amount_won);
  document.getElementById("harResults").innerText = max_amount_roll;
}

//implement reset function! reset variables to zero, and form to the beginning display.
function reset() {
  document.getElementById("sbResults").innerText = "";
  document.getElementById("trResults").innerText = "";
  document.getElementById("haResults").innerText = "";
  document.getElementById("harResults").innerText = "";
  starting_bet = "";
  total_rolls = 0;
  max_amount_won = "";
  max_amount_roll = 0;
  document.getElementById("button").innerText = "Play";
  document.getElementById("resultForm").style.display = "none";
  document.getElementById("startingBet").style.display = "inline";
  document.getElementById("startingBetLabel").style.display = "inline";
}

//creating formatter object for number to currency translation.
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})
