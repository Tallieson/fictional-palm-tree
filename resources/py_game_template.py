# Trying to create a template
import pygame
import random
import time


# Create window and set clock
win_width = 360
win_height = 480
FPS = 30
win = pygame.display.set_mode((win_width, win_height))
pygame.display.set_caption("Your Name Here")
clock = pygame.time.Clock()

sprites = pygame.sprite.Group()

# Main game loop
while True:
    # keep loop running at the correct speed
    clock.tick(FPS)
    # Processing of event listeners
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            exit()

    # Update game info
    sprites.update()
    # Render window with new game info

    win.fill((0, 0, 0))
    sprites.draw(win)

    # After drawing everytinh, flip the display
    pygame.display.flip()
