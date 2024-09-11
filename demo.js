const {Engine, World, Bodies, Mouse, MouseConstraint, Constraint} = Matter;
let engine, world, mConstriant,mouse;
var checkers=[];
var checkersclicked = [28, 16, 21, 23, 30, 22, 15, 27, 32, 30, 30, 22,3,15,6,8,9,7,20,6,6,8,11,9,2,10,17,5,0,2,2,10,29,17,26,24,23,25,12,26,26,24,9,11,11,25,25,23,23,21,21,7,7,9,16,18,4,16,15,17,18,16];
var numselected = 0;
var index = 0;
var prevbodyclicked = -1;
var lock = false;
var start =0;
var click =true;
function preload() {
}

function setup() {
	var canvas = createCanvas(displayWidth, displayHeight);
  engine = Engine.create();
  world = engine.world;
  mouse = Mouse.create(canvas.elt);
  click=true;
  mConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});
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
  document.getElementById("myElement").textContent = "Moves left: " + (31-Math.floor(index/2));
  document.getElementById("myElement2").textContent = "move = "+Math.floor(index/2);
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
    if(index/2<31){
    if(click){
      console.log('clicked ' + index+' '+checkersclicked[index]);
      // Add your click handling logic here
      checkers[checkersclicked[index]].setRed();
      index+=1;
      click=false;
      if(index%2==0){
        console.log(prevbodyclicked);
        checkers[prevbodyclicked].setBlack();
        findChecker(checkers[checkersclicked[index-2]].getXcord(),checkers[prevbodyclicked].getXcord(), checkers[checkersclicked[index-2]].getYcord(), checkers[prevbodyclicked].getYcord());
        checkers[checkersclicked[index-2]].setWhite();
      }
      prevbodyclicked = checkersclicked[index];
        }
      };
        })
        Matter.Events.on(mConstraint, 'mouseup', function(event) {
          click=true;
              })
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
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
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
