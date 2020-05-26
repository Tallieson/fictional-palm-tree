# Trying to create a template
import pygame
import random
import time

class player():
    def __init__(self):
        self.image = surface((50, 50))
        self.image.fill((0, 0, 255))
        self.rect = self.image.get_rect()
        self.rect.center = (win_width / 2, win_height / 2)


player_img = pygame.image.load(path.join(img_dir, 'playerShip1_orange.png')).convert()

# Create window and set clock
win_width = 360
win_height = 480
FPS = 30
win = pygame.display.set_mode((win_width, win_height))
pygame.display.set_caption("Star Force I")
clock = pygame.time.Clock()

player_sprite = player()
all_sprites = pygame.sprite.group()
sprites.add(player_sprite)

# Main game loop
while True:
    # keep loop running at the correct speed
    clock.tick(FPS)
    # Processing of event listeners
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            exit()

    # Update game info
    all_sprites.update()
    # Render window with new game info

    win.fill((0, 0, 0))
    sprites.draw(win)

    # After drawing everytinh, flip the display
    pygame.display.flip()
