$(document).ready(function() {
  var generate_color, eventFns;

  // function c/o http://stackoverflow.com/questions/1484506
  generate_color = function() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.round(Math.random() * 15)];
    }
    return color;
  };

  eventFns = {
    mousedown: function() {
      $('#click-target').addClass('red');
    },
    mouseup: function() {
      $('#click-target').removeClass('red');
    },
    mouseenter: function() {
      $('#mouseenter-target').css('background-color', generate_color());
    },
    mousemove: function() {
      $('#mousemove-target').text('mouse is moving!');
    },
    mousestop: function() {
      $('#mousemove-target').text('Mousemove');
    },
    keyup: function(e) {
      $('#keyup-target').text('Keyup: ' + String.fromCharCode(e.keyCode));
    },
    focus: function() {
      $('#focus-target').css('font-size', 25);
    },
    blur: function() {
      $('#focus-target').css('font-size', 16);
    },
  }

  $('div').mousedown(eventFns.mousedown);
  $('div').mouseup(eventFns.mouseup);
  $('div').mouseenter(eventFns.mouseenter);
  $(document).mousemove(function() {
    clearTimeout(window.timeoutID);
    window.timeoutID = setTimeout(eventFns.mousestop, 100);
    eventFns.mousemove();
  });
  $(document).keyup(eventFns.keyup);
  $('input').focus(eventFns.focus);
  $('input').blur(eventFns.blur);

  $('div').mouseenter(function(e) { $(e.target).addClass('selected'); });
  $('div').mouseleave(function(e) { $(e.target).removeClass('selected'); });
});
