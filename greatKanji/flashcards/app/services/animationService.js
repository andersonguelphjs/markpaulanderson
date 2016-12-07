flashApp.service('animationTest', function() {
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
  function sprite(imageData, animatedPattern, rotation) {

    var that = {};
    //	that.type = type || 1;
    that.frameIndex = 0; //what frame are we on
    that.tickCount = 0; //how many time units have passed in this frame
    that.totalTickCount = 0; //how many ticks have passed totally
    that.maxTicks = 1000; //what is the max life of this animation
    that.ticksPerFrame = imageData.ticksPerFrame || 0; //how many ticks must pass before we switch frames
    that.numberOfFrames = imageData.numberOfFrames || 1; //how mnany frames in the image
    that.isWrap = false; //if off screen, should we wrap to the other side
    that.markedForDestruction = false; //should we destory

    that.rotation = rotation || false;
    //that.currentAngle;
  //  that.angleFunction;
    /*
    1-stationary

    3.-pattern, set and random
    */
    that.animatedPattern = animatedPattern; //is there a pattern


    that.context = imageData.context; //for convas
    that.width = imageData.width;
    that.height = imageData.height;
    that.image = imageData.image;
    that.scaleRatio = 1; //reg
    that.scaleRatio = Math.random() * 0.5 + 0.5; //rnd

    if (that.animatedPattern && that.animatedPattern.length > 0) {
      that.type = 3;
      that.patternIndex = 0;
      that.patternFrame = 0;
      that.isWrap = that.animatedPattern[0].isWrap || false;
      that.x = that.animatedPattern[0].startx;
      that.y = that.animatedPattern[0].starty;
    } else { //stationary
      that.x = 0;
      that.y = 0;
      that.type = 1;
    }

    that.update = function() {

      that.tickCount += 1;
      that.totalTickCount += 1;

      //have we passed enough ticks to move this frame?
      if (that.tickCount > that.ticksPerFrame) {
        //reset the tick count
        that.tickCount = 0;

        // If the current frame index is in range
        if (that.frameIndex < that.numberOfFrames - 1) {
          // Go to the next frame
          that.frameIndex += 1;
        } else { //start from begining of animation
          that.frameIndex = 0;
        }
      }

      //is this aanimiation?
      if (that.animatedPattern && that.animatedPattern.length > 0) {
        that.patternFrame += 1;

        //have we finished the current 'leg' of the animated patter
        if (that.patternFrame > that.animatedPattern[that.patternIndex].patternLength) {
          that.patternFrame = 0;
          that.patternIndex += 1;
          if (that.patternIndex > (animatedPattern.length - 1)) {
            that.patternIndex = 0;
            if (that.animatedPattern[that.patternIndex].isRandom) { //if this is a random pattern set the new params
              that.animatedPattern[that.patternIndex].patternLength = Math.floor(Math.random() * 50);
              that.animatedPattern[that.patternIndex].patternAngle = Math.floor(Math.random() * 360);
              that.animatedPattern[that.patternIndex].speed = Math.floor(Math.random() * 10);
            }
          }
        }
        //calculate x and y
        that.x += Math.round(Math.cos((that.animatedPattern[that.patternIndex].patternAngle / 180) * Math.PI) * 100) / 100 * that.animatedPattern[that.patternIndex].speed;
        that.y += Math.round(Math.sin((that.animatedPattern[that.patternIndex].patternAngle / 180) * Math.PI) * 100) / 100 * that.animatedPattern[that.patternIndex].speed;
        //have we gone off the screen?
        if (that.x + (that.width / that.numberOfFrames) < 0) { //off left
          that.isWrap ? that.markedForDestruction = true : that.x = screen.availWidth - (that.width / that.numberOfFrames) - 1;
        } else if (that.x + (that.width / that.numberOfFrames) > canvas.width) { //of right
          that.isWrap ? that.markedForDestruction = true : that.x = 0;
        }
        if (that.y + that.height < 0) { //off top
          that.isWrap ? that.markedForDestruction = true : that.y = screen.availHeight - that.height - 301; //this number must be higher than the number in else if 4;
        } else if (that.y + that.height > (canvas.height - 300)) { //of bottom (screen is cut off so not sure of bottom exacly)
          that.isWrap ? that.markedForDestruction = true : that.y = 0;
        }
      }

      //is rotation

    };

    that.render = function() {

      if (that.totalTickCount < that.maxTicks && !that.markedForDestruction) {
        // Draw the animation
        var w = that.x; //where we start to draw x
        var h =that.y; //where we start to draw y
        that.context.save();//we do this to

        if (that.rotation){
          w = that.width / that.numberOfFrames / 2;
          h =that.height /2
          that.rotation.currentAngle += that.rotation.angleFunction;
          that.context.translate(that.x+w,that.y+h); //we need to move the 0,0 in order to see the rotation
          that.context.rotate(that.rotation.currentAngle*(3.14/180)); //rotate
          w = -w; //make it negative to put it back when we draw
          h = -h;
        }

        that.context.drawImage(
          that.image,
          that.frameIndex * that.width / that.numberOfFrames,
          0,
          that.width / that.numberOfFrames,
          that.height,
          w,//where to draw the x
          h,
          that.width / that.numberOfFrames * that.scaleRatio,
          that.height * that.scaleRatio);
          that.context.restore();
      } else {
        coinsToDestroy.push(this);
      }
    };

    that.getFrameWidth = function() {
      return that.width / that.numberOfFrames;
    };

    //set position if none
    if (that.x === 0 && that.y === 0) {
      that.x = Math.random() * (canvas.width - that.getFrameWidth() * that.scaleRatio);
      that.y = Math.random() * (canvas.height - that.height * that.scaleRatio);
    }
    return that;
  }

  //call this function to destroy coins
  function destroyCoins() {
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
    coinsToDestroy = [];
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
  function spawnCoin(imageData, animatedPattern, rotation) {
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
    //console.dir(s);
    var coinIndex,
      coinImg;

    // Create sprite sheet
    coinImg = new Image();

    coinIndex = coins.length;

    // Create sprite
    coins[coinIndex] = sprite({
      context: canvas.getContext("2d"),
      width: imageData.imgLength,
      height: imageData.imgHeight,
      image: coinImg,
      numberOfFrames: imageData.numFrames,
      ticksPerFrame: imageData.ticksPer
    }, animatedPattern, rotation);

    //  coins[coinIndex].x = Math.random() * (canvas.width - coins[coinIndex].getFrameWidth() * coins[coinIndex].scaleRatio);
    //  coins[coinIndex].y = Math.random() * (canvas.height - coins[coinIndex].height * coins[coinIndex].scaleRatio);

    //  coins[coinIndex].scaleRatio = Math.random() * 0.5 + 0.5;

    // Load sprite sheet
    //coinImg.src = "images/coin-sprite-animation.png";// 10 1000 h100 transparent
    //coinImg.src = "images/blackFireworks.png"; //15 789 h53 black
    //coinImg.src = "images/Madoka.png"; //8 809 h136 black
    //coinImg.src = "images/Madoka.png"; //8 809 h136 black
    //coinImg.src = "images/yellowFireworks.png"; //10 567 h57 black
    //coinImg.src = "images/tripple.png"; //10 567 h57 black
    coinImg.src = imageData.imageUrl; //12 4800 h200 black
    //console.dir(coinImg)
    console.log("coins.legnth " + coins.length);
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
        console.log("foudn " + i);
        coinsToDestroy.push(coins[i]);
      }
    }


  }

  // Get canvas
  function init(canvasId) {
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

  return {
    init: init,
    destroyCoin: destroyCoin,
    spawnCoin: spawnCoin
  }
});
