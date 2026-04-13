
// =================================
// 🌱 1. Sélection des éléments DOM
// =================================

const inputBox = document.querySelector(".input");
const submitBtn = document.querySelector(".submit");
const displayBox = document.querySelector(".display"); 
const livesDisplay = document.querySelector(".count-display");
const totalLives = document.querySelector(".total-lives");
const triedLetters = document.querySelector(".tried-letters");


// =================================
// 🧠 2. Variables globales / état
// =================================

const secretWordsA = ["APOLLO", "ARTEMIS", "CHAOS", "CHRONOS", "GAIA"]; // 1. Creation of a list of 5 words for the player to guess.       

let chosenWordA = chooseWord(secretWordsA); // 2. Calling of the function choosing a random word from the list.

let hiddenChosenWordA = createHiddenWord(chosenWordA); // 3. Calling of the function creating a representation of the chosen word, with hidden letters as underscores.

let lives = 6; // 4. Determination of the amount of lives / attempts allowed.

let inputLettersA = []; // 5. Creation of an empty array containing the letters already tried by the player. 

let inputLetterValue;

// =================================
// 🎊 3. Fonctions (logique métier)
// =================================

totalLives.innerHTML = `${lives}`;

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
      
      alert(`Nope. Be careful... She's coming for ya.
        
                       You'd better think twice on your next try, huh?`);
        
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
  
                            <div> - Letters already tried: ${input})</div>`;
  }
  
  // =================================
  // 🧲 4. Événements (interactions)
  // =================================
  
  
  displayGameState(hiddenChosenWordA, lives, inputLettersA);
  
  submitBtn.addEventListener('click', ()  => {
    let inputLetterValue = inputBox.value.toUpperCase().trim(); // 3. Asking the player to enter a letter. 
    
    let checkInputLetter = !isLetter(inputLetterValue); // 6. Calling the function to check if the input is not a letter, and if not, ask again.  
    
    if(inputLetterValue === "") // 4. If the input is void, asking the player to enter a letter. 
    {    
      displayBox.innerHTML = "C'mon: ONE.LETTER.";    
      
    } else if(!isNaN(inputLetterValue) || checkInputLetter || inputLetterValue.length !== 1) // 7. Checking if the input is a valid letter (not a number, an empty string, or another ASCII character)..
    {  
      displayBox.innerHTML = "ONE letter ONLY - from the English alphabet. You can do this, pal :]";
      
    } else { 
      
      
      if(inputLettersA.includes(inputLetterValue)) 
        { 
        displayBox.innerHTML = `<b>FOCUS, pal! You've already tried the letter ${inputLetterValue}...</b>`; 
      } else {
        
        inputLettersA.push(inputLetterValue); // 12. If it's a new letter, adding the new letter to the letters already tried.   
      }
      
      checkLetter(inputLetterValue, chosenWordA, hiddenChosenWordA, inputLettersA); // 12. Calling the function verifying that the letter entered matches a letter in the word.
      
    }
    
    
    
    // !!!!CREATION OF THE DISPLAY / GAME STATE AREA AND MESSAGES!!!
    
    const myDisplay = document.createElement('div'); // Creation of a display area.
    
    myDisplay.innerHTML = `<div class="img-battewoman"><img src=https://media.s-bol.com/Y9VLLGQMNgrO/31956Xx/550x759.jpg alt="battewoman"> </img> <div>
  
      <div>Letters already tried: ${inputLetterValue} !</div> `;
    
    
    myDisplay.classList.add('game-state');
    
   
    displayBox.appendChild(myDisplay);
    
    // FONCTION DE DISPLAY
    
    inputBox.value = "";
    inputBox.focus();
    
    totalLives.innerHTML = `${lives}`;
    inputBox.select(); 
    
    livesDisplay.innerHTML = `${lives}`;
    triedLetters.innerHTML = `${inputLettersA}`;

  });
  
  
  
  
  
  
  
  