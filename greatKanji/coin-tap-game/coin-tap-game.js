(function() {

  var numCoins = 1,
    score = 0,
    coins = [],
    canvas;

//redraw loop
  function gameLoop() {

    var i;
    var coinsToDestroy=[];
    //so instead of a timer, what we are doing here is adding this function everytime teh browswer wants to paint. Brilliant
    window.requestAnimationFrame(gameLoop);

    // Clear the whole canvas
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

    for (i = 0; i < coins.length; i += 1) {
      coins[i].update();
      var destroy = coins[i].render();
      console.log(destroy);
      if (destroy){

        coinsToDestroy.push(coins[i]);
      }
    }

    // Destroy tapped coins
    for (j = 0; j < coinsToDestroy.length; j += 1) {
      //giving random score
      score += parseInt(coinsToDestroy[j].scaleRatio * 10, 10);
      destroyCoin(coinsToDestroy[j]);
      //make a new coin
      setTimeout(spawnCoin, 1000);
    }

  }
//a sprite object, update and render
  function sprite(options) {

    var that = {},
      frameIndex = 0,
      tickCount = 0,
      ticksPerFrame = options.ticksPerFrame || 0,
      numberOfFrames = options.numberOfFrames || 1;

    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.x = 0;
    that.y = 0;
    that.image = options.image;
    that.scaleRatio = 1;
    that.destroy = false;

    that.update = function() {

      tickCount += 1;
      //destroyCoin(coinsToDestroy[i]);
      //make a new coin
      //setTimeout(spawnCoin, 1000);

      if (tickCount > ticksPerFrame) {
        that.x -=100;
        tickCount = 0;

        // If the current frame index is in range
        if (frameIndex < numberOfFrames - 1) {
          // Go to the next frame
          frameIndex += 1;
        } else {
          frameIndex = 0;
        }
      }
    };

    that.render = function() {

      // Draw the animation
      console.log(that.x+" "+(-1*that.width/ numberOfFrames));
      if (that.x < (-1*that.width/ numberOfFrames)){
        return true;
      }

      that.context.drawImage(
        that.image,
        frameIndex * that.width / numberOfFrames,
        0,
        that.width / numberOfFrames,
        that.height,
        that.x,
        that.y,
        that.width / numberOfFrames * that.scaleRatio,
        that.height * that.scaleRatio);
        console.log("x: "+that.x+" y: "+that.y);
        return false;
    };

    that.getFrameWidth = function() {
      return that.width / numberOfFrames;
    };

    return that;
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

  function spawnCoin() {

    var coinIndex,
      coinImg;

    // Create sprite sheet
    coinImg = new Image();

    coinIndex = coins.length;

    // Create sprite
    coins[coinIndex] = sprite({
      context: canvas.getContext("2d"),
      width: 4800,
      height: 200,
      image: coinImg,
      numberOfFrames: 12,
      ticksPerFrame: i
    });

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
	coinImg.src = "images/catWalking.png"; //12 4800 h200 black
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
      coinsToDestroy = [];
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
		        coinsToDestroy.push(coins[i]);
		      }
		    }

		    // Destroy tapped coins
		    for (i = 0; i < coinsToDestroy.length; i += 1) {
					//giving random score
		      score += parseInt(coinsToDestroy[i].scaleRatio * 10, 10);
		      destroyCoin(coinsToDestroy[i]);
					//make a new coin
		      setTimeout(spawnCoin, 1000);
		    }

				//at least one was destoryed so change the score
		    if (coinsToDestroy.length) {
		      document.getElementById("score").innerHTML = score;
		    }
  }

  // Get canvas
  canvas = document.getElementById("coinTapGame");
  canvas.width = screen.availWidth;
  canvas.height = screen.availHeight;

  for (i = 0; i < numCoins; i += 1) {
    spawnCoin();
  }

  gameLoop();

  canvas.addEventListener("touchstart", tap);
  canvas.addEventListener("mousedown", tap);

}());
