// FUA
  // immediate
    // add code that reads a text file and creates a list of relevant coordinates within the world file
    // add serialization code that serializes the world object to a json file that can be read 
    // add code and clean up code within the drawScreen function to handle drawing other entities besides the player and handle drawing of diff kinds of entities accordingly
    // furtehr edit textureAtlas for other coords especially those with animations
    // find appropriate sprites
    // add diagonal movement
    // handle collision checks
    // figure out how to size sprites, and render screen accordingly
  // 2 implement
    // sort out player animation first
    // heavy-duty refactoring in order for all the functions to take in universal inputs and translate to universal outputs
    // to add world clock also, ask GPT how to do this
    // add panning camera later once animation sorted
    // work out rendering of text to screen as UI, sprite text import
    // separate files to ensure each file can be easily edited, textureatlas and world json shud be in a diff file altogether at the very least

alert("tikrit begins");

// ---------- LEGEND ----------
// . => air block
// P => player
// B => block
// E => enemy
// I => item 

// ---------- CANVAS ----------

// instantiating canvas
const c1 = document.getElementById("c1");
c1.width = window.innerWidth;
c1.height = window.innerHeight;
console.log(c1);
const c = c1.getContext("2d");

// half-screen size => 798 width, 789 height
// full-screen size => 1600 width,  789 height

// ---------- PREP WORK ----------

const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
};

const textureAtlas = {

  player: {

    idle: {
      f1: { x: 0, y: 0 },
      f2: { x: 32, y: 0 },
      f3: { x: 64, y: 0 },
      f4: { x: 96, y: 0 },
    },
    run: {
      f1: { x: 0, y: 32 },
      f2: { x: 32, y: 32 },
      f3: { x: 64, y: 32 },
      f4: { x: 96, y: 32 },
    },
    jumping: {
      f1: { x: 0, y: 64 },
      f2: { x: 32, y: 64 },
      f3: { x: 64, y: 64 },
    },
    roll: {
      f1: { x: 0, y: 96 },
      f2: { x: 32, y: 96 },
      f3: { x: 64, y: 96 },
      f4: { x: 96, y: 96 },
    },
    hurt: {
      f1: { x: 0, y: 128 },
      f2: { x: 32, y: 128 },
      f3: { x: 64, y: 128 },
    },
    death: {
      f1: { x: 0, y: 164 },
      f2: { x: 32, y: 164 },
      f3: { x: 64, y: 164 },
      f4: { x: 96, y: 164 },
    },
    sleeping: {
      f1: { x: 0, y: 196 },
      f2: { x: 32, y: 196 },
      f3: { x: 64, y: 196 },
    }

  }

};

// FUA serialize this information to a json file that can then be read
// FUA ADD MORE OBJECTS HERE
const world = {

// ----- WORLD OBJECTS -----

  ui: {

    char: {
      // rendering defaults
      spriteSrc: "", // FUA add here
      srcX: 0,
      srcY: 0,
      srcWidth: 32, // FUA EDIT ACCORDINGLY
      srcHeight: 32,
      destWidth: 32,
      destHeight: 32,

      // character information
      destX: 0, // FUA EDIT ACCORDINGLY, probably need a function to generate coordinates iteratively
      destY: 0,
    }

  },

  object: {

    block: {
      // rendering defaults
      spriteSrc: "", // FUA add here
      srcX: 0,
      srcY: 0,
      srcWidth: 32, // FUA EDIT ACCORDINGLY
      srcHeight: 32,
      destWidth: 32,
      destHeight: 32,

      // coord array 2 be rendered
      coord: [
        {destX:0, destY:5},
        {destX:2, destY:10} // FUA ADD STUFF HERE but make this update dynamically by reading a text file
      ]

    },

    item : {

      healthPickup: {
        // rendering defaults
        spriteSrc: "", // FUA add here
        srcX: 0,
        srcY: 0,
        srcWidth: 32, // FUA EDIT ACCORDINGLY
        srcHeight: 32,
        destWidth: 32,
        destHeight: 32,

        // coord array 2 be rendered
        coord: [
          // can be empty if no items
        ]
      },

      weaponPickup: {
        // rendering defaults
        spriteSrc: "", // FUA add here
        srcX: 0,
        srcY: 0,
        srcWidth: 32, // FUA EDIT ACCORDINGLY
        srcHeight: 32,
        destWidth: 32,
        destHeight: 32,

        // coord array 2 be rendered
        coord: [
          // can be empty if no items
        ]
      },

      speedPickup: {
        // rendering defaults
        spriteSrc: "", // FUA add here
        srcX: 0,
        srcY: 0,
        srcWidth: 32, // FUA EDIT ACCORDINGLY
        srcHeight: 32,
        destWidth: 32,
        destHeight: 32,

        // coord array 2 be rendered
        coord: [
          // can be empty if no items
        ]
      },

    }

  },

// ----- ENTITIES ----- 

  entity: {
    player: {
      // rendering defaults
      spriteSrc: "TIM.png",
      srcX: 0,
      srcY: 0,
      srcWidth: 32,
      srcHeight: 32,
      destWidth: 32,
      destHeight: 32,

      // player information
      destX: 0,
      destY: 0,
      speed: 7,
      health: 3,
      item:[]
    }
  }
}


