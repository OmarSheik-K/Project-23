var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	
	//Creating sprites
	packageSprite=createSprite(width/2, 200, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)

	//Creating engine and world
	engine = Engine.create();
	world = engine.world;
	
	//Creating package Body
	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.4, isStatic:true});
	World.add(world, packageBody);
	

	//Creating ground Body
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);

	//position of the leftmost box
 	boxPosition=width/2-100
 	boxY=610;

	//sprite then Body of left
 	boxleftSprite=createSprite(boxPosition, boxY, 20,100);
 	boxleftSprite.shapeColor=color(255,0,0);

 	boxLeftBody = Bodies.rectangle(boxPosition+20, boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxLeftBody);//the body has a small off set to make it look better(but that also makes it hard to hit and see)

	//sprite then Body of bottom
 	boxBase=createSprite(boxPosition+100, boxY+40, 200,20);
 	boxBase.shapeColor=color(255,0,0);

 	boxBottomBody = Bodies.rectangle(boxPosition+100, boxY+45-20, 200,20 , {isStatic:true} );
 	World.add(world, boxBottomBody);

	//sprite then body of right
 	boxrightSprite=createSprite(boxPosition+200 , boxY, 20,100);
 	boxrightSprite.shapeColor=color(255,0,0);

 	boxRightBody = Bodies.rectangle(boxPosition+200-20 , boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxRightBody);


	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);
 
  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y

  console.log(packageBody.position.y)

  /* I tried to reset it if it hit the ground but after resetting it wouldn't collide with anything
  if(packageSprite.x <  300 && packageSprite.y >600) {
	  reset();
  }
  else if(packageSprite.x > 500 && packageBody.position.y >600){
	  reset();
  }
  */

  drawSprites();
 
}

function keyPressed(){
  if(keyCode == DOWN_ARROW) {
	Matter.Body.setStatic(packageBody, false);
  }
  else if (keyCode === LEFT_ARROW ) {
	helicopterSprite.x=helicopterSprite.x-20;
	//the first 'if' happens when the key is pressed
	if(packageBody.position.y < 201){
	//the second 'if' only when it has *also* not been dropped yet
	translation={x:-20,y:0}
	Matter.Body.translate(packageBody, translation)
	}
  } 
  else if (keyCode === RIGHT_ARROW ) {
	helicopterSprite.x=helicopterSprite.x+20;
	if (packageBody.position.y < 201) {
	translation={x:20,y:0}
	Matter.Body.translate(packageBody, translation)
	}
  }
}


/*
function reset(){
	packageBody.position.x = helicopterSprite.x;
	packageBody.position.y = helicopterSprite.y;
	Matter.Body.setStatic(packageBody, true);
}
*/