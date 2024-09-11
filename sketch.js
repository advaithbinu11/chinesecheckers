const {Engine, World, Bodies, Mouse, MouseConstraint, Constraint} = Matter;
let engine, world, mConstriant,mouse;
var checkers=[];
var checkersclicked = [];
var numselected = 0;
var lastbodyclicked = -1;
var prevbodyclicked = -1;
var lock = false;
var start =0;
function preload() {
}

function setup() {
	var canvas = createCanvas(displayWidth, displayHeight);
  engine = Engine.create();
  world = engine.world;
  mouse = Mouse.create(canvas.elt);
  mConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
          stiffness: 0.2,
          render: {
              visible: false
          }
      }
  });

// Add the mouse constraint to the world
  World.add(world, mConstraint);
  Engine.run(engine);
  for(var h=100;h<=200;h=h+100){
    for(var p=630; p<=810; p=p+90){
      checkers.push(new Plinko(p,h,20))
    }
  }
  for(var h=300;h<=500;h=h+100){
    for(var p=450; p<=990; p=p+90){
      checkers.push(new Plinko(p,h,20))
    }
  }
  for(var h=600;h<=700;h=h+100){
    for(var p=630; p<=810; p=p+90){
      checkers.push(new Plinko(p,h,20))
    }
  }
  platform = new Particle(720,735,1000,10)
  World.add(world, platform);
  platform2 = new Particle(370,305,10,1000)
  platform3= new Particle(1050,305,10,1000)
  platform4= new Particle(720,55,1000,10)
  World.add(world, platform);
  checkers[16].setWhite();
  start = Date.now();
}
//Width:1366,ratio: 3.415
//Height:656,ratio: 1.64
//Width:1366,ratio:3.415
//Height:656,ratio:1.64

function draw() {
  document.getElementById("myElement").textContent = "time played = "+Math.floor((Date.now() - start) / 1000);
  document.getElementById("myElement2").textContent = "move = "+Math.floor(numselected/2);
  Engine.update(engine)
  rectMode(CENTER);
  background('#fae');
  drawSprites();
  platform.display();
  platform2.display();
  platform3.display();
  platform4.display();
  for(var f=0; f<checkers.length;f++){
    checkers[f].display();
  }
  Matter.Events.on(mConstraint, 'mousedown', function(event) {
    const mousePosition = mouse.position;
      // Add your click handling logic here
      for(var f=0; f<checkers.length;f++){
        if(calcHypotenuse((checkers[f].getXcord()-mouseX),(checkers[f].getYcord()-mouseY))<20){
          if(lastbodyclicked!=f){
            checkersclicked.push(f);
            console.log(checkersclicked);
            prevbodyclicked = lastbodyclicked;
            lastbodyclicked=f;
            numselected+=1;
          if(numselected%2==1){
            if(checkers[f].isAvailable()){
              console.log("continued!")
              numselected-=1;
              continue;
            }
            else{
              checkers[f].setRed(f);
            }
          }
          else if(numselected%2==0){
            if(checkers[f].isAvailable()){
              if(checkerAdjacent(checkers[prevbodyclicked].getXcord(),checkers[lastbodyclicked].getXcord(),checkers[prevbodyclicked].getYcord(),checkers[lastbodyclicked].getYcord())){
                checkers[prevbodyclicked].setWhite();
                findChecker(checkers[prevbodyclicked].getXcord(),checkers[lastbodyclicked].getXcord(),checkers[prevbodyclicked].getYcord(),checkers[lastbodyclicked].getYcord())
                checkers[f].setBlack(f);
                console.log("Set 1");
                lastbodyclicked = -1;
                prevbodyclicked = -1;
                checkersclicked.pop();
              }
            }
            else{
                numselected-=1;
                checkers[prevbodyclicked].setBlack();
                checkers[f].setRed();
                console.log(numselected+"   "+checkers[prevbodyclicked].isAvailable());
            }
          }
        }
      }
      }
    });
    //            lastbodyclicked = -1;
   // prevbodyclicked = -1;
function calcHypotenuse(a, b) {
  return Math.sqrt(a * a + b * b);
}
function findChecker(x1,x2,y1,y2){
  var midc = 0;
  if(x1==x2){
    midc = (y1+y2)/2;
    for(var g = 0; g<checkers.length;g++){
      if(x1==checkers[g].getXcord()&&midc==checkers[g].getYcord()){
        checkers[g].setWhite();
      }
    }
  }
  else if(y1==y2){
    midc = (x1+x2)/2;
    for(var g = 0; g<checkers.length;g++){
      if(y1==checkers[g].getYcord()&&midc==checkers[g].getXcord()){
        checkers[g].setWhite();
      }
    }
  }
}
}
function checkerAdjacent(x1,x2,y1,y2){
  var midc = 0;
  var filled=false;
  if(x1==x2){
    midc = (y1+y2)/2;
    for(var g = 0; g<checkers.length;g++){
      if(x1==checkers[g].getXcord()&&midc==checkers[g].getYcord()){
        if(!checkers[g].isAvailable()){
          filled=true;
        }
      }
    }
    return Math.abs(y1-y2)<=200&&filled;
  }
  else if(y1==y2){
    midc = (x1+x2)/2;
    for(var g = 0; g<checkers.length;g++){
      if(y1==checkers[g].getYcord()&&midc==checkers[g].getXcord()){
        if(!checkers[g].isAvailable()){
          filled=true;
        }
      }
    }
    return Math.abs(x1-x2)<=200&&filled;
  }
  return false;
}
