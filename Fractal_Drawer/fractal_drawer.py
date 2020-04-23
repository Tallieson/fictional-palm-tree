import sys
 
import pygame
import cmath
import numpy

#Preset variables
max_iterations = 100
max_range = 50
x_range = (-2, 2)
y_range = (2, -2)
width, height = 600, 600
power = 2
c_multiplyer = 1

#Input to change variables
choice = input("Do you wish to change the default parameters? (y/n): ")
if choice == 'y':
    print("Leave the input field blank to leave the parameter as default, the current value will be in brackets and enter numerical values only")
    #Max iterations
    max_iterations_new = input("Max iterations (" + str(max_iterations) + "): ")
    if max_iterations_new != '':
        max_iterations = int(max_iterations_new)
    #Max range
    max_range_new = input("Max value before escape (" + str(max_range) + "): ")
    if max_range_new != '':
        max_range = int(max_range_new)
    #X range
    choice = input("Do you wish to change the x range on the argand diagram? (y/n): ")
    if choice == 'y':
        print("X range is currently "+ str(x_range))
        x_range_new = input("Minimum x_range (" + str(x_range[0]) + "): ")
        x_range_min = int(x_range_new)
        x_range_new = input("Maximum x_range (" + str(x_range[1]) + "): ")
        x_range_max = int(x_range_new)
        x_range = (x_range_min, x_range_max)
    #Y range
    choice = input("Do you wish to change the Y range on the argand diagram? (y/n): ")
    if choice == 'y':
        print("Y range is currently "+ str(y_range))
        y_range_new = input("Maximum y_range (" + str(y_range[0]) + "): ")
        y_range_max = int(y_range_new)
        y_range_new = input("Minimum y_range (" + str(y_range[1]) + "): ")
        y_range_min = int(y_range_new)
        y_range = (y_range_max, y_range_min)
    #Change resolution
    choice = input("Do you wish to change the program resolution (y/n): ")
    if choice == 'y':
        width_new = input("Width (" + str(width) + "): ")
        width = int(width_new)
        height_new = input("Height (" + str(height) + "): ")
        height = int(height_new)
    #Change power
    power_new = input("Power of previous iteration in equation, Mandelbrot is 2 (" + str(power) + "): ")
    if power_new != '':
        power = int(power_new)
    #Multiplyer of c
    c_multiplyer_new = input("Multipler of c, can dilate fractal (" + str(c_multiplyer) + "): ")
    if c_multiplyer_new != '':
        c_multiplyer = int(c_multiplyer_new)

    

screen = pygame.display.set_mode((width, height))
pygame.display.set_caption('Mandelbrot_draw')
screen.fill((255, 255, 255))
pygame.display.update()

def draw():
    for y in range(height):
        for x in range(width):
            x_num = numpy.interp(x, [0, width], x_range)
            y_num = numpy.interp(y, [0, height], y_range)
            colour = iterate(x_num, y_num)
            pygame.draw.rect(screen, colour, (x, y, 1, 1))
        pygame.display.update(0,y,width,1)
        for event in pygame.event.get():
            if event.type == QUIT:
                quit()
                sys.exit()


def iterate(x,y):
    iteration = 0
    z = complex(x, y)
    zi = z
    for zi in range(max_iterations):
        try:
            zi = zi **power + z*c_multiplyer 
            if abs(zi) > max_range or abs(zi) < -max_range:
                break
            else:
                iteration += 1
        except:
            iteration = 0
        
    col = pick_colour(iteration)
    return col, iteration

def pick_colour(iterations):
    if iterations >= 100:
        col = (0,0,0)
    elif iterations >= 17:
        col = (145, 50, 168)
    elif iterations >= 13:
        col = (37, 168, 61)
    elif iterations >= 9:
        col = (207, 43, 43)
    elif iterations >= 5:
        col = (232, 150, 42)
    elif iterations >= 1:
        col = (232, 229, 42)
    else:
        col = (255,255,255)
    return col

draw()
 
# Game loop.
while True:
  
  for event in pygame.event.get():
    if event.type == QUIT:
      quit()
      sys.exit()
  
