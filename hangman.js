var word, gottenRight, i, lettersGuessed, lives, LETTERS, key;
// The letters constant is used to creating properties on the lettersGuessed object
LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


// This funtion is called by the HTML page when the submit guess button is clicked
function letterGuessed(){
  //change it to upper case so it will match the word even if they enter lowercase

  /*****************************************************************************
   * go through this file and use jquery selectors wherever you can.
   * `$('#guess')` is much more readable than `document.getElementById...`
   *
   * Also, you should scrub input data as early as possible. Instead of passing
   * `updateLetters` the entire text and then examining the first letter there,
   * strip off the first letter right now and pass only that letter to
   * `updateLetters`. Furthermore, you want to avoid repeating the same
   * computation in a loop. If updateLetters _does_ scrub `guess`, it should
   * do this (a) outside of the for loop, and (b) before examining the condition
   * `!lettersGuessed[guess]`.
   ****************************************************************************/

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

      /***************************************************************************
       * excessive indentation
       **************************************************************************/

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

  /*****************************************************************************
   * In many languages (e.g. C), strings are exposed to the programmer as arrays
   * of chars. If you were using such a language, it might be intuitive to keep
   * in memory a string representing the current display (e.g. "_ lo_e _s") and,
   * whenever a correct letter was guessed, change the placeholder char(s) to
   * the correct letter for that position. Whenever the `displayWord` was
   * updated in memory, you would update the corresponding display. This is an
   * efficient strategy: you are only editing the pieces that changed, and
   * anything that does not change is untouched.
   *
   * Implement this strategy here. Instead of rebuilding the entire word every
   * time something changes, represent the word as an array of chars. You can
   * create this array like so:
   *
   *     placeholder = '_';
   *     displayWord = [];
   *
   *     for (i = 0; i < word.length; i++) {
   *       char = word.charAt(i);
   *
   *       // unless char is a space, use a placeholder
   *       if (char) {
   *         char = placeholder;
   *       };
   *
   *       displayWord[i] = char;
   *     };
   *
   * Actually, this can be condensed quite a bit. The following code does
   * exactly the same thing (make sure you understand why):
   *
   *     placeholder = '_';
   *     displayWord = [];
   *
   *     // initially, all characters (except spaces) display as placeholders
   *     for (i = 0; i < word.length; i++) {
   *       displayWord[i] = word.charAt(i) && placeholder;
   *     };
   *
   * To print this word, use the built-in `Array.join()` method. If you simplify
   * your html to:
   *     <h1 id="wordDisplay"></h1>
   * you can now do:
   *     $('#wordDisplay).text(displayWord.join('&emsp;'));
   *
   * The code I've written can serve as the boring boilerplate. The interesting
   * part of this implementation is updating the displayWord array correctly and
   * efficiently.
   ****************************************************************************/

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

  /*****************************************************************************
   * this condition could be simplified to `if (lettersGuessed[key] === true)`
   *
   * there's no need for this at all, though - you're already displaying letters
   * guessed once by crossing them out
   ****************************************************************************/

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
  
  // Reset alphabet by emptying it then adding the letters

  /*****************************************************************************
   * you only need to create these spans once - after that, simply remove the
   * `guessed` class from every letter upon resetting
   *
   * side note:
   * jQuery's `addClass` and `removeClass` methods do not change anything if
   * there is no work to do, i.e. `addClass` does nothing if the class has
   * already been added, and `removeClass` does nothing if there is no class to
   * remove. This property of setting a particular state regardless of the
   * current state is called "idempotency" - something is idempotent if it can
   * be called multiple times and have the same affect has having called it
   * once. This is nice, because you can perform an operation without worrying
   * about whether your current state supports that operation: you know that it
   * has to. An example: say I want to know how many users have liked my hangman
   * game. I could keep a simple tally that I increment when a user likes it and
   * decrement when a user unlikes it. However, I now have to check whether a
   * given user has liked hangman before I decrement my tally, and whether a
   * user has not liked hangman before I increment it. If instead I keep a
   * bitmap that contains every unique user, I can set the property
   * `likesHangman` of a user to `true` when that user likes it and `false` when
   * the user unlikes it. I can set it to `true` whether or not it is already
   * true, and set it to `false` whether or not it is already false, and my data
   * will remain valid. Creating idempotency here has a disadvantage: I now have
   * to iterate through the entire bitmap and count the number of times I see
   * `true` each time I want to calculate the total likes. But this inefficiency
   * to read the tally may be outweighed by the added safety/efficiency of
   * writing the tally.
   ****************************************************************************/

  $('#alphabet').html('');
  for (i = 0; i < LETTERS.length; i++) {
    $('#alphabet').append('<span id="'+LETTERS[i]+'">'+LETTERS[i]
      +' </span>');
  }
  
  // This function displays the letters guessed crossed out and the letters
  // not guessed normally at the top of the page

  /*****************************************************************************
   * Conserve computation by not redoing things inside a loop. This function
   * should be declared once when the file is first executed. There is also no
   * value to making this function a method on the `lettersGuessed` object.
   ****************************************************************************/

  lettersGuessed.htmlDisplay = function(){
    var result = "";
    for (i = 0; i < LETTERS.length; i++) {
      if (lettersGuessed[LETTERS[i]])
        $('#' + LETTERS[i]).addClass('guessed');
      else
        $('#' + LETTERS[i]).removeClass('guessed');
    }
  };
  
  lives = 6;
  gottenRight = [];
  for (i=0; i<word.length; i++)
  {

    /***************************************************************************
     * excessive indentation
     **************************************************************************/

      gottenRight[i] = false;
  } 
  if(document.getElementById('submitGuess')) {
    document.getElementById('submitGuess').disabled = false;
  }

  /*****************************************************************************
   * when you switch this to jquery, you can set the src directly with:
   * $('#lifeImage').src('6lives.jpg');
   ****************************************************************************/

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