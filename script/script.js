
// =================================
// 🌱 1. Sélection des éléments DOM
// =================================

const inputBox = document.querySelector(".input");
const submitBtn = document.querySelector(".submit");
const displayBox = document.querySelector(".display"); 
const popUpDisplay = document.querySelector(".pop-up-display");


// =================================
// 🧠 2. Variables globales / état
// =================================

const secretWordsA = ["APOLLO", "ARTEMIS", "CHAOS", "CHRONOS", "GAIA"]; // 1. Creation of a list of 5 words for the player to guess.       

let chosenWordA = chooseWord(secretWordsA); // 2. Calling of the function choosing a random word from the list.

let hiddenChosenWordA = createHiddenWord(chosenWordA); // 3. Catching into a variable of the function creating a representation of the chosen word, with hidden letters as underscores.

let lives = 6; // 4. Determination of the amount of lives / attempts allowed.

let inputLettersA = []; // 5.0. Creation of an empty array containing the letters already tried by the player. 

let inputLetterValue; // 5.1. Initialization of the variable that will contain the input letter.


// =================================
// 🎊 3. Fonctions (logique métier)
// =================================


function chooseWord(secretA) // 6. Creation of a function picking a word from the list.
{
  let chosenWordIndex = (Math.floor(Math.random() * (secretA.length))); // 6.1. Random choice of a word from the list.      
  
  let secretW = secretA[chosenWordIndex]; // 6.2. Capture of the chosen word into a variable.                   
  
  return secretW
}

function createHiddenWord(secretW)  // 7. Creation of a function representing the chosen word, with hidden letters as underscores.                 
{
  let hidden = [];                   
  
  for(let i = 0; i < secretW.length; i++)     
    {
    
    hidden.push("_");                                       
    
  } 
  return hidden
} 


function isLetter(input) // 9. Creation of a function verifying that the player entered indeed a letter.
{ 
  let letter = input.charCodeAt(0) > 64 && input.charCodeAt(0) < 91;
  
  return letter;
} 

function checkLetter(input, secret, hidden, inputList) // 10. Creation of a function verifying that the letter entered matches a letter in the word. 
{
  let found = false;
  
  for(let i = 0; i < secret.length; i++)  
    {
    if(secret[i] === input)
      {
      found = true;
      hidden[i] = secret[i]; 
    }
  }
  
  if (!found) 
    {   
    if (inputList.includes(input))           
      {
      lives--;       
      
      popUpDisplay.innerHTML = `<b>Nope! Be careful... She's coming for ya.</b>`; 
      
    } else 
      {
      inputList.push(input);
    }
  }
}


// !!!!!!!!!!!!!!!!! DISPLAY FUNCTION !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function displayGameState(hidden, lives, input) // 8. Creation of a function displaying the current state of the game to the player.
{ 
  displayBox.innerHTML = `<div> - Word to guess: - ${hidden.join(' ')} </div>
  
                            <div> - You are ${lives} step(s) closer to death! </div>
  
                            <div> - Letters already tried: ${input}</div>
                            <div class="img-battewoman"><img src=https://media.s-bol.com/Y9VLLGQMNgrO/31956Xx/550x759.jpg   alt="battewoman"> </img> <div>`
  
  
}

// =================================
// 🧲 4. Événements (interactions)
// =================================

const myDisplay = document.createElement('div'); // Creation of a display area.

displayGameState(hiddenChosenWordA, lives, inputLettersA); // Calling the function to display the current state of the game.

submitBtn.addEventListener('click', ()  => { // When the player clicks the button...
  
  let inputLetterValue = inputBox.value.toUpperCase().trim(); //  Asking the player to enter a letter, catching the input's value into a variable. 
  
  let checkInputLetter = !isLetter(inputLetterValue); // Calling the function checking if the input is not a letter, and if not, ask again. 
  
  
  if(inputLetterValue === "") // If the input is void, asking the player to enter a letter. 
  {    
    popUpDisplay.innerHTML = "C'mon: ONE.LETTER.";    
    
  } else if(!isNaN(inputLetterValue) || checkInputLetter || inputLetterValue.length !== 1) // Checking if the input is a valid letter (not a number, an empty string, or another ASCII character)..
  {  
    popUpDisplay.innerHTML = "<b>ONE letter ONLY - from the English alphabet. You can do this, pal :]</b>";
    
  } else { 
    
    
    if(inputLettersA.includes(inputLetterValue)) 
      { 
      popUpDisplay.innerHTML = `<b>FOCUS, pal! You've already tried the letter ${inputLetterValue}...</b>`; 
      
    } else {
      
      inputLettersA.push(inputLetterValue); // If it's a new letter, adding the new letter to the letters already tried.   
    }
    
    checkLetter(inputLetterValue, chosenWordA, hiddenChosenWordA, inputLettersA); //Calling the function verifying that the letter entered matches a letter in the word.
    
  }
  
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! FIX THIS PART 🛎️🛎️🛎️🛎️🛎️🛎️
  
  
  
  inputBox.value = ""; // Emptying of the input box.
  
  inputBox.focus(); // Focusing cursor on the text area of the input box.
  
  
  
  
  myDisplay.classList.add('game-state'); 
  
  displayBox.appendChild(myDisplay);
  
  //  ================================ OK ================
  
  displayGameState(hiddenChosenWordA, lives, inputLettersA); // Calling the function to display the current state of the game.
  
});

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! FIX THIS PART 🛎️🛎️🛎️🛎️🛎️🛎️

function checkVictory(lives) // 16. Creation of a function verifying if the player won or lost the game.
{ 
  if(lives > 0 && hiddenChosenWordA.indexOf('_') !== -1)  
    {
    
    popUpDisplay.innerHTML = `C0ngr4tZ! You found the word (${chosenWordA}) AND are still alive - Lives left: ${lives}!`;
    
  } else 
    {
    
    popUpDisplay.innerHTML = `G4m3 0v4... 
      
                           U = dead. 
    
                           The word was: ${chosenWordA}. 
    
                           But who's gonna care now, hm?`; 
  }
}


// const endingGame = () => { // 14. Creation of an arrow function ending the game.


checkVictory(lives); // 17. Calling the function verifying if the player won or lost the game.



// checkVictory(lives); // 17. Calling the function verifying if the player won or lost the game.

// endingGame(); // 18. Calling the function ending the game.



// goodGame(); // Launching the game.


// !!!!!!!!!!!!!!!!!!!!!! A IMPLEMENTER   ⚡⚡⚡⚡⚡


// - mise en place de la délégation d’événement  - utilisation de closest() ou matches()

// temp display for pop up

// main game loop

// EVENT LISTENER CLAVIER