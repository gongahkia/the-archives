// -- instantiating the HTML5 canvas

var canvas = document.getElementById("theCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// -- testing the drawing the player character

// required variables
var c = canvas.getContext('2d');
var x = innerWidth/2;
var y = innerHeight/2;
var radius = 10;
var colorArray = ['blue', 'red', 'yellow', 'green', 'pink', 'cyan', 'purple', 'orange', 'black']
var color = colorArray[Math.floor(Math.random() * colorArray.length)];

// actual drawing methods
c.beginPath(); 
c.arc(x,y,radius,0,Math.PI * 2, false);
c.strokeStyle = color;
c.stroke();
c.fillStyle = color;
c.fill();

// -----


// -- player class
// * add detection of player input and figure out the integration of objects later
// * integrate player input and player movement into the character controller

/* function player(x:number,y:number,radius:number) {
    
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.draw() {
        var colorArray = ['blue', 'red', 'yellow', 'green', 'pink', 'cyan', 'purple', 'orange', 'black']
        var color = colorArray[Math.floor(Math.random() * colorArray.length)];
        c.beginPath();
        c.arc(x,y,radius,Math.PI * 2, false);
        c.strokeStyle = color;
        c.stroke();
        c.fillStyle = color;
        c.fill();
    };

    this.update() {
        this.draw();
    }

} */

// testing the instantiating of the player character 
// * continue working on this one

// var player1 = new player(innerWidth/2, innerHeight/2, 10);
