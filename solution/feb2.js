const game = require('../index')
const pieces = game.Pieces

const board = new game.Board()

board.place(0, 0, pieces.Red)

pieces.Cyan.flipVertical()
board.place(2, 0, pieces.Cyan)

pieces.Pink.flipHorizontal()
board.place(4, 0, pieces.Pink)

board.place(0, 3, pieces.Yellow)

pieces.Green.rotateClockwise()
board.place(2, 2, pieces.Green)

pieces.DarkBlue.flipHorizontal()
board.place(3, 2, pieces.DarkBlue)

board.place(3, 4, pieces.Purple)

pieces.Blue.flipHorizontal()
board.place(2, 5, pieces.Blue)

board.print()