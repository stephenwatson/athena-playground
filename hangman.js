var word, gottenRight, i, lettersGuessed, lives, LETTERS, key, scrub, htmlDisplay;
// The letters constant is used to creating properties on the lettersGuessed object
LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


// This funtion is called by the HTML page when the submit guess button is clicked
function letterGuessed(){
  var letterGuessed = scrub($('#guess').val(),1).toUpperCase();
  updateLetters(letterGuessed);
}

//This function scrubs the HTML data clean for security
//@param toBeScrubbed this is the input that needs sanitizing
//@param howMuchScrubbing optional param specifying how many chars of the 
//string will be scrubbed & returned. Default entire string.
scrub = function(toBeScrubbed, howMuchScrubbing){
  var clean = "";
  var j, isClean;
  var disAllowed = ['<', '>', "'", '"', '{', '}', '&', '`',
    '!', '@','$', '%', '`(', ')', '=', '+', '[', ']',' '];
  if (howMuchScrubbing){
    toBeScrubbed = toBeScrubbed.substring(0,howMuchScrubbing);
  }
  for (i=0;i<toBeScrubbed.length;i++){
    isClean = true;
    for (j = 0; j < disAllowed.length; j++) {
      if(toBeScrubbed.charAt(i) === disAllowed[j]) {
        isClean = false;
      }
    }
    if (isClean)
      clean += toBeScrubbed.charAt(i);
  }
  return clean;
}

// updates the gottenRight array
function updateLetters(guess){
  var correctGuess = false;
  var correctIndex = [];
  correctIndex[0] = -1;
  // Check that guess has a value
  if (guess && !lettersGuessed[guess]){
    // Add their guess to the array of guessed letters
    lettersGuessed[guess] = true;
    for (i=0; i<word.length; i++) {
      if(guess === word.charAt(i)){
        gottenRight[i] = true;
        correctGuess = true;
        if (correctIndex[0] === -1) {
          correctIndex[0] = i;
        }
        else {
          correctIndex.push(i);
        }
      }
    }
    if (!correctGuess){
      lives--;
      // Change the image to the new number of lives image
      $('#lifeImage').attr('src',lives + 'lives.jpg');
      if (lives === 0) {
        //Dissallow submission of new guesses once game over
        $('#submitGuess').attr("disabled", true);
      }
    }
    rewriteWord(correctIndex);
  }
}

// Reloads the word on the HTML page showing letters the user has correctly guess, 
// otherwise showing underscores.  Also calls the function to rewrite the alphabet
// @param indexToUpdate the index of the letter to update, -1 at index 1 if no update.  
// If not provided then it will update the entire word display to _'s and spaces
function rewriteWord(indexToUpdate){
  var placeholder, displayWord, currentChar;
  // If not passed an index to update, update everything
  if (indexToUpdate === undefined) {
   displayWord = [];
   for (i = 0; i < word.length; i++) {
     currentChar = word.charAt(i);
     // If not a space show a _ with and id so we can change it
     displayWord[i] = (currentChar !== ' ') ? '<span id="wordIndex'+i+'">_</span>'
      : word.charAt(i);
   }
   $('#wordDisplay').html(displayWord.join('&emsp;'));
  }
  //If they got a letter right an index is passed to update
  else if(indexToUpdate[0] !== -1) {
    for (i=0;i<indexToUpdate.length;i++) {
      $('#wordIndex'+indexToUpdate[i]).html(word.charAt(indexToUpdate[i]));
    }
  }
  htmlDisplay();
}

// This function is called when the replay button is pressed and resets the game.
function replay(){
  lettersGuessed = {};
  for (i = 0; i < LETTERS.length; i++) {
    lettersGuessed[LETTERS[i]] = false;
  }  

  //Reset alphabet to none guessed yet
  for (i = 0; i < LETTERS.length; i++) {
    $('#'+LETTERS[i]).removeClass('guessed');
  }
  
  lives = 6;
  gottenRight = [];
  for (i=0; i<word.length; i++)
  {
    gottenRight[i] = false;
  } 
  if($('#submitGuess')) {
    $('#submitGuess').attr("disabled", false);
  }
  $('#lifeImage').attr('src', '6lives.jpg');
  rewriteWord();
}


// This function sets the word to a user generated word
function setWord(){
  word = $('#newWord').val().toUpperCase();
  replay();
}

// This function applies the guessed class, which crosses off the letter, 
// based on whether or not the letter is guessed
htmlDisplay = function(){
  var result = "";
  for (i = 0; i < LETTERS.length; i++) {
    if (lettersGuessed[LETTERS[i]])
      $('#' + LETTERS[i]).addClass('guessed');
    else
      $('#' + LETTERS[i]).removeClass('guessed');
  }
};

// Because of variable hoisting code moved down here, below functions
word = "I LOVE JS";
$(document).ready(function(){
  for (i = 0; i < LETTERS.length; i++) {
    $('#alphabet').append('<span id="'+LETTERS[i]+'">'+LETTERS[i]
      +' </span>');
  }
  replay();
});