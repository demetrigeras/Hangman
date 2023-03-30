const letters = document.querySelectorAll(".letter");
const elkey = document.querySelector("#input");
const dashes = document.querySelector(".dashes");
const restartButton = document.querySelector(".Sng");
const wordboard = document.querySelector(".wordboard");
const underkb = document.querySelector(".underkb");
const alphletters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];

const selectedchar = [];

const url = "https://random-word-api.vercel.app/api?words=500";
let numguess = 6;
let randomWord = "";
let gameState = [];
let testword = getWord();

function lockkeys () {
  if (numguess == 0 || !gameState.includes(" _ "))  {
    elkey.removeEventListener("keydown", outputSubmit)
  }
}


function getWord() {
  fetch(url)
    .then((response) => response.json())
    .then((words) => {
      const randomIndex = Math.floor(Math.random() * words.length);
      randomWord = words[randomIndex];
      console.log(randomWord);
      return randomWord;
    })
    .then(() => {
      gameState = Array(randomWord.length).fill(" _ "); // ["_", "_", "_", "_", "_"])
      updateUI();
    })
    .catch((error) => console.error(error));
}

function allLetter(char) {
  if (alphletters.includes(char)) {
    return true;
  } else {
    return false;
  }
}

const outputSubmit = function (e) {
  elkey.value = "";
  if (allLetter(e.key)) {
  if (selectedchar.includes(e.key)) {
      console.log("You already pressed that!");
      underkb.innerHTML = "You already pressed that!"
      return;
    } else {
      selectedchar.push(e.key);
      // updateGameState(e.key);
    }

    for (let i = 0; i < letters.length; i++) {
      if (letters[i].dataset.letter.toLowerCase() === e.key) {
        if (updateGameState(e.key)) {
          letters[i].classList.add("correct");
        } else {
          letters[i].classList.add("wrong");
        }
      }
    }
  }
};

elkey.addEventListener("keydown", outputSubmit);
allLetter();

function updateGameState(userInput) {
  userInput = userInput.toLowerCase();
  randomWord = randomWord.toLowerCase();
  if (guesses(userInput)) {
    for (let i = 0; i < randomWord.length; i++) {
      if (randomWord[i] === userInput) {
        gameState[i] = userInput;
        underkb.innerHTML = "Letter Included!"
        
      }
    }
    updateUI();
    winner();

    return true;
  }
}

function restartGame() {
  
  window.location.reload();

  updateUI();
}

function updateUI() {
  dashes.innerText = gameState.join(""); // " _ _ _ _ _ _" This line adds the string to the div with the class .dashes
}

updateUI();

restartButton.addEventListener("click", restartGame);

function guesses(userInput) {
  let letterIncluded = randomWord.includes(userInput); // true or false

  if (!letterIncluded) {
    console.log("That letter is not inclued in the word");
    underkb.innerHTML = "That letter is not inclued in the word!"

    numguess--;

    if (numguess === 5) {
      document.querySelector(
        ".Hangman"
      ).style.backgroundImage = `url("./hangman6.png")`;
    }
    if (numguess === 4) {
      document.querySelector(
        ".Hangman"
      ).style.backgroundImage = `url("./hangman5.png")`;
    }
    if (numguess === 3) {
      document.querySelector(
        ".Hangman"
      ).style.backgroundImage = `url("./hangman4.png")`;
    }
    if (numguess === 2) {
      document.querySelector(
        ".Hangman"
      ).style.backgroundImage = `url("./hangman3.png")`;
    }
    if (numguess === 1) {
      document.querySelector(
        ".Hangman"
      ).style.backgroundImage = `url("./hangman2.png")`;
    }
    if (numguess === 0) {
      document.querySelector(
        ".Hangman"
      ).style.backgroundImage = `url("./hangman1.png")`;
    }

    //elkeys only
    //add body part from the hangman
  }

  if (numguess == 0) {
    underkb.innerHTML = "You Lose! The word was " + randomWord + "!";
    lockkeys ()
    console.log("You Lose");

    //document.querySelector(".Hangman").style.backgroundImage = `url("./firstpic.png")`
  }

  return letterIncluded;
}

function winner() {
  if (!gameState.includes(" _ ")) {
    underkb.innerHTML = "You Win!";
    lockkeys ()
    console.log("You Win");
  }
}
getWord();
//
//}

//create keyboard created!
//create a wordboard with dashes == word.length(create word class)
//** make test word
//create a hangman in 6 divs with each body part in html
//create a function in js if a letter is guessed incorrectly add 1 body part
//And to lower the guesses by 1, Number of guesses = 6 (add div class for number of guesses)
//add to the number of guesses function and say if 0 guess left player loses and man gets hung ;(
//create a function in js if the player guesses the lettter correctly, to add the letter to the word
//if the player gueesses the word correctly they win the game!
//**add an api to generate new words for  new each game *test with made word first
//Make this look pretty!
//
