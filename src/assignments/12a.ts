import { add, readList, run } from '@/utils'

enum Command {
	N = 'N',
	S = 'S',
	E = 'E',
	W = 'W',
	L = 'L',
	R = 'R',
	F = 'F',
}

enum Direction {
	NORTH,
	EAST,
	SOUTH,
	WEST,
}

class Ship {
	public position = {
		x: 0,
		y: 0,
	}

	public constructor(public currentDirection: Direction = Direction.EAST) {}

	public executeCommand(command: string | undefined, value: number) {
		if (!command) return

		switch (command) {
			case Command.N:
				return this.advance(value, Direction.NORTH)
			case Command.S:
				return this.advance(value, Direction.SOUTH)
			case Command.E:
				return this.advance(value, Direction.EAST)
			case Command.W:
				return this.advance(value, Direction.WEST)
			case Command.L:
				return this.turnLeft(value)
			case Command.R:
				return this.turnRight(value)
			case Command.F:
				return this.advance(value, this.currentDirection)
		}
	}

	public advance(value: number, direction: Direction) {
		switch (direction) {
			case Direction.NORTH:
				return (this.position.y -= value)
			case Direction.EAST:
				return (this.position.x += value)
			case Direction.WEST:
				return (this.position.x -= value)
			case Direction.SOUTH:
				return (this.position.y += value)
		}
	}

	public turnLeft(value: number) {
		this.currentDirection = (this.currentDirection - value / 90 + 4) % 4
	}

	public turnRight(value: number) {
		this.currentDirection = (this.currentDirection + value / 90) % 4
	}
}

const getManhattanDistance = async () => {
	const list = await readList('12.txt')

	const ship = new Ship()

	list.forEach((command) => {
		const type = command.match(/[a-zA-Z]+/g)?.[0]
		const value = Number(command.replace(/\D/g, ''))
		ship.executeCommand(type, value)
	})

	return add([Math.abs(ship.position.x), Math.abs(ship.position.y)])
}

run('12a', getManhattanDistance)
