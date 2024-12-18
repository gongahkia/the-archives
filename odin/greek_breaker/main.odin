package main

import "core:fmt"
import "core:math"
import "sdl2"

const WindowWidth = 800
const WindowHeight = 600

type Paddle struct {
    x     f32
    y     f32
    width f32
    height f32
}

type Ball struct {
    x      f32
    y      f32
    radius  f32
    velocity_x f32
    velocity_y f32
}

type Brick struct {
    x      f32
    y      f32
    width  f32
    height f32
    is_destroyed bool
}

var (
    paddle Paddle
    ball   Ball
    bricks  []Brick
)

proc init_game() {
    paddle = Paddle{x: WindowWidth / 2 - 50, y: WindowHeight - 30, width: 100, height: 20}
    ball = Ball{x: WindowWidth / 2, y: WindowHeight - 50, radius: 10, velocity_x: 5, velocity_y: -5}
    
    // Initialize bricks
    for i in 0 .. 5 {
        for j in 0 .. 10 {
            bricks = append(bricks, Brick{x: f32(j * 80 + 10), y: f32(i * 30 + 10), width: 70, height: 20, is_destroyed: false})
        }
    }
}

proc update_game() {
    // Update ball position
    ball.x += ball.velocity_x
    ball.y += ball.velocity_y
    
    // Ball collision with walls
    if (ball.x < 0 or ball.x > WindowWidth) {
        ball.velocity_x = -ball.velocity_x
    }
    
    if (ball.y < 0) {
        ball.velocity_y = -ball.velocity_y
    }
    
    // Ball collision with paddle
    if (ball.y + ball.radius >= paddle.y and ball.x >= paddle.x and ball.x <= paddle.x + paddle.width) {
        ball.velocity_y = -ball.velocity_y
        ball.y = paddle.y - ball.radius // Prevent sticking to the paddle
    }

    // Check collision with bricks
    for brick in bricks {
        if not brick.is_destroyed and 
           (ball.x + ball.radius >= brick.x and 
            ball.x - ball.radius <= brick.x + brick.width and 
            ball.y + ball.radius >= brick.y and 
            ball.y - ball.radius <= brick.y + brick.height) {
            brick.is_destroyed = true // Mark brick as destroyed
            ball.velocity_y = -ball.velocity_y // Bounce back the ball
            
            // Optional: Increase score or add effects here.
        }
    }
}

proc render_game() {
    // Clear screen and draw paddle, ball, and bricks here using SDL2 functions.
}

proc main() {
    sdl2.init(sdl2.INIT_EVERYTHING)
    
    init_game()
    
    var running = true
    
    while running {
        update_game()
        render_game()
        
        // Handle events like quitting or moving paddle here.
        
        sdl2.delay(16) // Roughly ~60 FPS
    }
    
    sdl2.quit()
}
