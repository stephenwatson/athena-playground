$(document).ready(function(){
  var squareHTML;
  // Create the board, i is rows, j is columns
  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      squareHTML = (((j+i%2)%2===0))  ? '<div id="whiteSquare" style="margin:'+50*i+',0,0, '+j*50+'px;"> </div>' : 
        '<div id="blackSquare" style="margin:'+50*i+',0,0, '+j*50+'px;"> </div>';
      $('#board').append(squareHTML);
    }
    //why does it take so many br's?
    $('#board').append('<br><br><br>');
  }
  
       //This puts down the pink pices at the top, I just copied the code making the board
  for (i = 0; i < 3; i++) {
   for (j = 0; j < 8; j++) {
        if ((j+i%2)%2===1)
        {
       pinkPiece =  '<div id="pinkPiece" style="margin:'+50*i+',0,0, '+j*50+'px;">';
       $('#board').append(pinkPiece);
        }
   }
  }
    // This puts green pieces at the bottom of the board
  for (i = 5; i < 8; i++) {
   for (j = 0; j < 8; j++) {
        if ((j+i%2)%2===1)
        {
       greenPiece =  '<div id="greenPiece" style="margin:'+50*i+',0,0, '+j*50+'px;">';
       $('#board').append(greenPiece);
        }
   }
  }

});