import { readList } from '@/utils'

const run = async () => {
	const grid = await readList('6.txt')

	const distinctPositions: Record<string, boolean> = {}
	let currentCoordinates: [number, number] = [-1, -1]

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			if (grid[y][x] === '^') currentCoordinates = [x, y]
		}
	}

	enum Direction {
		UP = '^',
		DOWN = 'v',
		LEFT = '<',
		RIGHT = '>',
	}

	const directionToCoordinate: Record<Direction, [number, number]> = {
		[Direction.UP]: [0, -1],
		[Direction.DOWN]: [0, 1],
		[Direction.LEFT]: [-1, 0],
		[Direction.RIGHT]: [1, 0],
	}

	let direction: Direction = Direction.UP

	const turnRight = () => {
		if (direction === Direction.UP) direction = Direction.RIGHT
		else if (direction === Direction.RIGHT) direction = Direction.DOWN
		else if (direction === Direction.DOWN) direction = Direction.LEFT
		else if (direction === Direction.LEFT) direction = Direction.UP
	}

	while (grid[currentCoordinates[1]]?.[currentCoordinates[0]]) {
		distinctPositions[`${currentCoordinates[0]}:${currentCoordinates[1]}`] = true

		const [dx, dy] = directionToCoordinate[direction]
		const nextCoordinates: [number, number] = [currentCoordinates[0] + dx, currentCoordinates[1] + dy]

		if (grid[nextCoordinates[1]]?.[nextCoordinates[0]] === '#') {
			turnRight()
		} else {
			currentCoordinates = nextCoordinates
		}
	}

	console.log(`The answer for 6a is: ${Object.keys(distinctPositions).length}`)
}

run()
