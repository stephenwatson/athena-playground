var word, gottenRight, i, lettersGuessed, lives, LETTERS, key;
// The letters constant is used to creating properties on the lettersGuessed object
LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];


// This funtion is called by the HTML page when the submit guess button is clicked
function letterGuessed(){
  //change it to upper case so it will match the word even if they enter lowercase
  var letterGuessed = document.getElementById('guess').value.toUpperCase();
  updateLetters(letterGuessed);
}

// updates the gottenRight array
function updateLetters(guess){
  var correctGuess = false;
  // Check that guess has a value
  if (guess && !lettersGuessed[guess]){
    // Add their guess to the array of guessed letters
    lettersGuessed[guess] = true;
    for (i=0; i<word.length; i++)
      {
        if(guess.charAt(0) === word.charAt(i)){
          gottenRight[i] = true;
          correctGuess = true;
      }
    }
    if (!correctGuess){
      lives--;
      // Change the image to the new number of lives image
      document.getElementById('lifeImage').innerHTML = '<img src="' + lives + 'lives.jpg">';
        if (lives === 0) {
          //Dissallow submission of new guesses once game over
          document.getElementById('submitGuess').disabled = true;
        }
      }
      rewriteWord();
    }
}

// Reloads the word on the HTML page showing letters the user has correctly guess, 
// otherwise showing underscores
function rewriteWord(){
  var reWrittenWord = "";
  for (i=0; i < gottenRight.length; i++){
    if (gottenRight[i]){
      reWrittenWord += word.charAt(i);
      reWrittenWord += " ";
    }
    else if(word.charAt(i) === ' '){
      reWrittenWord += "&emsp;&emsp;";
    }
    else{
      reWrittenWord += '_';
      reWrittenWord += " ";
    }
  }
  var innerHTML ="<h1>"+reWrittenWord+"</h1>";
  // Write out letters guessed
  innerHTML += "<br /> Letters Guessed: ";
  for (key in lettersGuessed){
    if (lettersGuessed.hasOwnProperty(key) && 
      typeof lettersGuessed[key] !== 'function' && lettersGuessed[key]){
      innerHTML+= key + " ";
    }
  }
  document.getElementById('wordDisplay').innerHTML = innerHTML;
}

// This function is called when the replay button is pressed and resets the game.
function replay(){
  lettersGuessed = {};
  for (i = 0; i < LETTERS.length; i++) {
    lettersGuessed[LETTERS[i]] = false;
  }
  
  // This function displays the letters guessed crossed out and the letters
  // not guessed normally at the top of the page
  lettersGuessed.htmlDisplay = function(){
    var result = "";
    for (i = 0; i < LETTERS.length; i++) {
      if(!lettersGuessed[LETTERS[i]]) {
        result += LETTERS[i] + " ";
      }
      else{
        result += "<strike>" + LETTERS[i] + "</strike> ";
      }
    }
    document.getElementById('alphabet').innerHTML = result;
  };
  
  lives = 6;
  gottenRight = [];
  for (i=0; i<word.length; i++)
  {
      gottenRight[i] = false;
  } 
  document.getElementById('submitGuess').disabled = false;
  //ANYWHERE PAST HERE CANT CALL lettersGuessed.htmlDisplay();
  document.getElementById('lifeImage').innerHTML = '<img src="6lives.jpg">';
  rewriteWord();
}


// This function sets the word to a user generated word
function setWord(){
  word = document.getElementById('newWord').value.toUpperCase();
  replay();
}

// Because of variable hoisting code moved down here, below functions
word = "I LOVE JS";
replay();