const playerSprite = new Image();
playerSprite.src = world.entity.player.spriteSrc;

// ---------- ACTUAL CODE ------------

// ---------- ANIMATION ------------

let animationFrame;

function clearScreen() {
  c.clearRect(0, 0, c1.width, c1.height);
}

const fSpeed = 8;
let fCount = 0;
let fCurr = 0;
const fTot = 4;

function drawScreen() {
  // draw player

  c.fillStyle = "yellow";

  // console.log(keys);

  const isMoving = keys.w || keys.a || keys.s || keys.d;
  const isMovingLeft = keys.a; // only do a left check since the right is the other alternative

  if (isMoving) {
    fCount += 1;
    if (fCount >= fSpeed) {
      fCount = 0;
      fCurr = (fCurr + 1) % fTot;
    }

    const scaleX = isMovingLeft ? -1 : 1;
    c.scale(scaleX, 1);

    c.drawImage(
      playerSprite,
      textureAtlas.player.run[`f${fCurr + 1}`].x,
      textureAtlas.player.run[`f${fCurr + 1}`].y,
      world.entity.player.srcWidth,
      world.entity.player.srcHeight,
      isMovingLeft ? - world.entity.player.destX - world.entity.player.destWidth : world.entity.player.destX,
      world.entity.player.destY,
      world.entity.player.destWidth,
      world.entity.player.destHeight
    );
    c.scale(scaleX, 1);

  } else {
    fCount += 1;
    if (fCount >= fSpeed) {
      fCount = 0;
      fCurr = (fCurr + 1) % fTot;
    }
    c.drawImage(
      playerSprite,
      textureAtlas.player.idle[`f${fCurr + 1}`].x,
      textureAtlas.player.idle[`f${fCurr + 1}`].y,
      world.entity.player.srcWidth,
      world.entity.player.srcHeight,
      world.entity.player.destX,
      world.entity.player.destY,
      world.entity.player.destWidth,
      world.entity.player.destHeight
    );
  }

  /*
  console.log(
    playerSprite,
    textureAtlas.player.run[`f${fCurr + 1}`].x,
    textureAtlas.player.run[`f${fCurr + 1}`].y,
    player.srcWidth,
    player.srcHeight,
    player.destX,
    player.destY,
    player.destWidth,
    player.destHeight
  );
  */
}

// ---------- USER INPUT ----------

function handleKeyPress(event) {
  switch (event.key.toLowerCase()) {
    case "w":
      world.entity.player.destY -= world.entity.player.speed;
      keys.w = true;
      break;
    case "s":
      world.entity.player.destY += world.entity.player.speed;
      keys.s = true;
      break;
    case "a":
      world.entity.player.destX -= world.entity.player.speed;
      keys.a = true;
      break;
    case "d":
      world.entity.player.destX += world.entity.player.speed;
      keys.d = true;
      break;
  }
}

function handleKeyRelease(event) {
  switch (event.key.toLowerCase()) {
    case "w":
      keys.w = false;
      break;
    case "s":
      keys.s = false;
      break;
    case "a":
      keys.a = false;
      break;
    case "d":
      keys.d = false;
      break;
  }
}

function startAnimation() {
  document.addEventListener("keydown", handleKeyPress);
  document.addEventListener("keyup", handleKeyRelease);
  updateScreen();
}

function stopAnimation() {
  document.removeEventListener("keydown", handleKeyPress);
  document.removeEventListener("keyup", handleKeyRelease);
  cancelAnimationFrame(animationFrame);
}

function updateScreen() {
  clearScreen();
  drawScreen();
  animationFrame = requestAnimationFrame(updateScreen);
}

// ---------- EVENT LOOP ----------

startAnimation();