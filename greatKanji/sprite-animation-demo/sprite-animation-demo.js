
(function() {
	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
	// MIT license

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());//polyfill

(function () {

	var coin,//logical object
		coinImage,//built in image object
		canvas;				//front end canvas object

	function gameLoop () {

   //what is this object, and why are we passing this function to it
	  window.requestAnimationFrame(gameLoop);

	  coin.update();//update then render
	  coin.render();
	}

	function sprite (options) {

		var that = {},//this is so it can refer to itself
			frameIndex = 0, //what image are we currently looking at
			tickCount = 0, //how many ticks have gone by
			ticksPerFrame = options.ticksPerFrame || 0, //speed controller
			numberOfFrames = options.numberOfFrames || 1;//number of images in sprite

		that.context = options.context; //the canvas and below its attributes and source image
		that.width = options.width;
		that.height = options.height;
		that.image = options.image;

    /*
update just checks to see if in this tick of the clock, the sprite needs to be updated
if so we move the frame index up, how simple, if not we ignore
if the frame index is over the max we go back to the first frame;
    */
		that.update = function () {

            tickCount += 1; //add one to the ticker

            if (tickCount > ticksPerFrame) { //should we update it? (speed controller)

				    tickCount = 0; //reset to zero

                // If the current frame index is in range
                if (frameIndex < numberOfFrames - 1) {
                    // Go to the next frame
                    frameIndex += 1;
                } else {
                    frameIndex = 0;
                }
            }
        };

		that.render = function () {

		  // Clear the canvas
		  that.context.clearRect(0, 0, that.width, that.height);

		  // Draw the animation
		  that.context.drawImage(
		    that.image,
		    frameIndex * that.width / numberOfFrames,
		    0,
		    that.width / numberOfFrames,  //likely always the same width (unless himage is )
		    that.height,//same height, because we only have one level of pics here
		    0, //not sure if this 2 values would ever be not zero
		    0,
		    that.width / numberOfFrames, //these two would likely be
		    that.height);
		};
    return that;
  }
    /*
    context.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)

  img	Source image object	Sprite sheet
  sx	Source x	Frame index times frame width
  sy	Source y	0
  sw	Source width	Frame width
  sh	Source height	Frame height
  dx	Destination x	0
  dy	Destination y	0
  dw	Destination width	Frame width
  dh	Destination height	Frame height
  //for more: http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/
  */


	// Get and set canvas, size and height is set here, not in html
	canvas = document.getElementById("coinAnimation");
	canvas.width = 100;
	canvas.height = 100;

	// Create sprite sheet
	coinImage = new Image();

	// Create sprite with this contstructor
	coin = sprite({
		context: canvas.getContext("2d"),
		width: 1000,//interesting put the entire length of the sprite sheet here
		height: 100, //and its height
		image: coinImage, //the image itselft
		numberOfFrames: 10, //how many frames it has
		ticksPerFrame: 4 //how many ticks, thus we can control speed
	});

	// Load sprite sheet
	coinImage.addEventListener("load", gameLoop); //when the page loads, call game loop; thus we could create as many of these as we want
	coinImage.src = "images/coin-sprite-animation.png"; //get the source

} ());
