var word, gottenRight, i, guessedLetters, lives;
word = "I LOVE JS";
guessedLetters = ""; 
lives = 6;
// Initally they have nothing correct
gottenRight = [];
for (i=0; i<word.length; i++)
{
    gottenRight[i] = false;
}
// Why can't i just called replay(); instead of initializing all the variables above???

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
    if (guess && guessedLetters.indexOf(guess) === -1){
        // Add their guess to the array of guessed letters
        guessedLetters += guess;
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
            document.getElementById('lifeImage').innerHTML = 
              '<img src="' + lives + 'lives.jpg">';
            if (lives === 0) {
                // Should disable the button to submit a new letter here
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
    for(i=0; i<guessedLetters.length; i++){
      innerHTML+= guessedLetters.charAt(i) + " ";
    }
    document.getElementById('wordDisplay').innerHTML = innerHTML;
}

// This function is called when the replay button is pressed and resets the game.
function replay(){
  guessedLetters = ""; 
  lives = 6;
  for (i=0; i<word.length; i++)
  {
      gottenRight[i] = false;
  }
  document.getElementById('lifeImage').innerHTML = '<img src="6lives.jpg">';
  rewriteWord();
}


// This function sets the word to a use generated word
function setWord(){
  var newWord = document.getElementById('newWord').value.toUpperCase();
  word = newWord;
  replay();
}