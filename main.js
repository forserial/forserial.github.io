var $     = require('jquery'),
    blast = require('blast/jquery.blast');

var url = 'techno.mp3';

$(document).ready(function () {

  function id(i) {
    return i;
  }

  function rand(min, max, float, neg) {
    var sign = !!neg && Math.floor(Math.random() * 2) && -1 || 1;
    min === null && (min = 0);
    max === null && (max = 100);
    return sign * (!!float && id || Math.floor)(Math.random() * (max - min) + min);
  }

  function rc(alpha) {
    return 'rgb' + (alpha && 'a') + '(' + [1, 2, 3].map(function () {
      return rand(0, 255);
    }).join(',') + (alpha && (',' + rand(0, 1, true))) + ')';
  }
  
  function tr() {
    return 'rotate(' + rand(0, 90, false, true) + 'deg)';
  }
  
  function trr() {
    var easing = ['ease-in', 'ease-out', 'ease-in-out', 'linear'];
    return rand(0, 2, true) + 's all ' + easing[rand(0, easing.length)];
  }
  
  $('.subscript, .copy').blast({delimiter: "character"});

  function dismantle() {
    $('.blast').each(function (i, el) {
      $(this).css('transition', trr());
      $(this).css({
        transform: tr(),
        color: rc(true)
      });
    });
  }
  
  function remantle () {
    $('.blast').each(function () {
      $(this).removeAttr('style');
    });
  }

  
  $('header').blast({
    delimiter: 'character',
    generateValueClass: true
  });

  $('.blast-character-e').click(dismantle);
  $('.blast-character-f').click(remantle);
  $('.copy .blast, .subscript .blast').mouseenter(function () {
    $(this).removeAttr('style');
  });
});