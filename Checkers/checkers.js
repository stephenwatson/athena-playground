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
});