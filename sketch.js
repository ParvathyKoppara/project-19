var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
 // tower.addImage("tower",towerImg);
  tower.velocityY = 2;
  
  ghost = createSprite (200,200,50,50);
  ghost.addImage("ghost-standing.png", ghostImg);
  ghost.scale = 0.3;

  doorsGroup = new Group ();
  climbersGroup = new Group ();
  invisibleBlockGroup = new Group ();
}


function draw() {
  background(0);
  if (gameState === "play"){
    if(keyDown("space")){
      ghost.velocityY = -8;
  }

  if(keyDown("left_arrow")){
    ghost.x = ghost.x - 2
  }

  if(keyDown("right_arrow")){
    ghost.x = ghost.x + 2
  }
   ghost.velocityY = ghost.velocityY + 0.5;

  if(tower.y > 400){
    tower.y = 300
  }
  spawnDoors();

 


  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  if (invisibleBlockGroup.isTouching(ghost) && ghost.y > 600){
    ghost.destroy();
    gameState = "end";
  }
  if (ghost.y <= 15){
    ghost.destroy();
    gameState = "end";
  }
  if (ghost.y >= 400){
    ghost.destroy();
    gameState = "end"
  }

     drawSprites();
  }
  
  if(gameState ==="end"){
    fill ("red");
    textSize(50);
    text("Game Over", 200,200)
    
  }
      
    }
    
    
  

function spawnDoors(){

  if (frameCount%250===0){
 var door = createSprite (200,-50);
 door.x = Math.round(random(100,500));
  door.addImage("door.png",doorImg);
  door.scale = 1
  door.velocityY = 1;


  var climber = createSprite (door.x,door.y+55)
  climber.addImage("climber.png", climberImg);
  climber.scale = 1
  climber.velocityY = 1;
  climber.x = door.x;

  var invisibleBlock = createSprite (200,15);
  invisibleBlock.width = climber.width;
  invisibleBlock.height = 2;
  invisibleBlock.velocityY = 1

  ghost.depth = door.depth
  ghost.depth += 1;

  door.lifetime = 700;
  climber.lifetime = 700;
  invisibleBlock.lifetime = 700;

  doorsGroup.add(door);
  climbersGroup.add(climber);
  invisibleBlockGroup.add(invisibleBlock);
  invisibleBlock.debug = true;
  
 }
}