const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'X',

  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
  'X',
]
const days = Array.from({ length: 31 }, (_, index) => (index + 1).toString())

class Cell {
  constructor(name, x, y, active) {
    this.name = name
    this.x = x
    this.y = y
    this.active = active
    this.occupied = null
  }
}

class Board {
  size = 7
  placedPieces = {}

  constructor() {
    this.grid = []
    for (let i = 0; i < this.size; i++) {
      const row = []
      for (let j = 0; j < this.size; j++) {
        if (i < 2) {
          const month = months[i * this.size + j]
          const active = month !== 'X'
          const cell = new Cell(month, i, j, active)
          row.push(cell)
        } else {
          const day = days[(i - 2) * this.size + j] || 'X'
          const active = day !== 'X'
          const cell = new Cell(day, i, j, active)
          row.push(cell)
        }
      }
      this.grid.push(row)
    }
  }

  canPlace(x, y, piece) {
    if (!(piece instanceof Piece)) return false

    if (this.placedPieces[piece.color]) return false

    const height = piece.shape.length
    const width = piece.shape[0].length

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (!piece.shape[i][j]) continue

        const row = this.grid[x + i]
        if (!row) return false

        const cell = row[y + j]
        if (!cell || !cell.active) return false

        if (cell.occupied) return false
      }
    }

    return true
  }

  place(x, y, piece) {
    if (!(piece instanceof Piece))
      throw new Error('invalid value for argument piece')

    if (this.placedPieces[piece.color])
      throw new Error('piece has placed been already')

    const height = piece.shape.length
    const width = piece.shape[0].length

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (!piece.shape[i][j]) continue

        const row = this.grid[x + i]
        if (!row) throw new Error('row out of bound')

        const cell = row[y + j]
        if (!cell || !cell.active) throw new Error('cell out of bound')
        
        if (cell.occupied) throw new Error('already taken')
      }
    }

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (!piece.shape[i][j]) continue

        this.grid[x + i][y + j].occupied = piece.color
      }
    }
    this.placedPieces[piece.color] = { x, y }
  }

  getPlacedPosition(piece) {
    if (!(piece instanceof Piece))
      return undefined

    return this.placedPieces[piece.color]
  }

  remove(piece) {
    if (!(piece instanceof Piece))
      throw new Error('invalid value for argument piece')

    if (!this.placedPieces[piece.color])
      throw new Error('piece does not exist on board')

    const height = piece.shape.length
    const width = piece.shape[0].length
    const { x, y } = this.placedPieces[piece.color]

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (!piece.shape[i][j]) continue

        this.grid[x + i][y + j].occupied = null
      }
    }
    delete this.placedPieces[piece.color]
  }

  print() {
    for (let i = 0; i < this.size; i++) {
      let out = '|'
      for (let j = 0; j < this.size; j++) {
        const cell = this.grid[i][j]
        if (!cell.active) {
          continue
        }
        const shortName = cell.occupied
          ? cell.occupied.substring(0, 3).padEnd(3)
          : cell.name.substring(0, 3).padEnd(3)
        out += ` ${shortName} |`
      }
      console.log(out)
    }
  }
}

class Piece {
  constructor(color, shape) {
    this.color = color
    this.shape = shape
  }

