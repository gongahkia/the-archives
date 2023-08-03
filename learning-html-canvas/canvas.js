console.log("walao eh");

var canvas = document.getElementById("shitCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);

// the variable c refers to context
var c = canvas.getContext('2d');
c.fillRect(0,0,100,100);
c.fillRect(0,200,100,100);
c.fillRect(200,0,100,100);
c.fillRect(100,100,100,100);
c.fillRect(200,200,100,100);
