// * debug this entire document lmao

// -- instantiating the HTML5 canvas

var canvas = document.getElementById("theCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// -- testing the drawing the player character

// required variables
var c = canvas.getContext('2d');

// keyPress event object
var keyPress = {
    key: undefined,
    keyCode: undefined
}

window.addEventListener('keydown', 
    function() {
    keyPress.key = event.key;
    keyPress.keyCode = event.code;
    console.log(event);
})


// -- player class
// * add detection of player input and figure out the integration of objects later
// * integrate player input and player movement into the character controller

var colorArray = ['blue', 'red', 'yellow', 'green', 'pink', 'cyan', 'purple', 'orange', 'black']

function Player(x,y,radius) {
    
    // player object attributes
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    // drawing method
    this.draw() = function() {
        console.log("player circle has been instantiated");
        c.beginPath();
        c.arc(this.x,this.y,this.radius,Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke();
        c.fillStyle = this.color;
        c.fill();
    }

    // update method
    this.update() = function() {
        // * integrate this portion into the main update() loop later
        console.log(keyPress.key);
        switch(keyPress.key) {
            case 'w':
                this.y -= 1;
            case 'W':
                this.y -= 1;
            case 's':
                this.y += 1;
            case 'S':
                this.y += 1;
            case 'a':
                this.x -= 1;
            case 'A':
                this.x -= 1;
            case 'd':
                this.x += 1;
            case 'D':
                this.x += 1;
        }
        this.draw();
        console.log(this.x, this.y);
    }

}

var player1 = new Player(innerWidth/2, innerHeight/2, 10);

// actual animation loop

function animate() {
    requestAnimationFrame(animate); // recursive function
    c.clearRect(0,0,innerWidth,innerHeight);
    player1.update();
}

animate();
