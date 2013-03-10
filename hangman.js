var word, gottenRight, i, lettersGuessed, lives, LETTERS, key;
// The letters constant is used to creating properties on the lettersGuessed object
LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


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
    for (i=0; i<word.length; i++) {
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
// otherwise showing underscores.  Also calls the function to rewrite the alphabet
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
  // Rewrite the alphabet
  lettersGuessed.htmlDisplay();
}

// This function is called when the replay button is pressed and resets the game.
function replay(){
  lettersGuessed = {};
  for (i = 0; i < LETTERS.length; i++) {
    lettersGuessed[LETTERS[i]] = false;
  }
  //Reset alphabet by emptying it then adding the letters
  $('#alphabet').html('');
  for (i = 0; i < LETTERS.length; i++) {
    $('#alphabet').append('<span id="'+LETTERS[i]+'">'+LETTERS[i]
      +' </span>');
  }
  
  // This function displays the letters guessed crossed out and the letters
  // not guessed normally at the top of the page
  lettersGuessed.htmlDisplay = function(){
    var result = "";
    for (i = 0; i < LETTERS.length; i++) {
      /*if(!this[LETTERS[i]]) {
        result += LETTERS[i] + " ";
      }
      else{
        result += "<strike>" + LETTERS[i] + "</strike> ";
      }*/
      if (lettersGuessed[LETTERS[i]])
        $('#' + LETTERS[i]).addClass('guessed');
      else
        $('#' + LETTERS[i]).removeClass('guessed');
    }
    //document.getElementById('alphabet').innerHTML = result;
  };
  
  lives = 6;
  gottenRight = [];
  for (i=0; i<word.length; i++)
  {
      gottenRight[i] = false;
  } 
  if(document.getElementById('submitGuess')) {
    document.getElementById('submitGuess').disabled = false;
  }
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