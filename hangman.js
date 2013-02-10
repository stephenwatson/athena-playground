var word, gottenRight, i, guessedLetters, lives;
word="I LOVE JS";
lives = 6;
//Initally they have nothing right
for (i=0; i<word.length; i++)
{
	gottenRight[i] = false;
}

//This funtion is called by the HTML page when the submit guess button is clicked
function letterGuessed(){
	//change it to upper case so it will match the word even if they enter lowercase
	var letterGuessed = document.getElementById('guess')[].value.toUpperCase();
	updateLetters(letterGuessed);
}

//updates the gottenRight array
function updateLetters(guess){
	var correctGuess = false;
	//Check that guess has a value and isn't alrdy guessed
	if (guess && guessedLetters.indexOf(guess) === -1){
		//Add their guess to the array of guessed letters
		guessedLetters += guess;
		for (i=0; i<word.length; i++)
		{
			if(guess === word.charAt(i)){
				gottenRight[i] = true;
				correctGuess = true;
			}
		}
		if (!correctGuess){
			lives--;
			//Change the image to the new number of lives image
			document.getElementById('liveImage').innerHTML = "<img src=\""+lives+"lives.jpg\">";
			if (lives === 0){
				document.writeln("<h1>You lose!</h1>");
				//Should disable the button to submit a new letter here
			}
		}
		else{
			rewriteWord();
		}
	}
}

//Reloads the word on the HTML page showing letters the user has correctly guess, 
// otherwise showing underscores
function rewriteWord(){
	var reWrittenWord = "";
	for (i=0; i < gottenRight.length; i++){
		if (gottenRight[i] === word.charAt(i)){
			reWrittenWord += word.charAt(i);
		}
		else if(word.charAt(i) === ' '){
			reWrittenWord += ' ';
		}
		else{
			reWrittenWord += '_';
		}
	}
	document.getElementById('wordDisplay').innerHTML =reWrittenWord;
}