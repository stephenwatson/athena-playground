var word, gottenRight, i, guessedLetters, lives;
word="I LOVE JS";
lives = 6;
//Initally they have nothing right
gottenRight = new Array();
for (i=0; i<word.length; i++)
{
	gottenRight[i] = false;
}

//This funtion is called by the HTML page when the submit guess button is clicked
function letterGuessed(){
	//change it to upper case so it will match the word even if they enter lowercase
	var letterGuessed = document.getElementById('guess').value.toUpperCase();
	updateLetters(letterGuessed);
}

//updates the gottenRight array
function updateLetters(guess){
	var correctGuess = false;
	//Check that guess has a value
	if (guess){
		//Add their guess to the array of guessed letters
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
			//Change the image to the new number of lives image
			document.getElementById('lifeImage').innerHTML = "<img src=\""+lives+"lives.jpg\">";
			if (lives === 0){
				//Should disable the button to submit a new letter here
			}
		}
		else{
			//ISSUE HERE
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
	document.getElementById('wordDisplay').innerHTML ="<h1>"+reWrittenWord+"</h1>";
}