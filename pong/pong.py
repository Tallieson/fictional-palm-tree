import turtle


def paddle_left_up():  # Drive our left paddle up
    if paddle_left.turtle.ycor() < 245:
        paddle_left.turtle.sety(paddle_left.turtle.ycor() + 20)


def paddle_left_down():  # Drive our left paddle down
    if paddle_left.turtle.ycor() > -240:
        paddle_left.turtle.sety(paddle_left.turtle.ycor() - 20)


def paddle_right_up():  # Drive our right paddle up
    if paddle_right.turtle.ycor() < 245:
        paddle_right.turtle.sety(paddle_right.turtle.ycor() + 20)


def paddle_right_down():  # Drive our right paddle down
    if paddle_right.turtle.ycor() > -240:
        paddle_right.turtle.sety(paddle_right.turtle.ycor() - 20)


# definte and create objects
class game_object():
    def __init__(self, shape, wid, len, position):
        self.turtle = turtle.Turtle()
        self.turtle.shape(shape)
        self.turtle.shapesize(stretch_wid=wid, stretch_len=len) # Built in function to change shape
        self.turtle.color("white")
        self.turtle.penup()
        self.turtle.goto(position)
        self.turtle.speed(0) # Sets animation speed


# Window conditions and global variables
window = turtle.Screen()
window.title("Pong")
window.bgcolor("black")
window.setup(width=800, height=600)
window.tracer(0) # Keep the window from updating unless we prompt it to
left_score = 0
right_score = 0

# Drawing out starting scoreboard
pen = turtle.Turtle()
pen.speed(0)
pen.color("white")
pen.penup()
pen.hideturtle()
pen.goto(0, 260)
pen.write(f"Player A:{left_score} Player B:{right_score}", align="center", font=("Courier", 24, "bold"))

# Create game objects
paddle_left = game_object('square', 5, 1, (-350, 0))
paddle_right = game_object('square', 5, 1, (350, 0))
ball = game_object('circle', 1, 1, (0, 0))

# ball speed/direction
ball.dx = -.2
ball.dy = -.2

# Keyboard bindings

window.listen()
window.onkeypress(paddle_left_up, "w")
window.onkeypress(paddle_left_down, "s")
window.onkeypress(paddle_right_up, "Up")
window.onkeypress(paddle_right_down, "Down")

# Main game loop
while True:
    window.update()

    # Move the ball
    ball.turtle.setx(ball.turtle.xcor() + ball.dx)
    ball.turtle.sety(ball.turtle.ycor() + ball.dy)

    # Ball and border order collision testing
    if ball.turtle.ycor() > 290:
        ball.turtle.sety(290)
        ball.dy *= -1

    if ball.turtle.ycor() < -290:
        ball.turtle.sety(-290)
        ball.dy *= -1
    
    if ball.turtle.xcor() > 390:
        ball.turtle.goto(0, 0)
        ball.dx *= -1
        left_score += 1
        pen.clear()
        pen.write(f"Player A:{left_score} Player B:{right_score}", align="center", font=("Courier", 24, "bold"))

    if ball.turtle.xcor() < - 390:
        ball.turtle.goto(0, 0)
        ball.dx *= -1
        right_score += 1
        pen.clear()
        pen.write(f"Player A:{left_score} Player B:{right_score}", align="center", font=("Courier", 24, "bold"))

    # Ball and paddle collision detection
    if (ball.turtle.xcor() > 340 and
    ball.turtle.xcor() < 350 and
    (ball.turtle.ycor() < paddle_right.turtle.ycor() + 40 and
    ball.turtle.ycor() > paddle_right.turtle.ycor() - 40)):
        ball.turtle.setx(340)
        ball.dx *= -1
        
    if (ball.turtle.xcor() < -340 and
    ball.turtle.xcor() > -350 and
    (ball.turtle.ycor() < paddle_left.turtle.ycor() + 40 and
    ball.turtle.ycor() > paddle_left.turtle.ycor() - 40)):
        ball.turtle.setx(-340)
        ball.dx *= -1