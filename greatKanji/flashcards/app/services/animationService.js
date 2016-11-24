flashApp.service('animationTest', function(){
	var numCoins = 0,
    score = 0,
    coins = [],
    canvas,
		coinsToDestroy = [];

//redraw loop
  function gameLoop() {

    var i;

    //so instead of a timer, what we are doing here is adding this function everytime teh browswer wants to paint. Brilliant
    window.requestAnimationFrame(gameLoop);

    // Clear the whole canvas
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

    for (i = 0; i < coins.length; i += 1) {
      coins[i].update();
      coins[i].render();
    }
		destroyCoins();
  }
//a sprite object, update and render
  function sprite(options, straightPath) {
/*
    var that = {},
      frameIndex = 0,
      tickCount = 0,
			totalTickCount=0,
			maxTicks=1000,
      ticksPerFrame = options.ticksPerFrame || 0,
      numberOfFrames = options.numberOfFrames || 1,

			isWrap = options.isWrap || false,
			markedForDestruction = false,
			deltaX =straightPath.deltaX || 0,
			deltaY = straightPath.deltaY || 0;
*/
var that = {};
//	that.type = type || 1;
	that.frameIndex = 0;
	that.tickCount = 0;
	that.totalTickCount=0;
	that.maxTicks=1000;
	that.ticksPerFrame = options.ticksPerFrame || 0;
	that.numberOfFrames = options.numberOfFrames || 1;

	that.isWrap = options.isWrap || false;
	that.markedForDestruction = false;
	that.type =1;

//  if (that.type==2){
if (straightPath){

that.type = 2;
	that.deltaX =straightPath.deltaX || 0;
	that.deltaY = straightPath.deltaY || 0;
  }
			/*
			1-stationary
			2-moving
			3.-pattern
			*/

    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.x = 0;
    that.y = 0;
    that.image = options.image;
    that.scaleRatio = 1;

    that.update = function() {

      that.tickCount += 1;
			that.totalTickCount += 1;

      if (that.tickCount > that.ticksPerFrame) {

        that.tickCount = 0;

        // If the current frame index is in range
        if (that.frameIndex < that.numberOfFrames - 1) {
          // Go to the next frame
          that.frameIndex += 1;
        } else {
          that.frameIndex = 0;
        }
      }
		};

    that.render = function() {
      	//console.log("s"+that.straightPath);
				//console.dir(this);
			if (that.deltaX || that.deltaY){
				that.x += that.deltaX;
				that.y += that.deltaY;

				if (!that.isWrap) {
					 if (that.x + (options.width / that.numberOfFrames) < 0){ //off left
						that.x = canvas.width;
						that.markedForDestruction=true;
					}
					else if (that.x + (options.width / that.numberOfFrames) > canvas.width){//of right
						that.x = 0;
						that.markedForDestruction=true;
					}
					if (that.y + (options.height) < 0){//off top
						that.y = canvas.height;
						that.markedForDestruction=true;
					}
					else if (that.y + (options.height) > canvas.height){//of bottom
						that.y = 0;
						that.markedForDestruction=true;
					}
				}
			}

			if (that.totalTickCount < that.maxTicks && !that.markedForDestruction) {
    // Draw the animation
      that.context.drawImage(
        that.image,
        that.frameIndex * that.width / that.numberOfFrames,
        0,
        that.width / that.numberOfFrames,
        that.height,
        that.x,
        that.y,
        that.width / that.numberOfFrames * that.scaleRatio,
        that.height * that.scaleRatio);
				//console.log("x: " +that.x +" y: "+that.y);
			}
			else{
				coinsToDestroy.push(this);
			}
	  };

    that.getFrameWidth = function() {
      return that.width / that.numberOfFrames;
    };
		console.log("this");
    console.dir(that);
    return that;
  }

	//call this function to destroy coins
	function destroyCoins(){
		// Destroy tapped coins
		for (i = 0; i < coinsToDestroy.length; i += 1) {
			//giving random score
			score += parseInt(coinsToDestroy[i].scaleRatio * 10, 10);
			destroyCoin(coinsToDestroy[i]);
		}

		//at least one was destoryed so change the score
	if (coinsToDestroy.length) {
			document.getElementById("score").innerHTML = score;
	}
	coinsToDestroy=[];
	}
//pass a coin, remove it from the array
  function destroyCoin(coin) {

    var i;

    for (i = 0; i < coins.length; i += 1) {
      if (coins[i] === coin) {
        coins[i] = null;
        coins.splice(i, 1);
        break;
      }
    }
  }

//  function spawnCoin(src,w,h,numFrames,ticksPer) {
function spawnCoin(s, v) {
		/*
		"index":"4",
	  "name":"tripple",
	  "imageUrl":"../app/images/tripple.png",
	  "type":"",
	  "imgLength":567,
	  "imgHeight":57,
	  "numFrames":10,
	  "ticksPer":5
	},
	*/
	console.dir(s);
    var coinIndex,
      coinImg;

    // Create sprite sheet
    coinImg = new Image();

    coinIndex = coins.length;

    // Create sprite
    coins[coinIndex] = sprite({
      context: canvas.getContext("2d"),
      width: s.imgLength,
      height: s.imgHeight,
      image: coinImg,
      numberOfFrames: s.numFrames,
      ticksPerFrame: s.ticksPer
    },v)

    coins[coinIndex].x = Math.random() * (canvas.width - coins[coinIndex].getFrameWidth() * coins[coinIndex].scaleRatio);
    coins[coinIndex].y = Math.random() * (canvas.height - coins[coinIndex].height * coins[coinIndex].scaleRatio);

    coins[coinIndex].scaleRatio = Math.random() * 0.5 + 0.5;

    // Load sprite sheet
   //coinImg.src = "images/coin-sprite-animation.png";// 10 1000 h100 transparent
	//coinImg.src = "images/blackFireworks.png"; //15 789 h53 black
	//coinImg.src = "images/Madoka.png"; //8 809 h136 black
	//coinImg.src = "images/Madoka.png"; //8 809 h136 black
	//coinImg.src = "images/yellowFireworks.png"; //10 567 h57 black
	//coinImg.src = "images/tripple.png"; //10 567 h57 black
	coinImg.src = s.imageUrl; //12 4800 h200 black
	//console.dir(coinImg)
	console.log("coins.legnth "+coins.length);
	return false;
  }

//getting canvas position
  function getElementPosition(element) {

		    var parentOffset,
		      pos = {
		        x: element.offsetLeft,
		        y: element.offsetTop
		      };
		//maybe using a container so getting the container's position?
			    if (element.offsetParent) {
			      parentOffset = getElementPosition(element.offsetParent);
			      pos.x += parentOffset.x;
			      pos.y += parentOffset.y;
			    }
			    return pos;
  }

  function distance(p1, p2) {

    var dx = p1.x - p2.x,
      dy = p1.y - p2.y;

    return Math.sqrt(dx * dx + dy * dy);
  }

//everytime canvas is touched
  function tap(e) {

    var i,
      loc = {},
      dist,

    pos = getElementPosition(canvas),
		//if canvas touched many times, get first place, or if just one get that one
      tapX = e.targetTouches ? e.targetTouches[0].pageX : e.pageX,
      tapY = e.targetTouches ? e.targetTouches[0].pageY : e.pageY,
			//mayber the browser has been scaled
      canvasScaleRatio = canvas.width / canvas.offsetWidth;

    loc.x = (tapX - pos.x) * canvasScaleRatio;
    loc.y = (tapY - pos.y) * canvasScaleRatio;

		//check each coin
		    for (i = 0; i < coins.length; i += 1) {

		      // Distance between tap and coin
		      dist = distance({
		        x: (coins[i].x + coins[i].getFrameWidth() / 2 * coins[i].scaleRatio),
		        y: (coins[i].y + coins[i].getFrameWidth() / 2 * coins[i].scaleRatio)
		      }, {
		        x: loc.x,
		        y: loc.y
		      });

		      // Check for tap collision with coin
					//notice we use < frane width to account for inside the frame body
		      if (dist < coins[i].getFrameWidth() / 2 * coins[i].scaleRatio) {
						console.log("foudn "+i);
		        coinsToDestroy.push(coins[i]);
		      }
		    }


  }

  // Get canvas
	function init(canvasId){
		canvas = document.getElementById(canvasId);
	canvas.width = screen.availWidth;
	canvas.height = screen.availHeight;
	//	canvas.width = screen.height;
	//	canvas.height = screen.height;
/*
	  for (i = 0; i < numCoins; i += 1) {
	    spawnCoin();
	  }
*/
	  gameLoop();

	  canvas.addEventListener("touchstart", tap);
	  canvas.addEventListener("mousedown", tap);

	}

	return 	{
		init:init,
		destroyCoin:destroyCoin,
		spawnCoin:spawnCoin
	}
});
