/*
<div class="col-md-12">
  <canvas id="myCanvas" width="640" height="640" style="border:2px solid #CC9966;"/>
</div>
#myCanvas{
  margin: 0 auto;
  display:block;
  background-color: #FFCC99;
}
*/

var board = {
  "bR": [
    [0, 0],
    [7, 0]
  ],
  "bN": [
    [1, 0],
    [6, 0]
  ],
  "bB":[
    [2, 0],
    [5, 0]
  ],
  "bQ":[[3,0]],
  "bK":[[4,0]],
  "bP":[[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1]],
  "wR": [
    [0, 7],
    [7, 7]
  ],
  "wN": [
    [1, 7],
    [6, 7]
  ],
  "wB":[
    [2, 7],
    [5, 7]
  ],
  "wQ":[[3,7]],
  "wK":[[4,7]],
  "wP":[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6]]

};



var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var width = 80;
ctx.strokeStyle = "#CC9966";
for (i = 0; i < 8; i++) {
  for (j = 0; j < 8; j++) {
    ctx.moveTo(0, width * j);
    ctx.lineTo(640, width * j);
    ctx.stroke();

    ctx.moveTo(width * i, 0);
    ctx.lineTo(width * i, 640);
    ctx.stroke();
    var left = 0;
    for (var a = 0; a < 8; a++) {
      for (var b = 0; b < 8; b += 2) {
        startX = b * width;
        if (a % 2 == 0) startX = (b + 1) * width;
        ctx.fillStyle = "#CC9966";
        ctx.fillRect(startX + left, (a * width), width, width);
      }
    }
  }
}

for (var key in board) {
 drawImage(key, board[key]);
}

function drawImage(k, v){
  var img = new Image();
  img.src = "src/img/" + k + ".png";
  img.onload = function() {
    for (var i = 0; i < v.length; i++) {
        console.log("k: " + k + "i: " + 1 + "x: " + v[i][0] * width + " y: " + v[i][1] * width);
        ctx.drawImage(img, v[i][0] * width, v[i][1] * width);
      }
    };
}