  rotateClockwise(/*board*/) {
    // const pos = board.getPlacedPosition(this)
    
    const height = this.shape.length
    const width = this.shape[0].length

    const rotatedShape = new Array(width)
      .fill()
      .map(() => new Array(height).fill(0))

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        rotatedShape[j][height - 1 - i] = this.shape[i][j]
      }
    }

    // if (pos) {
    //   board.remove(this)
    //   const tempPiece = new Piece(this.color, rotatedShape)
      
    //   if (!board.canPlace(pos.x, pos.y, tempPiece)) {
    //     board.place(pos.x, pos.y, this)
    //     throw new Error("invalid move")
    //   }
    // }

    this.shape = rotatedShape
    // if (pos) board.place(pos.x, pos.y, this)
  }

  rotateAntiClockwise(/*board*/) {
    // const pos = board.getPlacedPosition(this)

    const height = this.shape.length
    const width = this.shape[0].length

    const rotatedShape = new Array(width)
      .fill()
      .map(() => new Array(height).fill(0))

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        rotatedShape[width - 1 - j][i] = this.shape[i][j]
      }
    }

    // if (pos) {
    //   board.remove(this)
    //   const tempPiece = new Piece(this.color, rotatedShape)
      
    //   if (!board.canPlace(pos.x, pos.y, tempPiece)) {
    //     board.place(pos.x, pos.y, this)
    //     throw new Error("invalid move")
    //   }
    // }

    this.shape = rotatedShape
    // if (pos) board.place(pos.x, pos.y, this)
  }

  flipHorizontal(/*board*/) {
    // const pos = board.getPlacedPosition(this)

    const height = this.shape.length
    const width = this.shape[0].length

    const flippedShape = new Array(height)
      .fill()
      .map(() => new Array(width).fill(0))

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        flippedShape[i][j] = this.shape[i][width - 1 - j]
      }
    }

    // if (pos) {
    //   board.remove(this)
    //   const tempPiece = new Piece(this.color, flippedShape)
      
    //   if (!board.canPlace(pos.x, pos.y, tempPiece)) {
    //     board.place(pos.x, pos.y, this)
    //     throw new Error("invalid move")
    //   }
    // }

    this.shape = flippedShape
    // if (pos) board.place(pos.x, pos.y, this)
  }

  flipVertical(/*board*/) {
    // const pos = board.getPlacedPosition(this)

    const height = this.shape.length
    const width = this.shape[0].length

    const flippedShape = new Array(height)
      .fill()
      .map(() => new Array(width).fill(0))

    for (let i = 0; i < height; i++) {
      flippedShape[height - 1 - i] = this.shape[i]
    }

    // if (pos) {
    //   board.remove(this)
    //   const tempPiece = new Piece(this.color, flippedShape)
      
    //   if (!board.canPlace(pos.x, pos.y, tempPiece)) {
    //     board.place(pos.x, pos.y, this)
    //     throw new Error("invalid move")
    //   }
    // }

    this.shape = flippedShape
    // if (pos) board.place(pos.x, pos.y, this)
  }

  moveUp(board) {
    const pos = board.getPlacedPosition(this)
    if (!pos)
      throw new Error("piece most be present in the board to move up")
    
    board.remove(this)

    if (!board.canPlace(pos.x-1, pos.y, this)) {
      board.place(pos.x, pos.y, this)
      throw new Error("invalid move")
    }

    board.place(pos.x-1, pos.y, this)
  }

  moveDown(board) {
    const pos = board.getPlacedPosition(this)
    if (!pos)
      throw new Error("piece most be present in the board to move down")
    
    board.remove(this)

    if (!board.canPlace(pos.x+1, pos.y, this)) {
      board.place(pos.x, pos.y, this)
      throw new Error("invalid move")
    }

    board.place(pos.x+1, pos.y, this)
  }

  moveLeft(board) {
    const pos = board.getPlacedPosition(this)
    if (!pos)
      throw new Error("piece most be present in the board to move left")
    
    board.remove(this)

    if (!board.canPlace(pos.x, pos.y-1, this)) {
      board.place(pos.x, pos.y, this)
      throw new Error("invalid move")
    }

    board.place(pos.x, pos.y-1, this)
  }

  moveRight(board) {
    const pos = board.getPlacedPosition(this)
    if (!pos)
      throw new Error("piece most be present in the board to move right")
    
    board.remove(this)

    if (!board.canPlace(pos.x, pos.y+1, this)) {
      board.place(pos.x, pos.y, this)
      throw new Error("invalid move")
    }

    board.place(pos.x, pos.y+1, this)
  }

  print() {
    for (let i = 0; i < this.shape.length; i++) {
      let out = '|'
      for (let j = 0; j < this.shape[0].length; j++) {
        const cell = this.shape[i][j]
        const shortName = cell
          ? this.color.substring(0, 3).padEnd(3)
          : ''.padEnd(3)
        out += ` ${shortName} |`
      }
      console.log(out)
    }
  }
}

const redPiece = new Piece('Red', [
  [true, false, true],
  [true, true, true],
])

const yellowPiece = new Piece('Yellow', [
  [true, true, true],
  [true, true, true],
])

const purplePiece = new Piece('Purple', [
  [true, false, false],
  [true, false, false],
  [true, true, true],
])

const cyanPiece = new Piece('Cyan', [
  [true, false],
  [true, false],
  [true, true],
  [true, false],
])

const pinkPiece = new Piece('Pink', [
  [true, true, false],
  [false, true, false],
  [false, true, true],
])

const greenPiece = new Piece('Green', [
  [true, false],
  [true, false],
  [true, false],
  [true, true],
])

const bluePiece = new Piece('Blue', [
  [true, false],
  [true, true],
  [true, true],
])

const darkBluePiece = new Piece('DarkBlue', [
  [true, false],
  [true, false],
  [true, true],
  [false, true],
])

const Pieces = {
  Red: redPiece,
  Yellow: yellowPiece,
  Purple: purplePiece,
  Cyan: cyanPiece,
  Pink: pinkPiece,
  Green: greenPiece,
  Blue: bluePiece,
  DarkBlue: darkBluePiece,
}

module.exports = {
  Board, Pieces
}