var score =0;
var start = 0;//0 is splash and 1 is game
var Blast;
var xPositions = [];
var yPositions = [];
var life = 0;
var Button = function(config) {//creates the button object type
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.width = config.width || 150;
    this.height = config.height || 50;
    this.label = config.label || "Click";
    this.onClick = config.onClick || function() {};
};
for(var j=0;j<50;j++){
        xPositions.push(round(random(0,400)));
        yPositions.push(round(random(-100,0)));
}
var Asteroid = function(x, y,h) {  // Makes the variable asteroid into a function. Defines the x, y, and h variable in this function.
    this.x = x;
    this.y = y;
    this.h = h;
};
 var asteroids = []; //Makes variable asteroids into an array 
for (var i = 0; i < 100; i++) {  //For loop that pushes new asteroids onto the screen.
    asteroids.push(new Asteroid(random(20,380), i * -33, 50));
}
    
Button.prototype.draw = function() {//Draws the button method
    fill(0, 234, 255);
    rect(this.x, this.y, this.width, this.height, 5);
    fill(0, 0, 0);
    textSize(19);
    textAlign(LEFT, TOP);
    text(this.label, this.x+10, this.y+this.height/4);
};

Button.prototype.isMouseInside = function() {//Checks if mouse is inside
    return mouseX > this.x &&
           mouseX < (this.x + this.width) &&
           mouseY > this.y &&
           mouseY < (this.y + this.height);
};
Button.prototype.handleMouseClick = function() {//Handling the mouse click part
    if (this.isMouseInside()) {
        this.onClick();
    }
};
var btn1 = new Button({//Creates a button object
    x: 150,
    y: 280,
    width: 100,
    label: "START!",
    onClick: function() {
        start =1;
    }
});
mouseClicked = function() {
    btn1.handleMouseClick();
};
var Spaceship = function(x, y) {//Creates a Spaceship object type
    this.x = x;
    this.y = y;
};
Spaceship.prototype.draw = function() {//Draws the spaceship
noStroke();
fill(82, 80, 80);
triangle(this.x,this.y-20,this.x+15,this.y,this.x-15,this.y);
rect(this.x-8,this.y-18,2,10);
rect(this.x+6,this.y-18,2,10);
fill(12, 18, 11);
triangle(this.x-10,this.y,this.x-5,this.y-5,this.x,this.y);
triangle(this.x,this.y,this.x+5,this.y-5,this.x+10,this.y);
fill(7, 201, 0);
ellipse(this.x,this.y-10,5,10);
fill(255, 102, 0);
triangle(this.x-15,this.y,this.x-13,this.y+5,this.x-10,this.y);
triangle(this.x+10,this.y,this.x+13,this.y+5,this.x+15,this.y);
};
Spaceship.prototype.move = function(){//How the spaceship moves
    if (keyIsPressed && keyCode === LEFT&& this.x>15) {
        this.x -=4;
    }if (keyIsPressed && keyCode === RIGHT&&this.x<385) {
        this.x +=4;
    }
};
var Blast = function(x,y){
    this.curX = x;
    this.curY =y;
};
var blasts = [];
Spaceship.prototype.shoot = function(){//called when space is pressed 
   // Blast.draw();00
   blasts.push(new Blast(this.x,this.y));
   for(var i =0;asteroids.length>i;i++){
    if(asteroids[i].x>= (this.x-20) && asteroids[i].x<=(this.x+35)&&(asteroids[i].y > 0)){
        //println(asteroids.length);
        score= score+round(random(3.5,5.5));
        asteroids[i].x=random(20,380);
        asteroids[i].y=i*-33;
        
    }   
   }
};
Spaceship.prototype.checkForCollision = function(Asteroid){
    if((Asteroid.x>= (this.x-20) && Asteroid.x<=(this.x+35))&&
    (Asteroid.y >= this.y && Asteroid.y <=(this.y))){
        Asteroid.y=i*-33;
        Asteroid.x=random(20,380);
        life++;
    }
};
Blast.prototype.draw = function(){//The visual effect for the Blast shot
   for(var i =0;this.curY>0;this.curY-=3){
   fill(0, 255, 204);
   ellipse(this.curX,this.curY-30,4,15);
   }
};
var splash = function(){//Pre game screen
    background(7, 5, 43);
    textSize(36);
    fill(0, 161, 43);
    text("Asteroids",116,12);
    textSize(18);
    text("Instructions:",30,69);
    text("Use Left and Right to rotate the",126,69);
    text("spaceship and press space to shoot. Score is",30,91);
    text("determined by asteroids destroyed.",30,111);
    text("Created by Bobby Thayer and John Parkhurst",25,362);
    image(getImage("space/star"),33,141,50,50);
    image(getImage("space/star"),92,122,50,50);
    image(getImage("space/star"),33,312,50,50);
    image(getImage("space/star"),74,252,50,50);
    image(getImage("space/star"),0,210,50,50);
    image(getImage("space/star"),72,187,50,50);
    image(getImage("space/star"),193,121,50,50);
    image(getImage("space/star"),259,141,50,50);
    image(getImage("space/star"),234,242,50,50);
    image(getImage("space/star"),295,201,50,50);
    image(getImage("space/star"),325,155,50,50);
    image(getImage("space/star"),93,298,50,50);
    image(getImage("space/star"),24,259,50,50);
    image(getImage("space/star"),275,289,50,50);
    image(getImage("space/star"),319,256,50,50);
    image(getImage("space/star"),337,310,50,50);
    image(getImage("space/rocketship"),100,100);
    btn1.draw();
};
//Asteroids
Asteroid.prototype.draw = function() { //The draw method for the asteroid.
    fill(74, 72, 64);
    noStroke();
    ellipse(this.x*this.h/50,this.y*this.h/50,29*this.h/50,28*this.h/50);
ellipse((this.x-9)*this.h/50,(this.y+6)*this.h/50,15*this.h/50,15*this.h/50);
ellipse((this.x-10)*this.h/50,this.y*this.h/50,21*this.h/50,15*this.h/50);
ellipse((this.x-12)*this.h/50,(this.y-5)*this.h/50,15*this.h/50,15*this.h/50);
ellipse((this.x-5)*this.h/50,(this.y-11)*this.h/50,15*this.h/50,15*this.h/50);
ellipse((this.x+3)*this.h/50,(this.y-11)*this.h/50,17*this.h/50,15*this.h/50);
ellipse((this.x+9)*this.h/50,(this.y-6)*this.h/50,16*this.h/50,14*this.h/50);
ellipse((this.x+10)*this.h/50,(this.y+2)*this.h/50,16*this.h/50,14*this.h/50);
ellipse((this.x+8)*this.h/50,(this.y+9)*this.h/50,14*this.h/50,14*this.h/50);
ellipse(this.x*this.h/50,(this.y+11)*this.h/50,14*this.h/50,14*this.h/50);
};


