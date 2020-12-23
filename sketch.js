

var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var iground;
var SurvivalTime;


function preload() {


  monkey_running = loadImage("sprite_0.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
backimg=loadImage("back.png");
 
}



function setup() {
  createCanvas(windowWidth,windowHeight);
  background("pink")
  
  
  monkey = createSprite(100, 360, 20, 20);
  monkey.addImage("shrey", monkey_running);
  monkey.scale = 0.1;


  ground = createSprite(400, 350, 900, 10);
  ground.x = ground.width / 2;
  ground.velocityX = -5;
  ground.visible = false;

  iground = createSprite(400, 360, 900, 10);
  bananaGroup = new Group();
  obstaclesGroup = new Group();
}

SurvivalTime = 0

function draw() {
  background("lightgreen");
  
  text("SurvivalTime: " + SurvivalTime, 400, 50);

  food();
  spawobstacles();
  


  if (ground.x < 0.1) {
    ground.x = ground.width / 2;
    SurvivalTime = SurvivalTime + Math.round(getFrameRate() / 60);
  }
  if (keyDown("space") && monkey.y >= 100) {
    monkey.velocityY = -10;

  }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(iground);
  if (bananaGroup.isTouching(monkey)) {
    bananaGroup.destroyEach();
    SurvivalTime = SurvivalTime + Math.round(getFrameRate() / 60);
     monkey.scale = 0.1+0.01;
  }
 
  if (obstaclesGroup.isTouching(monkey)) {
    obstaclesGroup.destroyEach();
    SurvivalTime = SurvivalTime + Math.round(getFrameRate() / 60);
     monkey.scale = 0.1-0.05;
  }
  
  drawSprites();
}

function food() {
  if (World.frameCount % 80 == 0) {

    banana = createSprite(550, 190, 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 150;

    bananaGroup.add(banana);

  }
}

function spawobstacles() {
  if (World.frameCount % 90 == 0) {

    obstacle = createSprite(550, 335, 10, 40);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;
    obstacle.lifetime = 150;

    obstaclesGroup.add(obstacle);

  }
}