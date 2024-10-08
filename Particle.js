class Particle{
    constructor(x,y,width,height){
        var options={
            'restitution':0.4,
            'isStatic':true
        }
        this.width = width;
        this.height = height;
        this.body=Bodies.rectangle(x,y,width,height,options);
        this.color='Brown'
        World.add(world,this.body)
    }
    display(){
        var pos=this.body.position
        var angle=this.body.angle
        push();
        translate(pos.x,pos.y);
        rotate(angle);
        rectMode(CENTER);
        fill(this.color)
        rect(0,0,this.width,this.height);
        pop();
    }
}