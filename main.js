var $     = require('jquery'),
    blast = require('blast/jquery.blast'),
    WebAudiox = require('webaudiox/build/webaudiox'),
  
    context = new AudioContext(),
    lineOut = new WebAudiox.LineOut(), 
    analyser = context.createAnalyser();

analyser.connect(lineOut.destination);
lineOut.destination = analyser;


var url = 'techno.mp3';

require(['blast/jquery.blast'], function (blast) {
  alert('wtf');
  console.log(blast);
});

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
  
  // Set up audio!
  // This is the good part, right here...
  

  WebAudiox.loadBuffer(context, url, function (buffer) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.connect(lineOut.destination);
    source.start(0);
  });
  
	// loop and update
	requestAnimationFrame(function update() {
		requestAnimationFrame(update);
		// clear the canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		// get volume
		var volume	= WebAudiox.Analyser2Volume.compute(analyser)
		// up to you to find the colors you like
		ctx.fillStyle	= "rgb("+Math.floor(1.3*volume*256)+", 0, 0);"
		// draw a circle
		var radius	= 1+volume * 400
		ctx.beginPath()
		ctx.arc(canvas.width/2, canvas.height/2, radius, 0, Math.PI*2, true)
		ctx.closePath()
		ctx.fill()
	});
	
	/**
	 * note on how to compute bpm
	 * - store the timestamp of each beat
	 * - store only the last 100
	 * - do a statistical computation on those timestamp to get bpm estimation
	 *   - simple average is one
	 *   - remove monster values in your average" 
	 *   - a simple median ?
	 *   - see http://en.wikipedia.org/wiki/Robust_statistics for details
	 * - do a dat gui to tune those parameters
	 * - test estimator by simulating a beat
	 */
	
	var beatDetector= new WebAudiox.AnalyserBeatDetector(analyser, function(){
		console.log('beat')
	})
	WebAudiox.addAnalyserBeatDetectorDatGui(beatDetector)
	// loop and update
	setInterval(function(){
		beatDetector.update(1/60)
	}, 1000/60);
});