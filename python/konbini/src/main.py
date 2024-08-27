# ~ contains the main pygame event loop ~

import pygame
import sys

if __name__ == "__main__":

    print("\n\nYou work the night shift at the convenience store.\nThe last person who worked here dissapeared after they saw THEM.\nThe job pays well though.\nAvoid THEM.\nSurvive.\n\n")

    pygame.init()
    screen = pygame.display.set_mode((640, 480))
    pygame.display.set_caption("Pygame Window")
    clock = pygame.time.Clock()

    # --- main game loop ---
    while True: 
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
        screen.fill((0, 255, 255))  
        pygame.display.flip()
        clock.tick(60) # caps the framerate at 60 fps