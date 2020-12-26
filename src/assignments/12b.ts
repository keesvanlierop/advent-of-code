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

	public waypoint = {
		x: 10,
		y: -1,
	}

	public constructor() {}

	public executeCommand(command: string | undefined, value: number) {
		if (!command) return

		switch (command) {
			case Command.N:
				return this.setWaypoint(value, Direction.NORTH)
			case Command.S:
				return this.setWaypoint(value, Direction.SOUTH)
			case Command.E:
				return this.setWaypoint(value, Direction.EAST)
			case Command.W:
				return this.setWaypoint(value, Direction.WEST)
			case Command.L: {
				const turns = (value / 90) % 4
				return [...Array(turns).keys()].forEach((_) => this.turnLeft())
			}
			case Command.R: {
				const turns = (value / 90) % 4
				return [...Array(turns).keys()].forEach((_) => this.turnRight())
			}
			case Command.F:
				return this.foward(value)
		}
	}

	public foward(value: number) {
		this.position.x += this.waypoint.x * value
		this.position.y += this.waypoint.y * value
	}

	public setWaypoint(value: number, direction: Direction) {
		switch (direction) {
			case Direction.NORTH:
				return (this.waypoint.y -= value)
			case Direction.EAST:
				return (this.waypoint.x += value)
			case Direction.WEST:
				return (this.waypoint.x -= value)
			case Direction.SOUTH:
				return (this.waypoint.y += value)
		}
	}

	public turnLeft() {
		this.waypoint = {
			x: this.waypoint.y,
			y: -this.waypoint.x,
		}
	}

	public turnRight() {
		this.waypoint = {
			x: -this.waypoint.y,
			y: this.waypoint.x,
		}
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

run('12b', getManhattanDistance)