var Alpha = new Spaceship(100,390);//Creates the spaceship
var game = function(){//What actually happens in the game
var remaining = 3-life;
    background(12, 18, 11);
    fill(255, 174, 66);
ellipse(350,30,200,200);
fill(255, 0, 0);
stroke(255,174,66);
line(187,0,244,10);
line(187,29,244,32);
line(187,60,247,58);
line(195,98,255,80);
line(217,129,269,101);
line(236,157,288,117);
line(268,182,306,127);
line(304,199,323,135);
line(336,205,348,138);
line(371,210,369,138);
line(403,211,388,134);

for (var j = 4; j <28; j++) {
    for (var i = 0; i <16; i++) {
        noStroke();
        fill(104, 107, 105);
        triangle(i*22,j*23,i*48,j*45,i*66,j*60); //Makes the spaceship look like its going through lightspeed
    }
}
    
    fill(255, 255, 255);
    textSize(15);
    text(score, 25,30);
    text("Lives: "+remaining,300,30);
    Alpha.draw();
    Alpha.move();
    noStroke();

    for (var i = 0; i < asteroids.length; i++) //for loop that draws the asteroids 
{
     //calls and draws the asteroids from the array
    asteroids[i].draw();
    Alpha.checkForCollision(asteroids[i]); 
    if(life<=3){
     if(score<=200){
        asteroids[i].y += 1;
    }else if(score>200&&score<600){
        asteroids[i].y +=2;
    }else{
        asteroids[i].y +=3;   
    }
    }
    
     //Causes the asteroids to fall down. Issue with respawn causes 
    
    if(asteroids[i].y>450){
        asteroids[i].y= i*-33;
        score--;
    }
    
    } 
};
var end = function(){
  background(7, 5, 43);
    textSize(50);
    fill(0, 161, 43);
    text("Game  Over!",70,50);
    textSize(18);
    image(getImage("space/star"),33,141,50,50);
    image(getImage("space/star"),92,122,50,50);
    image(getImage("space/star"),74,252,50,50);
    image(getImage("space/star"),0,210,50,50);
    image(getImage("space/star"),72,187,50,50);
    image(getImage("space/star"),193,121,50,50);
    image(getImage("space/star"),259,141,50,50);
    image(getImage("space/star"),234,242,50,50);
    image(getImage("space/star"),295,201,50,50);
    image(getImage("space/star"),325,155,50,50);
    image(getImage("space/star"),93,298,50,50);
    image(getImage("space/star"),24,259,50,50);
    image(getImage("space/star"),275,289,50,50);
    image(getImage("space/star"),319,256,50,50);
    image(getImage("space/rocketship"),100,100);
  text("Score: "+score,150,280);
  text("Created by Bobby Thayer and John Parkhurst", 10,355);
  text("Thanks for Playing, Press Restart to try again!", 10,375);
};


var draw = function() {//Draws the overall program
    if(start ===0){
        splash();
    }else if(start ===1){
     game();
     if (keyIsPressed &&keyReleased&& keyCode === 0) {
         Alpha.shoot();
     }
     if(life >3){//checks if out of lives
        start++;}
    }else if(start ===2){
        end();
        
    }
    if(blasts.length>0){
        for(var i = 0; i<blasts.length;i++){
        blasts[i].draw();
        }}};
