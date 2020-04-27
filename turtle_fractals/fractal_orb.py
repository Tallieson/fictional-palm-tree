import turtle


def create_branch(branch_len):
    if branch_len > 10:
        angle = 25
        turtle.forward(branch_len)
        turtle.left(angle)
        create_branch(branch_len*0.75)
        turtle.right(angle*2)
        create_branch(branch_len*0.75)
        turtle.left(angle)
        turtle.backward(branch_len)


i = 0
turtle.speed(100)
turtle.left(90)

while i < 9:
    create_branch(100)
    turtle.left(45)
    i += 1

done()