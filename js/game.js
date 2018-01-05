//create "canvas" and "ctx"
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

//set height and width of the canvas
ctx.canvas.width = window.innerHeight*(9/16);
ctx.canvas.height = window.innerHeight;

//create mousedown event trigger
canvas.addEventListener("mousedown", getPosition, false);

//grid variables
var grid = new Object();
grid.width = ctx.canvas.width;
grid.height = ctx.canvas.height;
grid.tileC = 4;
grid.vSection = grid.width/grid.tileC;
grid.hSection = grid.height/grid.tileC;
grid.rate = grid.height*0.005;
grid.clickY = [grid.hSection*(grid.tileC-2), grid.hSection*(grid.tileC-1)];
grid.clickX = [];
for(var i = 0; i < grid.tileC+1; i++) grid.clickX.push(i*grid.vSection);
console.log(grid);
var offset = -grid.hSection*grid.tileC;
var clickState = false;
var score = 0;

//animation init
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

//random position generator
function posGen(){
  return Math.floor(Math.random() * grid.tileC);
}

//current tile array
var tiles = new Array();
for(var i = 0; i < grid.tileC; i++) tiles.push(posGen());

//mouse click
function getPosition(event)
{
  var x = event.x;
  var y = event.y;
  var canvas = document.getElementById("game");
  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  if(y >= grid.clickY[0]+offset && y <= grid.clickY[1]+offset && x >= grid.clickX[tiles[grid.tileC-1]] && x >= grid.clickX[tiles[grid.tileC-1]]) clickState = true;
}

//draw function
function draw(){


      //rate of the tile movement
      offset += grid.rate;

      //reset animation
      if (offset >= grid.hSection){
          tiles.pop();
          tiles.unshift(posGen());
          offset = 0;
          if(clickState == false){
            offset = -grid.hSection*grid.tileC;
            score = 0;
            grid.rate = grid.height*0.005;
          }
          else{
            score++;
            clickState = false;
            grid.rate += 0.1;
          }
      }

  //create the background
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0,0,grid.width, grid.height);

  //draw tiles
  ctx.fillStyle = "#000000";
  for(var i = 0; i < grid.tileC; i++){
    if(i == grid.tileC-1 && clickState == true) ctx.fillStyle = "#808080";
    else ctx.fillStyle = "#000000";
    ctx.fillRect(tiles[i]*grid.vSection, grid.hSection*i-grid.hSection+offset, grid.vSection, grid.hSection);
  }

  //create the borders
  ctx.fillStyle = "#000000";
  for(var i = 0; i < grid.tileC; i++) ctx.fillRect(i*(grid.vSection), 0, 1, grid.height);
  for(var i = 0; i < grid.tileC; i++) ctx.fillRect(0, i*(grid.hSection-2)+offset, grid.width, 1);

  //show score
  ctx.fillStyle = "#000FFF"
  ctx.font="30px Arial";
  ctx.fillText(score, 20, 40)

  requestAnimationFrame(draw);
}

draw();
