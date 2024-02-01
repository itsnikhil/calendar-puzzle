const game = require('./index')

describe('Calendar Puzzle Tests', () => {
  let board
  let redPiece
  let yellowPiece
  let purplePiece
  let cyanPiece
  let pinkPiece
  let greenPiece
  let bluePiece
  let darkBluePiece
  
  beforeEach(() => {
    board = new game.Board()
    redPiece = game.Pieces.Red
    yellowPiece = game.Pieces.Yellow
    purplePiece = game.Pieces.Purple
    cyanPiece = game.Pieces.Cyan
    pinkPiece = game.Pieces.Pink
    greenPiece = game.Pieces.Green
    bluePiece = game.Pieces.Blue
    darkBluePiece = game.Pieces.DarkBlue
  });

  test('should successfully initialise a new board', () => {
    expect(board.grid.length).toBe(7)
    expect(board.grid.length).toBe(board.size)
    expect(board.grid[0].length).toBe(board.size)
    expect(board.grid[0][0]).toEqual({"active": true, "name": "January", "occupied": null, "x": 0, "y": 0})
    expect(board.grid[1][5]).toEqual({"active": true, "name": "December", "occupied": null, "x": 1, "y": 5})
    expect(board.grid[0][6]).toEqual({"active": false, "name": "X", "occupied": null, "x": 0, "y": 6})
    expect(board.grid[1][6]).toEqual({"active": false, "name": "X", "occupied": null, "x": 1, "y": 6})
    expect(board.grid[2][0]).toEqual({"active": true, "name": "1", "occupied": null, "x": 2, "y": 0})
    expect(board.grid[6][2]).toEqual({"active": true, "name": "31", "occupied": null, "x": 6, "y": 2})
    expect(board.grid[6][3]).toEqual({"active": false, "name": "X", "occupied": null, "x": 6, "y": 3})
    expect(board.grid[6][6]).toEqual({"active": false, "name": "X", "occupied": null, "x": 6, "y": 6})
  })

  test('should print empty board correctly', () => {
    console.log = jest.fn();
    board.print();
    expect(console.log).toHaveBeenCalledTimes(7)
    expect(console.log).toHaveBeenNthCalledWith(1, "| Jan | Feb | Mar | Apr | May | Jun |")
    expect(console.log).toHaveBeenNthCalledWith(2, "| Jul | Aug | Sep | Oct | Nov | Dec |")
    expect(console.log).toHaveBeenNthCalledWith(3, "| 1   | 2   | 3   | 4   | 5   | 6   | 7   |")
    expect(console.log).toHaveBeenNthCalledWith(4, "| 8   | 9   | 10  | 11  | 12  | 13  | 14  |")
    expect(console.log).toHaveBeenNthCalledWith(5, "| 15  | 16  | 17  | 18  | 19  | 20  | 21  |")
    expect(console.log).toHaveBeenNthCalledWith(6, "| 22  | 23  | 24  | 25  | 26  | 27  | 28  |")
    expect(console.log).toHaveBeenNthCalledWith(7, "| 29  | 30  | 31  |")
  })

  test('should successfully initialise a red piece', () => {
    expect(redPiece.color).toMatch("Red")
    expect(redPiece.shape).toEqual([
      [true, false, true],
      [true, true, true],
    ])
  })

  test('should successfully initialise a yellow piece', () => {
    expect(yellowPiece.color).toMatch("Yellow")
    expect(yellowPiece.shape).toEqual([
      [true, true, true],
      [true, true, true],
    ])
  })

  test('should successfully initialise a purple piece', () => {
    expect(purplePiece.color).toMatch("Purple")
    expect(purplePiece.shape).toEqual([
      [true, false, false],
      [true, false, false],
      [true, true, true],
    ])
  })

  test('should successfully initialise a cyan piece', () => {
    expect(cyanPiece.color).toMatch("Cyan")
    expect(cyanPiece.shape).toEqual([
      [true, false],
      [true, false],
      [true, true],
      [true, false],
    ])
  })

  test('should successfully initialise a pink piece', () => {
    expect(pinkPiece.color).toMatch("Pink")
    expect(pinkPiece.shape).toEqual([
      [true, true, false],
      [false, true, false],
      [false, true, true],
    ])
  })

  test('should successfully initialise a green piece', () => {
    expect(greenPiece.color).toMatch("Green")
    expect(greenPiece.shape).toEqual([
      [true, false],
      [true, false],
      [true, false],
      [true, true],
    ])
  })

  test('should successfully initialise a blue piece', () => {
    expect(bluePiece.color).toMatch("Blue")
    expect(bluePiece.shape).toEqual([
      [true, false],
      [true, true],
      [true, true],
    ])
  })

  test('should successfully initialise a dark blue piece', () => {
    expect(darkBluePiece.color).toMatch("DarkBlue")
    expect(darkBluePiece.shape).toEqual([
      [true, false],
      [true, false],
      [true, true],
      [false, true],
    ])
  })

  test('should print shape of piece correctly', () => {
    console.log = jest.fn();
    redPiece.print();
    expect(console.log).toHaveBeenCalledTimes(2)
    expect(console.log).toHaveBeenNthCalledWith(1, "| Red |     | Red |")
    expect(console.log).toHaveBeenNthCalledWith(2, "| Red | Red | Red |")
  })

  test('should rotate a piece clockwise', () => {
    console.log = jest.fn();
    redPiece.rotateClockwise()
    redPiece.print()
    expect(console.log).toHaveBeenCalledTimes(3)
    expect(console.log).toHaveBeenNthCalledWith(1, "| Red | Red |")
    expect(console.log).toHaveBeenNthCalledWith(2, "| Red |     |")
    expect(console.log).toHaveBeenNthCalledWith(3, "| Red | Red |")
    redPiece.rotateAntiClockwise()
  })

  test('should print shape of green piece correctly', () => {
    console.log = jest.fn();
    greenPiece.print()
    expect(console.log).toHaveBeenCalledTimes(4)
    expect(console.log).toHaveBeenNthCalledWith(1, "| Gre |     |")
    expect(console.log).toHaveBeenNthCalledWith(2, "| Gre |     |")
    expect(console.log).toHaveBeenNthCalledWith(3, "| Gre |     |")
    expect(console.log).toHaveBeenNthCalledWith(4, "| Gre | Gre |")
  })

  test('should rotate a piece anti-clockwise', () => {
    console.log = jest.fn();
    greenPiece.rotateAntiClockwise()
    greenPiece.print()
    expect(console.log).toHaveBeenCalledTimes(2)
    expect(console.log).toHaveBeenNthCalledWith(1, "|     |     |     | Gre |")
    expect(console.log).toHaveBeenNthCalledWith(2, "| Gre | Gre | Gre | Gre |")
    greenPiece.rotateClockwise()
  })

  test('should print shape of blue piece correctly', () => {
    console.log = jest.fn();
    bluePiece.print()
    expect(console.log).toHaveBeenCalledTimes(3)
    expect(console.log).toHaveBeenNthCalledWith(1, "| Blu |     |")
    expect(console.log).toHaveBeenNthCalledWith(2, "| Blu | Blu |")
    expect(console.log).toHaveBeenNthCalledWith(3, "| Blu | Blu |")
  })

  test('should flip a piece horizontally', () => {
    console.log = jest.fn();
    bluePiece.flipHorizontal()
    bluePiece.print()
    expect(console.log).toHaveBeenCalledTimes(3)
    expect(console.log).toHaveBeenNthCalledWith(1, "|     | Blu |")
    expect(console.log).toHaveBeenNthCalledWith(2, "| Blu | Blu |")
    expect(console.log).toHaveBeenNthCalledWith(3, "| Blu | Blu |")
    bluePiece.flipHorizontal()
  })

  test('should print shape of cyan piece correctly', () => {
    console.log = jest.fn();
    cyanPiece.print()
    expect(console.log).toHaveBeenCalledTimes(4)
    expect(console.log).toHaveBeenNthCalledWith(1, "| Cya |     |")
    expect(console.log).toHaveBeenNthCalledWith(2, "| Cya |     |")
    expect(console.log).toHaveBeenNthCalledWith(3, "| Cya | Cya |")
    expect(console.log).toHaveBeenNthCalledWith(4, "| Cya |     |")
  })

  test('should flip a piece vertically', () => {
    console.log = jest.fn();
    cyanPiece.flipVertical()
    cyanPiece.print()
    expect(console.log).toHaveBeenCalledTimes(4)
    expect(console.log).toHaveBeenNthCalledWith(1, "| Cya |     |")
    expect(console.log).toHaveBeenNthCalledWith(2, "| Cya | Cya |")
    expect(console.log).toHaveBeenNthCalledWith(3, "| Cya |     |")
    expect(console.log).toHaveBeenNthCalledWith(4, "| Cya |     |")
    cyanPiece.flipVertical()
  })

  test('check should allow for placing red piece on the board', () => {
    const result = board.canPlace(0, 0, redPiece)
    expect(result).toBeTruthy()
  })

  test('check should now allow for placing red piece outside on the board', () => {
    const result = board.canPlace(10, 10, redPiece)
    expect(result).toBeFalsy()
  })

  test('should place red piece on the board correctly', () => {
    console.log = jest.fn();
    board.place(0, 0, redPiece)
    board.print()
    expect(console.log).toHaveBeenCalledTimes(7)
    expect(console.log).toHaveBeenNthCalledWith(1, "| Red | Feb | Red | Apr | May | Jun |")
    expect(console.log).toHaveBeenNthCalledWith(2, "| Red | Red | Red | Oct | Nov | Dec |")
    expect(console.log).toHaveBeenNthCalledWith(3, "| 1   | 2   | 3   | 4   | 5   | 6   | 7   |")
    expect(console.log).toHaveBeenNthCalledWith(4, "| 8   | 9   | 10  | 11  | 12  | 13  | 14  |")
    expect(console.log).toHaveBeenNthCalledWith(5, "| 15  | 16  | 17  | 18  | 19  | 20  | 21  |")
    expect(console.log).toHaveBeenNthCalledWith(6, "| 22  | 23  | 24  | 25  | 26  | 27  | 28  |")
    expect(console.log).toHaveBeenNthCalledWith(7, "| 29  | 30  | 31  |")
  })

  test('should not place red piece outside the board row-wise', () => {
    expect(() => board.place(10, 10, redPiece)).toThrow("row out of bound")
  })

  test('should not place red piece outside the board col-wise', () => {
    expect(() => board.place(0, 10, redPiece)).toThrow("cell out of bound")
  })

  test('should not place yellow piece on top of red piece', () => {
    expect(() => {
      board.place(0, 0, redPiece)
      board.place(0, 0, yellowPiece)
    }).toThrow("already taken")
  })

  test('should not place same piece multiple times', () => {
    expect(() => {
      board.place(0, 0, redPiece)
      board.place(0, 0, redPiece)
    }).toThrow("piece has placed been already")
  })

  test('should not place invalid piece', () => {
    expect(() => {
      board.place(0, 0, {})
    }).toThrow("invalid value for argument piece")
  })

  test('should not place red piece on the board multiple times', () => {
    board.place(0, 0, redPiece)
    const result = board.canPlace(0, 0, redPiece)
    expect(result).toBeFalsy()
  })

  test('should get position of placed piece', () => {
    board.place(0, 0, redPiece)
    const pos = board.getPlacedPosition(redPiece)
    expect(pos).toEqual({x: 0, y: 0})
  })

  test('should get position of placed piece', () => {
    board.place(0, 0, redPiece)
    const pos = board.getPlacedPosition(redPiece)
    expect(pos).toEqual({x: 0, y: 0})
  })

  test('should not get position of unplaced piece', () => {
    const pos = board.getPlacedPosition(redPiece)
    expect(pos).toBeUndefined()
  })

  test('should successfully remove red piece from the board', () => {
    board.place(0, 0, redPiece)
    board.remove(redPiece)
    const pos = board.getPlacedPosition(redPiece)
    expect(pos).toBeUndefined()
  })

  test('should not remove red piece which is not placed on the board', () => {
    expect(() => board.remove(redPiece)).toThrow("piece does not exist on board")
  })

  test('should not remove invalid piece', () => {
    expect(() => {
      board.remove(0, 0, {})
    }).toThrow("invalid value for argument piece")
  })

  test('should move red piece right', () => {
    console.log = jest.fn();
    board.place(0, 0, redPiece)
    redPiece.moveRight(board)
    board.print()
    expect(console.log).toHaveBeenCalledTimes(7)
    expect(console.log).toHaveBeenNthCalledWith(1, "| Jan | Red | Mar | Red | May | Jun |")
    expect(console.log).toHaveBeenNthCalledWith(2, "| Jul | Red | Red | Red | Nov | Dec |")
    expect(console.log).toHaveBeenNthCalledWith(3, "| 1   | 2   | 3   | 4   | 5   | 6   | 7   |")
    expect(console.log).toHaveBeenNthCalledWith(4, "| 8   | 9   | 10  | 11  | 12  | 13  | 14  |")
    expect(console.log).toHaveBeenNthCalledWith(5, "| 15  | 16  | 17  | 18  | 19  | 20  | 21  |")
    expect(console.log).toHaveBeenNthCalledWith(6, "| 22  | 23  | 24  | 25  | 26  | 27  | 28  |")
    expect(console.log).toHaveBeenNthCalledWith(7, "| 29  | 30  | 31  |")
  })

  test('should not allow moving red piece right outside of board', () => {
    board.place(0, 3, redPiece)
    expect(() => redPiece.moveRight(board)).toThrow("invalid move")
  })

  test('should not allow moving unplaced piece right', () => {
    expect(() => redPiece.moveRight(board)).toThrow("piece most be present in the board to move right")
  })

  test('should move red piece down', () => {
    console.log = jest.fn();
    board.place(0, 0, redPiece)
    redPiece.moveDown(board)
    board.print()
    expect(console.log).toHaveBeenCalledTimes(7)
    expect(console.log).toHaveBeenNthCalledWith(1, "| Jan | Feb | Mar | Apr | May | Jun |")
    expect(console.log).toHaveBeenNthCalledWith(2, "| Red | Aug | Red | Oct | Nov | Dec |")
    expect(console.log).toHaveBeenNthCalledWith(3, "| Red | Red | Red | 4   | 5   | 6   | 7   |")
    expect(console.log).toHaveBeenNthCalledWith(4, "| 8   | 9   | 10  | 11  | 12  | 13  | 14  |")
    expect(console.log).toHaveBeenNthCalledWith(5, "| 15  | 16  | 17  | 18  | 19  | 20  | 21  |")
    expect(console.log).toHaveBeenNthCalledWith(6, "| 22  | 23  | 24  | 25  | 26  | 27  | 28  |")
    expect(console.log).toHaveBeenNthCalledWith(7, "| 29  | 30  | 31  |")
  })

  test('should not allow moving red piece right outside of board', () => {
    board.place(5, 0, redPiece)
    expect(() => redPiece.moveDown(board)).toThrow("invalid move")
  })

  test('should not allow moving unplaced piece down', () => {
    expect(() => redPiece.moveDown(board)).toThrow("piece most be present in the board to move down")
  })

  test('should move red piece left', () => {
    console.log = jest.fn();
    board.place(0, 1, redPiece)
    redPiece.moveLeft(board)
    board.print()
    expect(console.log).toHaveBeenCalledTimes(7)
    expect(console.log).toHaveBeenNthCalledWith(1, "| Red | Feb | Red | Apr | May | Jun |")
    expect(console.log).toHaveBeenNthCalledWith(2, "| Red | Red | Red | Oct | Nov | Dec |")
    expect(console.log).toHaveBeenNthCalledWith(3, "| 1   | 2   | 3   | 4   | 5   | 6   | 7   |")
    expect(console.log).toHaveBeenNthCalledWith(4, "| 8   | 9   | 10  | 11  | 12  | 13  | 14  |")
    expect(console.log).toHaveBeenNthCalledWith(5, "| 15  | 16  | 17  | 18  | 19  | 20  | 21  |")
    expect(console.log).toHaveBeenNthCalledWith(6, "| 22  | 23  | 24  | 25  | 26  | 27  | 28  |")
    expect(console.log).toHaveBeenNthCalledWith(7, "| 29  | 30  | 31  |")
  })

  test('should not allow moving red piece right outside of board', () => {
    board.place(0, 0, redPiece)
    expect(() => redPiece.moveLeft(board)).toThrow("invalid move")
  })

  test('should not allow moving unplaced piece left', () => {
    expect(() => redPiece.moveLeft(board)).toThrow("piece most be present in the board to move left")
  })

  test('should move red piece up', () => {
    console.log = jest.fn();
    board.place(1, 0, redPiece)
    redPiece.moveUp(board)
    board.print()
    expect(console.log).toHaveBeenCalledTimes(7)
    expect(console.log).toHaveBeenNthCalledWith(1, "| Red | Feb | Red | Apr | May | Jun |")
    expect(console.log).toHaveBeenNthCalledWith(2, "| Red | Red | Red | Oct | Nov | Dec |")
    expect(console.log).toHaveBeenNthCalledWith(3, "| 1   | 2   | 3   | 4   | 5   | 6   | 7   |")
    expect(console.log).toHaveBeenNthCalledWith(4, "| 8   | 9   | 10  | 11  | 12  | 13  | 14  |")
    expect(console.log).toHaveBeenNthCalledWith(5, "| 15  | 16  | 17  | 18  | 19  | 20  | 21  |")
    expect(console.log).toHaveBeenNthCalledWith(6, "| 22  | 23  | 24  | 25  | 26  | 27  | 28  |")
    expect(console.log).toHaveBeenNthCalledWith(7, "| 29  | 30  | 31  |")
  })

  test('should not allow moving red piece up outside of board', () => {
    board.place(0, 0, redPiece)
    expect(() => redPiece.moveUp(board)).toThrow("invalid move")
  })

  test('should not allow moving unplaced piece up', () => {
    expect(() => redPiece.moveUp(board)).toThrow("piece most be present in the board to move up")
  })
})