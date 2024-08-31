class Plinko{ 
    constructor(x,y,r){
        var options={
            'restitution':0.8,
            'friction':0.3,
            'density':1.0,
            'isStatic':true,    
        }
        this.body=Bodies.circle(x,y,r,options);
        this.x=x;
        this.y=y;
        this.r=r;
        this.color = "Black";
        World.add(world,this.body);
    }
    setColor(){
        this.color = "White";
    }
    setColorFirst(){
        this.color = "Red";
    }
    setColorSecond(){
        this.color = "Black";
    }
    isAvailable(){
        return this.color=="White";
    }
    getXcord(){
        return this.x;
    }
    getYcord(){
        return this.y;
    }
    display(){
        var angle=this.body.angle
        push();
        translate(this.body.position.x,this.body.position.y);
        rotate(angle);
        ellipseMode(RADIUS);
        strokeWeight(4);
        stroke("Black");
        fill(this.color);
        ellipse(0,0,this.r,this.r);
        pop()
    }
}