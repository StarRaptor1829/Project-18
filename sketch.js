var PLAY=1
var END=0
var gameState= PLAY
var monkey , monkey_running, monkey_stop
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime=0
var bananaCount=0
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_stop=loadAnimation("sprite_0.png")
  obstacleImage=loadImage("obstacle.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey=createSprite(80,315,20,20);
monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1
  
  ground = createSprite(400,350,900,10);
  
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)
  score=0
  
  
   obstacleGroup = createGroup();
  fruitGroup = createGroup();
}


function draw() {
background("white");
  stroke("white");
  textSize(20)
  fill("white")
  text("Score:"+score,500,50);
  
    if (gameState===PLAY){
      monkey.velocityY = monkey.velocityY + 0.8
  if(keyDown("space")&& monkey.y >= 300){
    monkey.velocityY=-18
    
  }
      survivalTime=Math.ceil(frameCount/frameRate())
  obstacles()
   bananas()
      if(obstacleGroup.isTouching(monkey)){
        monkey.scale=monkey.scale-0.01;
        obstacleGroup.destroyEach();
        bananaCount=bananaCount-1
        if(bananaCount<-7){
          gameState=END;
        }
      }
      if(fruitGroup.isTouching(monkey)){
        fruitGroup.destroyEach();
        bananaCount=bananaCount+1
        switch(bananaCount){
    case 5: monkey.scale=0.12;
      break;
      case 10: monkey.scale=0.14;
      break;
      case 15: monkey.scale=0.16;
      break;
      case 20: monkey.scale=0.18;
      break;
      case 25: monkey.scale=0.20;
      break;
    default:break;
  }
      }
    }
  else if (gameState === END) {
    monkey.velocityY=0
    obstacleGroup.setVelocityXEach(0)
    fruitGroup.setVelocityXEach(0)
    fruitGroup.destroyEach();
    stroke("red")
  textSize(50)
  fill("red")
    text("GAME OVER!", 50,200);
    //monkey.addAnimation(monkey_stop)
  }
    
    
    
  monkey.collide(ground);
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  stroke("black")
  textSize(20)
  fill("black")
  
  text("Survival Time: "+ survivalTime, 100, 50)
  
   stroke("black")
  textSize(20)
  fill("black")
  
  text("Banana gotten: "+ bananaCount, 100, 100)
  
  
  //if(banana.isTouching(monkey)){
  
  
   //fruitGroup.destroyEach()
    
  //}
  
  
  drawSprites()
}

function obstacles(){
  if(frameCount%100===0){
    var obstacle=createSprite(400,325,20,20);
    obstacle.scale=0.10
    obstacle.addImage("rock", obstacleImage)
    obstacle.velocityX=-5;
    obstacle.lifeTime=100;
    obstacleGroup.add(obstacle);
  }
  
}
function bananas(){
  if(frameCount%80===0){
    var banana=createSprite(400,random(150,200),20,20);
    banana.scale=0.15
    banana.addImage("banana", bananaImage)
    banana.velocityX=-5;
    banana.lifeTime=100;
    fruitGroup.add(banana);
  }
  
}




